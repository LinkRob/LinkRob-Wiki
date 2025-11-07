// Ouvrir/fermer barre latérale
const sidebar = document.getElementById("sidebar");
const logo = document.getElementById("logo");

logo.addEventListener("click", () => {
  if (sidebar.style.left === "0px") {
    sidebar.style.left = "-250px"; // fermer
  } else {
    sidebar.style.left = "0px"; // ouvrir
  }
});

// Basculer mode clair/sombre
function toggleMode() {
  document.body.classList.toggle("light-mode");
}
