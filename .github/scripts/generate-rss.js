// .github/scripts/generate-rss.js
const fs = require("fs");

const siteUrl = "https://linkrob-wiki.vercel.app";
const dataFile = "pages.json";
const outputFile = "rss.xml";

// Vérifie que pages.json existe
if (!fs.existsSync(dataFile)) {
  console.error(`❌ Fichier ${dataFile} introuvable`);
  process.exit(1);
}

const jsonData = JSON.parse(fs.readFileSync(dataFile, "utf8"));
const pages = jsonData.pages || [];

let rss = `<?xml version="1.0" encoding="UTF-8"?>\n`;
rss += `<rss version="2.0">\n<channel>\n`;
rss += `<title>LinkRob Wiki – Actualités</title>\n`;
rss += `<link>${siteUrl}</link>\n`;
rss += `<description>Les dernières pages et mises à jour du LinkRob Wiki</description>\n`;
rss += `<language>fr</language>\n`;

pages.forEach((page) => {
  rss += `<item>\n`;
  rss += `<title>${page.title}</title>\n`;
  rss += `<link>${siteUrl}/#${page.slug}</link>\n`;
  rss += `<description>${page.content.replace(/<[^>]*>/g, "")}</description>\n`;
  rss += `<pubDate>${new Date(page.pubDate).toUTCString()}</pubDate>\n`;
  rss += `</item>\n`;
});

rss += `</channel>\n</rss>\n`;

fs.writeFileSync(outputFile, rss, "utf8");
console.log("✅ Flux RSS généré avec succès :", outputFile);
