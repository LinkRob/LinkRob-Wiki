// Firebase config
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
const storage = firebase.storage();

// Sidebar toggle
const sidebar = document.getElementById("sidebar");
document.getElementById("logo").addEventListener("click", () => {
  sidebar.style.left = sidebar.style.left === "0px" ? "-250px" : "0px";
});

// Theme toggle
let darkMode = true;
document.getElementById("theme-toggle").addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("light-mode", !darkMode);
});

// Search page
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const editor = document.getElementById("editor");
const dynamicContent = document.getElementById("dynamic-content");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return;
  db.ref("pages/" + query).get().then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      dynamicContent.innerHTML = `<h2>${query}</h2><p>${data.content}</p>${data.image ? `<img src="${data.image}" style="max-width:400px;">` : ""}`;
    } else {
      editor.style.display = "block";
      document.getElementById("page-title").value = query;
      document.getElementById("page-content").value = "";
    }
  });
});

// Open editor
document.getElementById("create-btn").addEventListener("click", () => {
  editor.style.display = "block";
});

// Save page & image
document.getElementById("save-btn").addEventListener("click", () => {
  const title = document.getElementById("page-title").value.trim();
  const content = document.getElementById("page-content").value.trim();
  const imageFile = document.getElementById("image-upload").files[0];
  const imageName = document.getElementById("image-name").value.trim();

  if (!title || !content) { alert("Remplissez titre et contenu !"); return; }

  if (imageFile && imageName) {
    const storageRef = storage.ref("images/" + imageName);
    storageRef.put(imageFile).then(() => {
      storageRef.getDownloadURL().then(url => {
        db.ref("pages/" + title).set({content, image: url});
        dynamicContent.innerHTML = `<h2>${title}</h2><p>${content}</p><img src="${url}" style="max-width:400px;">`;
        editor.style.display = "none";
      });
    });
  } else {
    db.ref("pages/" + title).set({content});
    dynamicContent.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
    editor.style.display = "none";
  }
});

// Sidebar navigation
document.querySelectorAll(".sidebar-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    searchInput.value = link.dataset.page;
    searchBtn.click();
  });
});
