// Firebase config (remplace par ton config Firebase)
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://VOTRE_PROJECT_ID.firebaseio.com",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Toggle barre latérale
const sidebar = document.getElementById("sidebar");
const logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  sidebar.style.left = sidebar.style.left === "0px" ? "-250px" : "0px";
});

// Recherche de pages
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const newPageDiv = document.getElementById("new-page");
const dynamicContent = document.getElementById("dynamic-content");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return;
  const pageRef = db.ref("pages/" + query);
  pageRef.get().then((snapshot) => {
    if (snapshot.exists()) {
      dynamicContent.innerHTML = `<h2>${query}</h2><p>${snapshot.val()}</p>`;
    } else {
      newPageDiv.style.display = "block";
      document.getElementById("new-page-title").value = query;
    }
  });
});

// Créer/modifier page
document.getElementById("create-page-btn").addEventListener("click", () => {
  const title = document.getElementById("new-page-title").value.trim();
  const content = document.getElementById("new-page-content").value.trim();
  if (!title || !content) { alert("Remplissez tout !"); return; }
  db.ref("pages/" + title).set(content);
  dynamicContent.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
  newPageDiv.style.display = "none";
  document.getElementById("new-page-title").value = "";
  document.getElementById("new-page-content").value = "";
});

// Sidebar links
document.querySelectorAll(".sidebar-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    searchInput.value = page;
    searchBtn.click();
  });
});

// Mode clair/sombre Zelda
const themeBtn = document.getElementById("theme-toggle");
let darkMode = true;
themeBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.style.backgroundImage = darkMode 
    ? "url('https://images.unsplash.com/photo-1589830918436-556c879ff231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8emVsZGElMjBsaWdodHxlbnwwfHwwfHw&ixlib=rb-4.0.3&q=80&w=1080')"
    : "url('https://images.unsplash.com/photo-1592322833315-84aab7c80d42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8emVsZGElMjBsaWdodHxlbnwwfHwwfHw&ixlib=rb-4.0.3&q=80&w=1080')";
  document.body.style.color = darkMode ? "white" : "black";
});
