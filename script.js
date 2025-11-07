document.addEventListener("DOMContentLoaded", () => {
  const logoButton = document.getElementById("logoButton");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");
  const menuLinks = document.querySelectorAll(".menu-link");

  // Contenu pour chaque section
  const sections = {
    accueil: `
      <h1>Bienvenue sur LinkRob Wiki !</h1>
      <p>Ici, tu trouveras toutes les informations sur la saga Zelda.</p>
      <div class="external-links">
        <a href="https://discord.gg/Q6kmbXamN3" target="_blank">Rejoins notre Discord</a>
        <a href="https://www.youtube.com/channel/UCZu8OUQjwGfIT_ialw_LtsA" target="_blank">Visite notre chaîne YouTube</a>
      </div>
    `,
    test: `<h2>Test publications</h2><p>Zone pour tester vos publications (uniquement visible par l'admin et l'utilisateur).</p>`,
    jeux: `<h2>Jeux</h2><p>Section jeux à venir !</p>`,
    reglement: `<h2>Règlement</h2><p>Section règlement, accès restreint.</p>`,
    objets: `<h2>Objets</h2><p>Liste des objets Zelda.</p>`,
    soluce: `<h2>Soluce</h2><p>Guides et solutions pour les jeux.</p>`
  };

  // Fonction pour charger une section
  function loadSection(section) {
    mainContent.innerHTML = sections[section] || "<p>Section non trouvée.</p>";
  }

  // Initialiser avec la section Accueil
  loadSection("accueil");

  // Gestion des clics dans la barre latérale
  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      // Retirer active de tous
      menuLinks.forEach(l => l.classList.remove("active"));
      // Ajouter active à celui cliqué
      link.classList.add("active");
      // Charger le contenu correspondant
      const section = link.getAttribute("data-section");
      loadSection(section);
    });
  });

  // Bascule affichage barre latérale
  logoButton.addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });

  // Bouton mode sombre / clair
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "🌙 Mode Sombre / Clair";
  toggleButton.style.position = "fixed";
  toggleButton.style.top = "60px";
  toggleButton.style.right = "10px";
  toggleButton.style.padding = "8px 12px";
  toggleButton.style.cursor = "pointer";
  toggleButton.style.zIndex = "1002";
  document.body.appendChild(toggleButton);

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
