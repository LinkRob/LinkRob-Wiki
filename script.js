// Toggle sidebar
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const sidebarLogo = document.getElementById('sidebar-logo');

sidebarLogo.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-closed');
  main.classList.toggle('shifted');
});

// Nouvelle page (simulé)
const newPageBtn = document.getElementById('new-page-btn');
newPageBtn.addEventListener('click', () => {
  const title = prompt("Nom de la nouvelle page :");
  if(title) {
    const content = prompt("Contenu initial de la page :");
    if(content) {
      alert(`Page "${title}" créée ! (Simulé, pas encore sauvegardée)`);
    }
  }
});

// Recherche (simulé)
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') {
    const query = searchBar.value;
    alert(`Recherche pour : "${query}" (Simulé, pas encore active)`);
  }
});
