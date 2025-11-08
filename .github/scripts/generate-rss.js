const fs = require('fs');
const path = require('path');

const pagesPath = path.join(process.cwd(), 'pages.json');
const outPath = path.join(process.cwd(), 'rss.xml');

if(!fs.existsSync(pagesPath)){
  console.error('pages.json introuvable');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(pagesPath,'utf8'));
const pages = data.pages || [];

function fmtDate(d){
  return new Date(d).toUTCString();
}

let items = pages.slice().sort((a,b)=> new Date(b.pubDate) - new Date(a.pubDate)).map(p=>{
  const link = `https://linkrob-wiki.vercel.app/#${encodeURIComponent(p.slug)}`;
  const title = escapeXml(p.title);
  const desc = escapeXml(stripHtml(p.content).slice(0,300));
  const pubDate = fmtDate(p.pubDate || new Date());
  return `<item><title>${title}</title><link>${link}</link><description>${desc}</description><pubDate>${pubDate}</pubDate></item>`;
}).join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>LinkRob Wiki – Actualités</title>
    <link>https://linkrob-wiki.vercel.app/</link>
    <description>Les dernières pages et mises à jour du LinkRob Wiki</description>
    <language>fr</language>
    ${items}
  </channel>
</rss>
`;

fs.writeFileSync(outPath, rss, 'utf8');
console.log('rss.xml généré avec', pages.length, 'articles.');

function stripHtml(html){ return html.replace(/<[^>]*>/g,''); }
function escapeXml(s){ return s.replace(/[<>&'"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c])); }
