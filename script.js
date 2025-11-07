const sidebar = document.getElementById("sidebar");
const menuLogo = document.getElementById("menu-logo");
const mainContent = document.getElementById("main-content");
const editor = document.getElementById("editor");

menuLogo.onclick = () => { sidebar.style.left = sidebar.style.left==="0px" ? "-300px" : "0px"; }

function toggleTheme(){ document.body.classList.toggle("light-mode"); }

function showPage(pageName){
  const content = localStorage.getItem(pageName);
  mainContent.innerHTML = `<div id="dynamic-content"><h2>${pageName}</h2><p>${content ? content : "Aucune info pour cette page."}</p></div>`;
}

function createPage(){
  editor.style.display = "block";
  mainContent.style.display = "none";
  document.getElementById("page-title").value="";
  document.getElementById("page-content").value="";
}

function savePage(){
  const title=document.getElementById("page-title").value;
  const content=document.getElementById("page-content").value;
  if(title && content){
    localStorage.setItem(title,content);
    editor.style.display="none";
    mainContent.style.display="block";
    showPage(title);
  } else { alert("Remplissez le titre et le contenu !"); }
}

function closeEditor(){ editor.style.display="none"; mainContent.style.display="block"; }

document.getElementById("searchInput").addEventListener("keypress", function(e){
  if(e.key==='Enter'){
    const query=e.target.value;
    const content=localStorage.getItem(query);
    if(content){ showPage(query); }
    else { if(confirm("Page non trouvée. Voulez-vous la créer ?")){ createPage(); document.getElementById("page-title").value=query; } }
  }
});
