// language-switcher.js
document.addEventListener('DOMContentLoaded', function () {
    const languageSlider = document.getElementById('language-slider');
    const savedLanguage = getCookie('language');
    const languageLabels = {
        'de': {
            label: 'Sprache',
            sliderText: 'Language'
        },
        'en': {
            label: 'Language',
            sliderText: 'Sprache'
        }
    };

    // Wenn es ein gespeichertes Sprach-Cookie gibt, stelle den Schieberegler entsprechend ein
    if (savedLanguage === 'en') {
        languageSlider.checked = true;
    }

    // Setze den Text basierend auf der gespeicherten Sprache
    const languageLabel = document.querySelector('.language-label');
    const sliderText = document.querySelector('.slider-text');
    languageLabel.textContent = languageLabels[savedLanguage].label;
    sliderText.textContent = languageLabels[savedLanguage].sliderText;

    // Überwache Änderungen am Schieberegler und speichere die Sprache als Cookie
//todo Sessionstorage better way
    languageSlider.addEventListener('change', function () {
        const selectedLanguage = languageSlider.checked ? 'en' : 'de';


        updateText(selectedLanguage);
        showConfirmationPopup(); // Zeige das Popup zur Bestätigung
        loadPageContent(selectedLanguage);
        // Aktualisiere den Text des Language Switchers basierend auf der ausgewählten Sprache
        languageLabel.textContent = languageLabels[selectedLanguage].label;
        sliderText.textContent = languageLabels[selectedLanguage].sliderText;
    });

    // Initialisiere den Text basierend auf dem gespeicherten Cookie
    updateText(savedLanguage);
    loadPageContent(savedLanguage);
});