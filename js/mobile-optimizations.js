// mobile-optimizations.js

// Warte, bis das DOM vollständig geladen ist, bevor die Optimierungen angewendet werden
document.addEventListener('DOMContentLoaded', function () {

    // Vergrößere die Klickfläche für Links in der Navbar für Touch-Geräte
    const navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(link => {
        link.style.padding = '15px 25px'; // Ändere die Polsterung für Links
    });

    // Führe die Funktion einmal beim Laden aus und dann jedes Mal, wenn das Fenster neu skaliert wird
    updateBackgroundImage();
    window.addEventListener('resize', updateBackgroundImage);
    
    // Führe die Funktion beim Laden der Seite und bei jedem Neuskalieren des Fensters aus
    window.addEventListener('DOMContentLoaded', updateStylesForMobile);
    window.addEventListener('resize', updateStylesForMobile);

});
