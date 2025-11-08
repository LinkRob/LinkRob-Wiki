// Ouvrir / fermer la barre latérale
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Charger une page interne
function loadPage(page) {
  const content = document.getElementById("content");
  switch (page) {
    case "accueil":
      content.innerHTML = `
        <h2>Accueil</h2>
        <p>Bienvenue dans le sanctuaire des aventuriers d’Hyrule !</p>`;
      break;
    case "zelda-eow":
      content.innerHTML = `
        <h2>Zelda: Echoes of Wisdom</h2>
        <p>Découvrez les secrets du nouveau jeu de la saga, centré sur Zelda elle-même.</p>`;
      break;
    case "articles-recents":
      content.innerHTML = `
        <h2>Articles récents</h2>
        <ul id="recent-list"><li>Chargement...</li></ul>`;
      loadRecentArticles();
      break;
    default:
      content.innerHTML = `<h2>${page}</h2><p>Contenu à venir...</p>`;
  }
}

// Articles récents (simulés)
function loadRecentArticles() {
  const articles = ["Les pouvoirs de Zelda EOW", "Les armes légendaires", "Chronologie d’Hyrule"];
  const list = document.getElementById("recent-list");
  list.innerHTML = articles.map(a => `<li>${a}</li>`).join('');
}
