// Ouvrir / fermer la barre latérale
const menuLogo = document.getElementById('menu-logo');
const sidebar = document.getElementById('sidebar');
menuLogo.addEventListener('click', () => {
  sidebar.classList.toggle('visible');
});

// Basculer le thème clair/sombre
document.addEventListener('keydown', (e) => {
  if (e.key === 't') {
    document.body.classList.toggle('light');
  }
});

// Recherche (simulation)
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    alert(`Recherche pour : ${searchBar.value}`);
  }
});

// Création d’article
const createBtn = document.getElementById('createPageBtn');
const editor = document.getElementById('editor');
const saveBtn = document.getElementById('savePageBtn');
createBtn.addEventListener('click', () => {
  editor.classList.remove('hidden');
});

saveBtn.addEventListener('click', () => {
  const title = document.getElementById('pageTitle').value;
  const content = document.getElementById('pageContent').value;
  if (title && content) {
    localStorage.setItem(title, content);
    alert(`Page "${title}" sauvegardée !`);
    document.getElementById('pageTitle').value = '';
    document.getElementById('pageContent').value = '';
    editor.classList.add('hidden');
  } else {
    alert('Veuillez remplir tous les champs.');
  }
});
