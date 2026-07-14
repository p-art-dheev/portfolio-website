import { neon } from '@neondatabase/serverless'
import { UAParser } from 'ua-parser-js'
import dotenv from 'dotenv'

dotenv.config()

const sql = neon(process.env.DATABASE_URL)

export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS analytics (
      id         SERIAL PRIMARY KEY,
      ip         TEXT,
      country    TEXT,
      path       TEXT,
      user_agent TEXT,
      timestamp  TIMESTAMPTZ DEFAULT NOW()
    )
  `
  console.log('✅ Neon database initialized successfully')
}

export async function trackAnalytics(data) {
  const { ip, country, path, user_agent } = data
  await sql`
    INSERT INTO analytics (ip, country, path, user_agent)
    VALUES (${ip}, ${country}, ${path}, ${user_agent})
  `
}

export async function getAnalyticsStats(timeframe = '30days', page = 1, limit = 20) {
  // Build interval string for Postgres
  let interval = '30 days'
  if (timeframe === '7days') interval = '7 days'
  if (timeframe === 'all')   interval = '100 years'

  const totalViews = await sql`
    SELECT COUNT(*) as count FROM analytics
    WHERE timestamp >= NOW() - CAST(${interval} AS INTERVAL)
  `

  const uniqueVisitors = await sql`
    SELECT COUNT(DISTINCT ip) as count FROM analytics
    WHERE timestamp >= NOW() - CAST(${interval} AS INTERVAL)
  `

  const viewsByCountry = await sql`
    SELECT COALESCE(country, 'Unknown') as country, COUNT(*) as count
    FROM analytics
    WHERE timestamp >= NOW() - CAST(${interval} AS INTERVAL)
    GROUP BY country ORDER BY count DESC LIMIT 10
  `

  const topPaths = await sql`
    SELECT path, COUNT(*) as count
    FROM analytics
    WHERE timestamp >= NOW() - CAST(${interval} AS INTERVAL)
    GROUP BY path ORDER BY count DESC LIMIT 10
  `

  const timeSeries = await sql`
    SELECT
      DATE(timestamp) as date,
      COUNT(*) as views,
      COUNT(DISTINCT ip) as visitors
    FROM analytics
    WHERE timestamp >= NOW() - CAST(${interval} AS INTERVAL)
    GROUP BY DATE(timestamp)
    ORDER BY DATE(timestamp) ASC
  `

  // Fetch raw user agents for device/browser parsing (done in JS)
  const rawAgents = await sql`
    SELECT user_agent, COUNT(*) as count
    FROM analytics
    WHERE timestamp >= NOW() - CAST(${interval} AS INTERVAL)
    GROUP BY user_agent
  `

  const parser = new UAParser()
  const devices = {}
  const browsers = {}

  rawAgents.forEach(row => {
    parser.setUA(row.user_agent)
    const result = parser.getResult()

    let deviceType = 'Desktop'
    if (result.device.type === 'mobile') deviceType = 'Mobile'
    else if (result.device.type === 'tablet') deviceType = 'Tablet'
    devices[deviceType] = (devices[deviceType] || 0) + Number(row.count)

    const browserName = result.browser.name || 'Other'
    browsers[browserName] = (browsers[browserName] || 0) + Number(row.count)
  })

  const viewsByDevice = Object.keys(devices).map(dev => ({ name: dev, count: devices[dev] }))
  const viewsByBrowser = Object.keys(browsers)
    .map(b => ({ name: b, count: browsers[b] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Paginated recent visitors (all time, not filtered by timeframe)
  const offset = (page - 1) * limit
  const recentVisitors = await sql`
    SELECT ip, country, path, timestamp
    FROM analytics
    ORDER BY timestamp DESC
    LIMIT ${limit} OFFSET ${offset}
  `

  const [totalVisitorsCountRow] = await sql`SELECT COUNT(*) as count FROM analytics`
  const totalRecentVisitors = Number(totalVisitorsCountRow.count)

  return {
    totalViews:     Number(totalViews[0].count),
    uniqueVisitors: Number(uniqueVisitors[0].count),
    viewsByCountry,
    topPaths,
    timeSeries,
    viewsByDevice,
    viewsByBrowser,
    recentVisitors: {
      data:       recentVisitors,
      total:      totalRecentVisitors,
      page,
      limit,
      totalPages: Math.ceil(totalRecentVisitors / limit)
    }
  }
}

export default sql
