# RetailAI News Portal

Global Consumer Products · Retail · Tech & AI news aggregator.

## Quick Start

```powershell
# Install dependencies (one time)
cd backend; npm install; cd ../frontend; npm install; cd ..

# Start both servers
.\start.ps1
```

Then open **http://localhost:3000**

## Architecture

```
news-portal/
├── backend/
│   ├── server.js          # Express API server (port 4000)
│   ├── feeds.config.js    # RSS feed sources — add/remove feeds here
│   └── routes/news.js     # Fetch, filter, cache, paginate
└── frontend/
    └── src/
        ├── App.tsx
        ├── components/
        │   ├── Header.tsx
        │   ├── FilterPanel.tsx
        │   ├── NewsCard.tsx
        │   └── NewsGrid.tsx
        └── types/index.ts
```

## Adding RSS Feeds

Edit `backend/feeds.config.js` and add an entry:

```js
{
  url: "https://example.com/feed.rss",
  source: "Source Name",
  region: "Europe",              // North America | Europe | Asia Pacific | Global
  industries: ["Retail", "FMCG"],
  tags: ["AI", "Technology"],
}
```

## Filters Available

| Filter | Options |
|---|---|
| Industry | Retail, Consumer Products, FMCG, E-commerce, Supply Chain |
| Region | North America, Europe, Asia Pacific, Global |
| Tech Topics | AI, Technology, Automation, Analytics, Sustainability, … |
| Companies | Type any name (e.g. Walmart, Amazon, Unilever) |
| Date Range | Last 1 / 3 / 6 months |

## API Endpoints

- `GET /api/news?industries=Retail&regions=Europe&keyword=AI&months=3&page=1`
- `GET /api/news/meta` — returns available filter options
- `POST /api/news/refresh` — clears cache for fresh fetch
