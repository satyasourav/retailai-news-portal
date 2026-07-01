const feeds = [
  // ── North America ──────────────────────────────────────────────
  {
    url: "https://www.retaildive.com/feeds/news/",
    source: "Retail Dive",
    region: "North America",
    industries: ["Retail", "E-commerce", "Omnichannel", "Digital Commerce"],
    tags: ["AI", "Technology", "Automation"],
  },
  {
    url: "https://chainstoreage.com/feed/",
    source: "Chain Store Age",
    region: "North America",
    industries: ["Retail", "Omnichannel", "POS"],
    tags: ["Technology", "Operations"],
  },
  {
    url: "https://consumergoods.com/rss.xml",
    source: "Consumer Goods Technology",
    region: "North America",
    industries: ["Consumer Products", "FMCG", "Loyalty"],
    tags: ["Technology", "AI", "Analytics"],
  },
  {
    url: "https://www.pymnts.com/feed/",
    source: "PYMNTS",
    region: "North America",
    industries: ["Retail", "E-commerce", "Digital Commerce", "POS"],
    tags: ["Payments", "AI", "Technology"],
  },
  {
    url: "https://progressivegrocer.com/rss.xml",
    source: "Progressive Grocer",
    region: "North America",
    industries: ["Retail", "Consumer Products", "FMCG", "Loyalty"],
    tags: ["Technology", "Sustainability"],
  },
  {
    url: "https://www.supermarketnews.com/rss.xml",
    source: "Supermarket News",
    region: "North America",
    industries: ["Retail", "Consumer Products", "Loyalty"],
    tags: ["Technology", "Supply Chain"],
  },

  // ── Europe ─────────────────────────────────────────────────────
  {
    url: "https://www.retailgazette.co.uk/feed/",
    source: "Retail Gazette",
    region: "Europe",
    industries: ["Retail", "E-commerce", "Omnichannel", "Digital Commerce"],
    tags: ["Technology", "AI"],
  },
  {
    url: "https://www.thegrocer.co.uk/rss",
    source: "The Grocer",
    region: "Europe",
    industries: ["Retail", "Consumer Products", "FMCG", "Loyalty"],
    tags: ["Technology", "Sustainability"],
  },
  {
    url: "https://www.foodnavigator.com/rss/editorial.rss",
    source: "Food Navigator",
    region: "Europe",
    industries: ["Consumer Products", "FMCG"],
    tags: ["Sustainability", "Technology"],
  },
  {
    url: "https://www.just-food.com/rss/",
    source: "Just Food",
    region: "Europe",
    industries: ["Consumer Products", "FMCG"],
    tags: ["Supply Chain", "Technology"],
  },

  // ── Asia Pacific ───────────────────────────────────────────────
  {
    url: "https://retailasia.com/rss.xml",
    source: "Retail Asia",
    region: "Asia Pacific",
    industries: ["Retail", "E-commerce", "Omnichannel", "Digital Commerce", "Loyalty"],
    tags: ["Technology", "AI"],
  },
  {
    url: "https://www.businesstoday.in/rss/industry.xml",
    source: "Business Today India",
    region: "Asia Pacific",
    industries: ["Retail", "Consumer Products", "Digital Commerce"],
    tags: ["Technology", "AI"],
  },

  // ── Global / Tech & AI ─────────────────────────────────────────
  {
    url: "https://retailtechinnovationhub.com/home/feed/",
    source: "Retail Tech Innovation Hub",
    region: "Global",
    industries: ["Retail", "E-commerce", "Omnichannel", "POS", "Digital Commerce", "Agentic Commerce"],
    tags: ["AI", "Technology", "Automation", "Analytics"],
  },
  {
    url: "https://techcrunch.com/tag/retail/feed/",
    source: "TechCrunch",
    region: "Global",
    industries: ["Retail", "E-commerce", "Digital Commerce", "Agentic Commerce", "Agentic AI"],
    tags: ["AI", "Technology", "Startups"],
  },
  {
    url: "https://venturebeat.com/category/ai/feed/",
    source: "VentureBeat",
    region: "Global",
    industries: ["Retail", "Consumer Products", "Digital Commerce", "Agentic AI"],
    tags: ["AI", "Machine Learning", "Technology"],
  },
  {
    url: "https://www.forbes.com/innovation/feed2/",
    source: "Forbes Innovation",
    region: "Global",
    industries: ["Retail", "Consumer Products", "E-commerce", "Digital Commerce", "Agentic AI"],
    tags: ["AI", "Technology", "Analytics"],
  },
  {
    url: "https://www.supplychaindive.com/feeds/news/",
    source: "Supply Chain Dive",
    region: "Global",
    industries: ["Supply Chain", "Consumer Products", "Retail"],
    tags: ["AI", "Automation", "Technology"],
  },

  // ── Loyalty ────────────────────────────────────────────────────
  {
    url: "https://loyalty360.org/feed",
    source: "Loyalty360",
    region: "Global",
    industries: ["Loyalty", "Retail", "Consumer Products"],
    tags: ["AI", "Analytics", "Technology"],
  },
  {
    url: "https://www.thepointsguy.com/feed/",
    source: "The Points Guy",
    region: "Global",
    industries: ["Loyalty"],
    tags: ["Technology", "Analytics"],
  },

  // ── Omnichannel / Digital Commerce ────────────────────────────
  {
    url: "https://www.digitalcommerce360.com/feed/",
    source: "Digital Commerce 360",
    region: "Global",
    industries: ["Digital Commerce", "E-commerce", "Omnichannel", "Retail"],
    tags: ["AI", "Technology", "Analytics", "Automation"],
  },
  {
    url: "https://internetretailing.net/feed/",
    source: "Internet Retailing",
    region: "Europe",
    industries: ["Digital Commerce", "E-commerce", "Omnichannel"],
    tags: ["Technology", "AI"],
  },

  // ── POS ────────────────────────────────────────────────────────
  {
    url: "https://risnews.com/rss.xml",
    source: "RIS News",
    region: "North America",
    industries: ["POS", "Retail", "Omnichannel"],
    tags: ["Technology", "AI", "Automation", "Analytics"],
  },
  {
    url: "https://www.retailsystems.co.uk/news/rss",
    source: "Retail Systems",
    region: "Europe",
    industries: ["POS", "Retail", "Omnichannel"],
    tags: ["Technology", "AI"],
  },
];

const ALL_INDUSTRIES = [
  "Retail",
  "Consumer Products",
  "FMCG",
  "E-commerce",
  "Supply Chain",
  "Loyalty",
  "Omnichannel",
  "POS",
  "Digital Commerce",
  "Agentic Commerce",
  "Agentic AI",
];

const ALL_REGIONS = ["North America", "Europe", "Asia Pacific", "Global"];

const ALL_TAGS = [
  "AI",
  "Technology",
  "Automation",
  "Analytics",
  "Sustainability",
  "Supply Chain",
  "Payments",
  "Machine Learning",
  "Startups",
  "Operations",
];

// Group industries for display in the UI
const INDUSTRY_GROUPS = {
  "Core": ["Retail", "Consumer Products", "FMCG", "E-commerce", "Supply Chain"],
  "Capabilities": ["Loyalty", "Omnichannel", "POS", "Digital Commerce", "Agentic Commerce", "Agentic AI"],
};

module.exports = { feeds, ALL_INDUSTRIES, ALL_REGIONS, ALL_TAGS, INDUSTRY_GROUPS };
