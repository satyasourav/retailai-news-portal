const express = require("express");
const cors = require("cors");
const path = require("path");
const newsRoutes = require("./routes/news");

const app = express();
const PORT = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV === "production";

app.use(cors());
app.use(express.json());

app.use("/api/news", newsRoutes);
app.get("/health", (_, res) => res.json({ status: "ok" }));

// Serve React build in production
if (isProd) {
  const staticDir = path.join(__dirname, "public");
  app.use(express.static(staticDir));
  app.get("*", (_, res) => res.sendFile(path.join(staticDir, "index.html")));
}

app.listen(PORT, () => {
  console.log(`News Portal API running on http://localhost:${PORT}`);
});
