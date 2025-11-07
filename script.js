document.addEventListener("DOMContentLoaded", () => {
  const logoButton = document.getElementById("logoButton");
  const sidebar = document.getElementById("sidebar");

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
