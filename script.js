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
        <p>Dernier chapitre de la saga, centré sur la princesse Zelda elle-même !</p>`;
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

// Simuler la liste d’articles récents
function loadRecentArticles() {
  const articles = ["Zelda EOW : premières impressions", "Les objets mythiques", "Guide des sanctuaires"];
  const list = document.getElementById("recent-list");
  list.innerHTML = articles.map(a => `<li>${a}</li>`).join('');
}

// Barre de recherche
document.getElementById("searchBar").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    const query = this.value.toLowerCase();
    if (query.includes("zelda")) {
      loadPage("zelda-eow");
    } else {
      document.getElementById("content").innerHTML = `
        <h2>Créer un nouvel article : ${query}</h2>
        <textarea id="newArticle" placeholder="Écris ici ton texte..." rows="10" cols="80"></textarea>
        <br><button onclick="saveArticle('${query}')">💾 Sauvegarder</button>`;
    }
  }
});

// Sauvegarder (simulation locale)
function saveArticle(title) {
  const content = document.getElementById("newArticle").value;
  localStorage.setItem(title, content);
  alert("Article sauvegardé !");
}
