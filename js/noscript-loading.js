// noscript-loading.js
document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.querySelector('body');

    // Verstecke den Ladebildschirm und zeige den Content
    loadingScreen.classList.add('hidden');
    content.classList.remove('hidden');
});