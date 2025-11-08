// Toggle sidebar
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const sidebarLogo = document.getElementById('sidebar-logo');

sidebarLogo.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-closed');
  main.classList.toggle('shifted');
});

// Nouvelle page
const newPageBtn = document.getElementById('new-page-btn');
newPageBtn.addEventListener('click', () => {
  const title = prompt("Nom de la nouvelle page :");
  if(title) {
    const pageContent = prompt("Contenu initial de la page :");
    if(pageContent) {
      alert(`Page "${title}" créée ! (Simulé, à remplacer par sauvegarde réelle)`);
      // Ici, tu pourras plus tard appeler un backend ou GitHub Actions pour créer la page.
    }
  }
});

// Recherche simulée
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') {
    const query = searchBar.value;
    alert(`Recherche pour : "${query}" (Simulé, à remplacer par recherche réelle)`);
  }
});
