// Toggle sidebar
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const sidebarLogo = document.getElementById('sidebar-logo');

sidebarLogo.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-closed');
  main.classList.toggle('shifted');
});

// Charger les pages depuis pages.json dynamiquement
async function chargerDonnees() {
  const response = await fetch('pages.json');
  const data = await response.json();
  const menuUl = document.querySelector('#sidebar nav ul');
  const contentArea = document.getElementById('content');

  // Remplir le menu
  menuUl.innerHTML = '<li><a href="#" data-page="accueil">Accueil</a></li>';
  data.pages.forEach(page => {
    menuUl.innerHTML += `<li><a href="#" data-page="${page.slug}">${page.title}</a></li>`;
  });

  // Gestion des clics sur le menu
  menuUl.addEventListener('click', (e) => {
    if(e.target.tagName === 'A') {
      const slug = e.target.getAttribute('data-page');
      const page = data.pages.find(p => p.slug === slug);
      if(page) {
        contentArea.innerHTML = `<h1>${page.title}</h1><div>${page.content}</div>`;
      } else if(slug === 'accueil') {
        location.reload(); // Retour à l'accueil
      }
    }
  });

  // Recherche en temps réel
  const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    if (query.length < 2) return;
    const resultats = data.pages.filter(p => p.title.toLowerCase().includes(query) || p.content.toLowerCase().includes(query));
    if(resultats.length > 0) {
      contentArea.innerHTML = `<h2>Résultats pour "${query}" :</h2>` + resultats.map(p => `<h3>${p.title}</h3>${p.content}`).join('<hr>');
    }
  });
}

// Activer le mode nuit selon l'heure
const heure = new Date().getHours();
if (heure > 19 || heure < 7) {
  document.body.classList.replace('theme-light', 'theme-dark');
}

chargerDonnees();
