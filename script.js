// Toggle sidebar
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const sidebarLogo = document.getElementById('sidebar-logo');

sidebarLogo.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-closed');
  main.classList.toggle('shifted');
});

// Charger les pages depuis pages.json
async function chargerDonnees() {
  try {
    const response = await fetch('pages.json');
    if (!response.ok) throw new Error("Erreur de chargement du fichier JSON");
    const data = await response.json();
    
    const menuUl = document.querySelector('#sidebar nav ul');
    const contentArea = document.getElementById('content');

    // Générer le menu
    menuUl.innerHTML = '<li><a href="#" id="home-link">Accueil</a></li>';
    data.pages.forEach(page => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#" data-slug="${page.slug}">${page.title}</a>`;
      menuUl.appendChild(li);
    });

    // Événements du menu
    document.getElementById('home-link').addEventListener('click', () => location.reload());
    
    document.querySelectorAll('#sidebar nav ul a[data-slug]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const slug = e.target.getAttribute('data-slug');
        const page = data.pages.find(p => p.slug === slug);
        if(page) {
          contentArea.innerHTML = `<h1>${page.title}</h1><div>${page.content}</div>`;
        }
      });
    });

  } catch (erreur) {
    console.error("Problème détecté :", erreur);
    document.getElementById('content').innerHTML = "<h1>Erreur</h1><p>Impossible de charger le wiki. Vérifie ton fichier pages.json.</p>";
  }
}

chargerDonnees();
