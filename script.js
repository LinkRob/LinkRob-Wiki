// basic client to load pages from pages.json and show editor preview.
// It does NOT push commits to GitHub (for security). To publish pages permanently,
// edit files directly in the GitHub repo (see guide below).

const sidebar = document.getElementById('sidebar');
const menuList = document.getElementById('menuList');
const recentList = document.getElementById('recentList');
const main = document.getElementById('main');
const pageArticle = document.getElementById('pageArticle');

let PAGES = []; // will hold pages loaded from pages.json

// toggle sidebar
function toggleSidebar(){ sidebar.classList.toggle('visible'); }

// fetch pages.json from the site (served by Vercel)
async function loadPages(){
  try{
    const res = await fetch('/pages.json', {cache: "no-store"});
    if(!res.ok) throw new Error('pages.json missing');
    const data = await res.json();
    PAGES = data.pages || [];
  }catch(err){
    console.warn('Impossible de charger pages.json', err);
    PAGES = [];
  }
  renderMenu();
  renderRecent();
}
function renderMenu(){
  menuList.innerHTML = '';
  PAGES.forEach(p=>{
    const li = document.createElement('li');
    li.textContent = p.title;
    li.onclick = ()=> showPage(p.slug);
    menuList.appendChild(li);
  });
  // add default static items if none
  if(PAGES.length===0){
    ['Accueil','Zelda: Echoes of Wisdom','Jeux','Objets','Soluce'].forEach(t=>{
      const li=document.createElement('li'); li.textContent=t; li.onclick=()=> showDummy(t); menuList.appendChild(li);
    });
  }
}
function renderRecent(){
  recentList.innerHTML = '';
  const recent = PAGES.slice().sort((a,b)=> new Date(b.pubDate) - new Date(a.pubDate)).slice(0,6);
  recent.forEach(r=>{
    const li=document.createElement('li'); li.textContent = `${r.title} — ${new Date(r.pubDate).toLocaleDateString()}`; recentList.appendChild(li);
  });
}
function showDummy(title){
  document.getElementById('home').classList.add('hidden');
  document.getElementById('pageView').classList.remove('hidden');
  pageArticle.innerHTML = `<h2>${title}</h2><p>Contenu à venir...</p>`;
}
function showPage(slug){
  const p = PAGES.find(x=>x.slug===slug);
  if(!p){ pageArticle.innerHTML = `<h2>Page introuvable</h2><p>La page "${slug}" n'existe pas.</p>`; document.getElementById('pageView').classList.remove('hidden'); return; }
  document.getElementById('home').classList.add('hidden');
  document.getElementById('pageView').classList.remove('hidden');
  pageArticle.innerHTML = `<h2>${p.title}</h2><div>${p.content}</div>`;
}

// editor behavior (local preview)
document.getElementById('createBtn').addEventListener('click', ()=>{
  document.getElementById('editor').classList.remove('hidden');
  document.getElementById('pageView').classList.add('hidden');
  document.getElementById('home').classList.add('hidden');
});
document.getElementById('cancelEdit').addEventListener('click', ()=>{
  document.getElementById('editor').classList.add('hidden');
  document.getElementById('home').classList.remove('hidden');
});
document.getElementById('saveBtn').addEventListener('click', ()=>{
  const title = document.getElementById('editTitle').value.trim();
  const content = document.getElementById('editContent').value.trim();
  if(!title||!content){ alert('Remplis titre et contenu.'); return; }
  // show preview and inform user to commit on GitHub (persistent method)
  pageArticle.innerHTML = `<h2>${title}</h2><div>${content}</div>`;
  document.getElementById('pageView').classList.remove('hidden');
  document.getElementById('editor').classList.add('hidden');
  alert('Prévisualisation enregistrée localement. Pour publier définitivement : coller le titre & contenu dans GitHub (pages.json or new file).');
});

// init
loadPages();
