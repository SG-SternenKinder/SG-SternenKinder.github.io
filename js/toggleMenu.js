// toggleMenu.js

// Funktion zum Umschalten des Menüs
function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navbar.classList.toggle('active');
    const ariaExpanded = navbar.classList.contains('active') ? 'true' : 'false';
    menuToggle.setAttribute('aria-expanded', ariaExpanded);

    // Konsolenausgabe über consoleManager
    if (navbar.classList.contains('active')) {
        $.consoleManager.logToConsoleOnce('Menü wurde geöffnet', 'menu-toggle');
    } else {
        $.consoleManager.logToConsoleOnce('Menü wurde geschlossen', 'menu-toggle');
    }
}

// Event-Listener für das Klicken auf das Menü-Symbol
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);
});

// Event-Listener für die Änderung der Bildschirmgröße
window.addEventListener('resize', function() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');

    // Menü ausblenden, wenn die Bildschirmgröße groß genug ist
    if (window.innerWidth > 768) {
        navbar.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});
