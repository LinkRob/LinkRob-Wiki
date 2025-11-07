// Sidebar toggle
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const mainContent = document.getElementById('mainContent');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('shifted');
});

// Mode clair / sombre
document.body.classList.add('dark'); // par défaut

// Créer nouvelle page
const editBtn = document.getElementById('editBtn');
editBtn.addEventListener('click', () => {
    const title = prompt("Nom de la nouvelle page :");
    if(title) {
        const pageDiv = document.createElement('div');
        pageDiv.innerHTML = `<h2>${title}</h2>
        <textarea style="width:100%;height:300px;" placeholder="Écrivez votre contenu ici..."></textarea>
        <button onclick="alert('Sauvegardé !')">Sauvegarder</button>`;
        document.getElementById('pageContent').innerHTML = '';
        document.getElementById('pageContent').appendChild(pageDiv);
    }
});

// Barre de recherche
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        alert(`Recherche: ${searchBar.value} (fonctionnalité future pour ouvrir page ou créer nouvelle page)`);
    }
});
