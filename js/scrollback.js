//scrollback.js
document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopButton = document.getElementById('scroll-to-top');

    // Zeige oder verberge den Zurückscroll-Pfeil basierend auf der Bildschirmposition
    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.body.classList.add('scroll-up');
        } else {
            document.body.classList.remove('scroll-up');
        }
    });

    // Füge einen Event Listener für das Zurückscrollen hinzu
    scrollToTopButton.addEventListener('click', function () {
        document.body.scrollTop = 0; // Für Safari und ältere Browser
        document.documentElement.scrollTop = 0; // Für moderne Browser
        document.body.classList.remove('scroll-up'); // Entferne die Klasse beim Zurückscrollen
    });
});