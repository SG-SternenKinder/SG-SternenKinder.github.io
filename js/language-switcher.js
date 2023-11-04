// language-switcher.js
document.addEventListener('DOMContentLoaded', function () {
    const languageSlider = document.getElementById('language-slider');
    const savedLanguage = getCookie('language');

    // Wenn es ein gespeichertes Sprach-Cookie gibt, stelle den Schieberegler entsprechend ein
    if (savedLanguage === 'en') {
        languageSlider.checked = true;
    }

    // Überwache Änderungen am Schieberegler und speichere die Sprache als Cookie mit 7 Tagen Ablaufzeit
    languageSlider.addEventListener('change', function () {
        const selectedLanguage = languageSlider.checked ? 'en' : 'de';
        setCookie('language', selectedLanguage, 7); // Hier die Ablaufzeit auf 7 Tage festlegen
        updateText(selectedLanguage);
        showConfirmationPopup(); // Zeige das Popup zur Bestätigung
    });

    // Initialisiere den Text basierend auf dem gespeicherten Cookie
    updateText(savedLanguage);
});

// Diese Funktion aktualisiert den Text basierend auf der ausgewählten Sprache
function updateText(language) {
    const mainTitle = document.getElementById('main-title');
    const mainText = document.getElementById('main-text');

    if (language === 'de') {
        mainTitle.textContent = 'TEST\nTEXT';
        mainText.textContent = 'DIES IST EIN TEST TEXT';
    } else if (language === 'en') {
        mainTitle.textContent = 'TEST\nTEXT';
        mainText.textContent = 'THIS IS A TEST TEXT';
    }
}

// Funktion zum Sprachwechsel
function changeLanguage(language) {
    const languageSlider = document.getElementById('language-slider');
    if (language === 'de') {
        languageSlider.checked = false;
    } else if (language === 'en') {
        languageSlider.checked = true;
    }
}