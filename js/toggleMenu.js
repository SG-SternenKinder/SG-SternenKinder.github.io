//toggleMenu.js

// Funktion zum Umschalten des Menüs
function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navbar.classList.toggle('active');
    const ariaExpanded = navbar.classList.contains('active') ? 'true' : 'false';
    menuToggle.setAttribute('aria-expanded', ariaExpanded);

    // Konsolenausgabe
    if (navbar.classList.contains('active')) {
        logToConsole('Menü wurde geöffnet');
    } else {
        logToConsole('Menü wurde geschlossen');
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

        // Konsolenausgabe
        logToConsole('Bildschirmgröße wurde geändert (resize)');
    }
});

/**
 * Loggt Nachrichten in die Konsole, wenn consoleManager aktiviert ist
 * @param {string} message - Die Nachricht zum Loggen
 */
function logToConsole(message) {
    if (typeof $.consoleManager !== 'undefined' && $.consoleManager.getConsoleOutput()) {
        console.log(message);
    }
}
