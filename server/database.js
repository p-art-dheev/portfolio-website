import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'
import { fileURLToPath } from 'url'
import { UAParser } from 'ua-parser-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPromise = open({
  filename: path.join(__dirname, 'database.sqlite'),
  driver: sqlite3.Database
})

export async function initializeDatabase() {
  const db = await dbPromise
  await db.exec(`
    CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip TEXT,
      country TEXT,
      path TEXT,
      user_agent TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  console.log('Database initialized successfully')
  return db
}

export async function trackAnalytics(data) {
  const db = await dbPromise
  const { ip, country, path, user_agent } = data
  await db.run(
    'INSERT INTO analytics (ip, country, path, user_agent) VALUES (?, ?, ?, ?)',
    [ip, country, path, user_agent]
  )
}

export async function getAnalyticsStats(timeframe = '30days', page = 1, limit = 20) {
  const db = await dbPromise;

  // Compute the date cutoff string for SQLite
  let dateModifier = "'-30 days'";
  if (timeframe === '7days') dateModifier = "'-7 days'";
  if (timeframe === 'all') dateModifier = "'-10 years'"; // Arbitrary large past offset

  // Base WHERE clause for timeframe
  const whereClause = `WHERE timestamp >= date('now', ${dateModifier})`;

  const totalViews = await db.get(`SELECT COUNT(*) as count FROM analytics ${whereClause}`);
  const uniqueVisitors = await db.get(`SELECT COUNT(DISTINCT ip) as count FROM analytics ${whereClause}`);

  const viewsByCountry = await db.all(`
    SELECT IFNULL(country, "Unknown") as country, COUNT(*) as count 
    FROM analytics ${whereClause}
    GROUP BY country ORDER BY count DESC LIMIT 10
  `);

  const topPaths = await db.all(`
    SELECT path, COUNT(*) as count 
    FROM analytics ${whereClause}
    GROUP BY path ORDER BY count DESC LIMIT 10
  `);

  const timeSeries = await db.all(`
    SELECT date(timestamp) as date, COUNT(*) as views, COUNT(DISTINCT ip) as visitors
    FROM analytics ${whereClause}
    GROUP BY date(timestamp)
    ORDER BY date(timestamp) ASC
  `);

  // Device & Browser Aggregation via Parsing
  // SQLite doesn't have regex parsing built-in, so we fetch the raw User Agents for the timeframe and aggregate in Node.
  const rawAgents = await db.all(`
    SELECT user_agent, COUNT(*) as count 
    FROM analytics ${whereClause}
    GROUP BY user_agent
  `);

  const parser = new UAParser();
  const devices = {};
  const browsers = {};

  rawAgents.forEach(row => {
    parser.setUA(row.user_agent);
    const result = parser.getResult();

    // Device Category
    let deviceType = 'Desktop';
    if (result.device.type === 'mobile') deviceType = 'Mobile';
    else if (result.device.type === 'tablet') deviceType = 'Tablet';

    devices[deviceType] = (devices[deviceType] || 0) + row.count;

    // Browser Category
    let browserName = result.browser.name || 'Other';
    browsers[browserName] = (browsers[browserName] || 0) + row.count;
  });

  const viewsByDevice = Object.keys(devices).map(dev => ({ name: dev, count: devices[dev] }));
  const viewsByBrowser = Object.keys(browsers).map(b => ({ name: b, count: browsers[b] })).sort((a, b) => b.count - a.count).slice(0, 5);

  // Recent Visitors feed with Pagination
  const offset = (page - 1) * limit;
  const recentVisitors = await db.all(`
    SELECT ip, country, path, timestamp 
    FROM analytics 
    ORDER BY timestamp DESC LIMIT ? OFFSET ?
  `, [limit, offset]);

  const totalVisitorsCountRaw = await db.get(`SELECT COUNT(*) as count FROM analytics`);
  const totalRecentVisitors = totalVisitorsCountRaw.count;

  return {
    totalViews: totalViews.count,
    uniqueVisitors: uniqueVisitors.count,
    viewsByCountry,
    topPaths,
    timeSeries,
    viewsByDevice,
    viewsByBrowser,
    recentVisitors: {
      data: recentVisitors,
      total: totalRecentVisitors,
      page,
      limit,
      totalPages: Math.ceil(totalRecentVisitors / limit)
    }
  }
}

export default dbPromise
