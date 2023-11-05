// language-switcher.js
document.addEventListener('DOMContentLoaded', function () {
    const languageSlider = document.getElementById('language-slider');
    const savedLanguage = getCookie('language');

    // Wenn es ein gespeichertes Sprach-Cookie gibt, stelle den Schieberegler entsprechend ein
    if (savedLanguage === 'en') {
        languageSlider.checked = true;
    }

    // Überwache Änderungen am Schieberegler und speichere die Sprache als Cookie
    languageSlider.addEventListener('change', function () {
        const selectedLanguage = languageSlider.checked ? 'en' : 'de';
        setCookie('language', selectedLanguage, 7); // Cookie für 7 Tage speichern
        updateText(selectedLanguage);
        showConfirmationPopup(); // Zeige das Popup zur Bestätigung
        // Hier könntest du den Code einfügen, um die entsprechenden Seiten zu laden
        loadPageContent(selectedLanguage);
    });

    // Initialisiere den Text basierend auf dem gespeicherten Cookie
    updateText(savedLanguage);
    // Hier kannst du den Code einfügen, um die entsprechenden Seiten basierend auf dem gespeicherten Cookie zu laden
    loadPageContent(savedLanguage);
});

// Funktion zum Laden der Seiteninhalte basierend auf der ausgewählten Sprache
function loadPageContent(language) {
    const contentContainer = document.getElementById('content-container');

    // Hier musst du den Code hinzufügen, um die Seiteninhalte basierend auf der ausgewählten Sprache zu laden und im contentContainer anzuzeigen.
    // Du könntest die Inhalte von verschiedenen Dateien laden, z. B. "de/index.html" und "en/index.html" für die Hauptseite, und so weiter.

    // Ein einfaches Beispiel:
    fetch(`${language}/index.html`) // Annahme: Die Seiten befinden sich in separaten Verzeichnissen "de" und "en".
        .then((response) => response.text())
        .then((html) => {
            contentContainer.innerHTML = html;
        })
        .catch((error) => {
            console.error(`Fehler beim Laden der Seite: ${error}`);
        });
}