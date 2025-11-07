// Exemple bascule mode sombre / clair
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "🌙 Mode Sombre / Clair";
  toggleButton.style.position = "fixed";
  toggleButton.style.top = "10px";
  toggleButton.style.right = "10px";
  toggleButton.style.padding = "8px 12px";
  toggleButton.style.cursor = "pointer";
  document.body.appendChild(toggleButton);

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
