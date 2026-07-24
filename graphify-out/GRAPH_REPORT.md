# Graph Report - C:\Users\PARDHEEV\MyGitHubRepos\portfolio-website  (2026-07-18)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 196 nodes · 224 edges · 27 communities (16 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.7)
- Token cost: 705 input · 230 output

## Graph Freshness
- Built from commit: `b1936079`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Frontend React Components
- Frontend Development Tools
- Frontend Library Dependencies
- Backend Project Configuration
- Backend Server Middleware
- Package Build Scripts
- Favicon Generation Utility
- Database and Server Logic
- Monogram Generation Utility
- Admin Dashboard UI
- GitHub Activity Visualization
- Portfolio Project Content
- Deployment and Entry Files
- Apple Icon Asset
- Album Art Asset
- Standard Favicon Asset
- Music Album Art
- Music Album Art
- Project Landing Page
- Project Dashboard UI
- Forecasting Chart Asset
- Project Logo Asset
- Assets Directory README
- Portfolio.Centric README

## God Nodes (most connected - your core abstractions)
1. `config` - 9 edges
2. `scripts` - 6 edges
3. `GitHubContributions()` - 5 edges
4. `circlePng()` - 4 edges
5. `run()` - 4 edges
6. `sql` - 4 edges
7. `keywords` - 4 edges
8. `AdminDashboard()` - 4 edges
9. `run()` - 3 edges
10. `initializeDatabase()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Index HTML` --references--> `Pardheev Vatturu Profile Photo`  [EXTRACTED]
  index.html → public/assets/images/profile1.jpeg
- `GitHub Deploy Workflow` --references--> `Index HTML`  [INFERRED]
  .github/workflows/deploy.yml → index.html
- `Profile Photo of Pardheev Vatturu` --references--> `Pardheev Vatturu`  [EXTRACTED]
  public/assets/images/profile2.png → public/assets/resume/Pardheev_s_Resume.pdf
- `CodeProctor Code Editor UI` --references--> `Pardheev Vatturu`  [EXTRACTED]
  public/assets/projects/1/3.png → public/assets/resume/Pardheev_s_Resume.pdf
- `Portfolio()` --calls--> `useAnalytics()`  [EXTRACTED]
  src/App.jsx → src/hooks/useAnalytics.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **CodeProctor Project Visuals** — public_assets_projects_1_3, public_assets_projects_1_4, public_assets_projects_1_5, codeproctor_platform [EXTRACTED 1.00]

## Communities (27 total, 11 thin omitted)

### Community 0 - "Frontend React Components"
Cohesion: 0.10
Nodes (20): App(), Portfolio(), About(), AdminLogin(), ConnectSection(), ICON_MAP, GREETINGS, Hero() (+12 more)

### Community 1 - "Frontend Development Tools"
Cohesion: 0.08
Nodes (25): autoprefixer, concurrently, jimp, devDependencies, autoprefixer, concurrently, jimp, png-to-ico (+17 more)

### Community 2 - "Frontend Library Dependencies"
Cohesion: 0.10
Nodes (21): @emailjs/browser, framer-motion, lucide-react, dependencies, @emailjs/browser, framer-motion, lucide-react, react (+13 more)

### Community 3 - "Backend Project Configuration"
Cohesion: 0.11
Nodes (17): nodemon, api, backend, portfolio, author, description, devDependencies, nodemon (+9 more)

### Community 4 - "Backend Server Middleware"
Cohesion: 0.12
Nodes (17): cors, dotenv, express, geoip-lite, jsonwebtoken, @neondatabase/serverless, nodemailer, dependencies (+9 more)

### Community 5 - "Package Build Scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, dev:all, preview, server (+2 more)

### Community 6 - "Favicon Generation Utility"
Cohesion: 0.29
Nodes (9): circleMask(), circlePng(), fs, outDir, path, run(), sharp, src (+1 more)

### Community 7 - "Database and Server Logic"
Cohesion: 0.39
Nodes (6): getAnalyticsStats(), initializeDatabase(), sql, trackAnalytics(), app, TODO: Implement email sending with nodemailer

### Community 8 - "Monogram Generation Utility"
Cohesion: 0.36
Nodes (7): buildSVG(), fs, outDir, path, run(), sharp, toIco

### Community 9 - "Admin Dashboard UI"
Cohesion: 0.36
Nodes (5): AdminDashboard(), COLORS, CustomTooltip(), formatDate(), formatTimestamp()

### Community 10 - "GitHub Activity Visualization"
Cohesion: 0.39
Nodes (7): calculateStreaks(), CONTRIBUTION_LEVELS, formatContribTitle(), getLevel(), GitHubContributions(), MONTHS, ordinal()

### Community 11 - "Portfolio Project Content"
Cohesion: 0.29
Nodes (7): CodeProctor Platform, Pardheev Vatturu, Profile Photo of Pardheev Vatturu, CodeProctor Code Editor UI, CodeProctor Leaderboard UI, CodeProctor Landing Page, Pardheev's Resume

### Community 12 - "Deployment and Entry Files"
Cohesion: 0.67
Nodes (3): GitHub Deploy Workflow, Index HTML, Pardheev Vatturu Profile Photo

## Knowledge Gaps
- **85 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+80 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Frontend Development Tools` to `Package Build Scripts`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Frontend Library Dependencies` to `Package Build Scripts`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Backend Server Middleware` to `Backend Project Configuration`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _85 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Frontend React Components` be split into smaller, more focused modules?**
  _Cohesion score 0.0960960960960961 - nodes in this community are weakly interconnected._
- **Should `Frontend Development Tools` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Frontend Library Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._