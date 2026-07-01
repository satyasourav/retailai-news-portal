const express = require("express");
const router = express.Router();
const Parser = require("rss-parser");
const NodeCache = require("node-cache");
const { feeds, ALL_INDUSTRIES, ALL_REGIONS, ALL_TAGS, INDUSTRY_GROUPS } = require("../feeds.config");

const parser = new Parser({
  timeout: 10000,
  headers: { "User-Agent": "NewsPortal/1.0 RSS Reader" },
});
const cache = new NodeCache({ stdTTL: 900 }); // 15-minute cache

const SIX_MONTHS_AGO = () => {
  const d = new Date();
  d.setMonth(d.getMonth() - 6);
  return d;
};

async function fetchFeed(feed) {
  try {
    const parsed = await parser.parseURL(feed.url);
    return parsed.items.map((item) => ({
      id: item.guid || item.link || item.title,
      title: item.title || "",
      description: item.contentSnippet || item.summary || "",
      link: item.link || "",
      publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
      source: feed.source,
      region: feed.region,
      industries: feed.industries,
      tags: feed.tags,
      imageUrl: extractImage(item),
    }));
  } catch {
    return [];
  }
}

function extractImage(item) {
  if (item.enclosure && item.enclosure.url) return item.enclosure.url;
  if (item["media:content"] && item["media:content"]["$"] && item["media:content"]["$"].url)
    return item["media:content"]["$"].url;
  const match = item.content && item.content.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

function isWithinDays(dateStr, daysBack) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - daysBack);
  const date = new Date(dateStr);
  return !isNaN(date) && date >= cutoff && date <= new Date();
}

function matchesKeyword(article, keyword) {
  if (!keyword) return true;
  const k = keyword.toLowerCase();
  return (
    article.title.toLowerCase().includes(k) ||
    article.description.toLowerCase().includes(k) ||
    article.source.toLowerCase().includes(k)
  );
}

router.get("/", async (req, res) => {
  const {
    industries,
    regions,
    tags,
    keyword,
    days = "180",
    page = "1",
    limit = "20",
  } = req.query;

  const selectedIndustries = industries ? industries.split(",") : [];
  const selectedRegions = regions ? regions.split(",") : [];
  const selectedTags = tags ? tags.split(",") : [];
  const daysBack = Math.min(parseInt(days) || 180, 180);
  const pageNum = parseInt(page) || 1;
  const limitNum = Math.min(parseInt(limit) || 20, 50);

  const cacheKey = JSON.stringify({ selectedIndustries, selectedRegions, selectedTags, keyword, daysBack });
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json(paginate(cached, pageNum, limitNum));
  }

  // Filter feeds by selected industries/regions before fetching
  const activeFeedConfigs = feeds.filter((f) => {
    const industryMatch =
      selectedIndustries.length === 0 ||
      f.industries.some((i) => selectedIndustries.includes(i));
    const regionMatch =
      selectedRegions.length === 0 ||
      selectedRegions.includes(f.region) ||
      f.region === "Global";
    return industryMatch && regionMatch;
  });

  const results = await Promise.allSettled(activeFeedConfigs.map(fetchFeed));
  let articles = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));

  // Date filter
  articles = articles.filter((a) => isWithinDays(a.publishedAt, daysBack));

  // Tag filter
  if (selectedTags.length > 0) {
    articles = articles.filter((a) =>
      a.tags.some((t) => selectedTags.includes(t))
    );
  }

  // Keyword filter
  if (keyword) {
    articles = articles.filter((a) => matchesKeyword(a, keyword));
  }

  // Deduplicate by title similarity
  const seen = new Set();
  articles = articles.filter((a) => {
    const key = a.title.toLowerCase().slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort newest first
  articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  cache.set(cacheKey, articles);
  res.json(paginate(articles, pageNum, limitNum));
});

function paginate(articles, page, limit) {
  const total = articles.length;
  const start = (page - 1) * limit;
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    articles: articles.slice(start, start + limit),
  };
}

router.get("/meta", (_, res) => {
  res.json({
    industries: ALL_INDUSTRIES,
    industryGroups: INDUSTRY_GROUPS,
    regions: ALL_REGIONS,
    tags: ALL_TAGS,
    sources: feeds.map((f) => ({
      name: f.source,
      region: f.region,
      industries: f.industries,
    })),
  });
});

router.post("/refresh", (_, res) => {
  cache.flushAll();
  res.json({ message: "Cache cleared. Next request will fetch fresh data." });
});

module.exports = router;
