const logo = document.getElementById('logo');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const toggleThemeBtn = document.getElementById('toggle-theme');

// Ouvrir/fermer la barre latérale
logo.addEventListener('click', () => {
  if (sidebar.style.left === '0px') {
    sidebar.style.left = '-250px';
    content.style.marginLeft = '0';
  } else {
    sidebar.style.left = '0px';
    content.style.marginLeft = '250px';
  }
});

// Changer le thème clair/sombre
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('theme-dark');
  document.body.classList.toggle('theme-light');
});

// Afficher la bonne section
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';
}
