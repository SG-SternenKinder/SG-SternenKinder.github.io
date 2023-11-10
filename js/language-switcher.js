// language-switcher.js
document.addEventListener('DOMContentLoaded', function () {
    const languageSlider = document.getElementById('language-slider');
    const translatableElements = document.querySelectorAll('.translatable');
    const savedLanguage = getCookie('language');

    // Wenn es ein gespeichertes Sprach-Cookie gibt, stelle den Schieberegler entsprechend ein
    if (savedLanguage === 'en') {
        languageSlider.checked = true;
    }

    // Funktion zum Laden von Texten aus der Datei
    function loadTexts(language) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const texts = xhr.responseText.split('\n');
                texts.forEach(function (text) {
                    const [key, value] = text.split('=');
                    if (key && value) {
                        const element = document.getElementById(key);
                        if (element && element.classList.contains('translatable')) {
                            element.textContent = value;
                        }
                    }
                });
            }
        };

        xhr.open('GET', `../language-${language}.txt`, true);
        xhr.send();
    }

    function updateLanguageCookie(language) {
        setCookie('language', language, 4); // Speichere die Sprache für 4 Tage
    }

    // Überwache Änderungen am Schieberegler und speichere die Sprache als Cookie
    languageSlider.addEventListener('change', function () {
        const selectedLanguage = languageSlider.checked ? 'en' : 'de';

        // Aktualisiere den Text der translatable-Elemente basierend auf der ausgewählten Sprache
        loadTexts(selectedLanguage);

        // Speichere die ausgewählte Sprache im Cookie
        updateLanguageCookie(selectedLanguage);
    });

    // Initialisiere den Text basierend auf dem gespeicherten Cookie
    loadTexts(savedLanguage);
});