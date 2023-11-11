// language-switcher.js
document.addEventListener('DOMContentLoaded', function () {
    const languageSlider = document.getElementById('language-slider');

    // Funktion zum Laden von Texten aus der Datei
    async function loadTexts(language) {
        try {
            const response = await fetchTexts(language);
            const texts = await response.text();

            texts.split('\n').forEach(function (text) {
                const [key, value] = text.split('=');
                if (key && value) {
                    const element = document.getElementById(key);
                    if (element) {
                        element.textContent = value;
                    }
                }
            });

            // Aktualisiere auch die Texte der Navbar
            updateNavbarTexts(texts, language);
        } catch (error) {
            console.error('Fehler beim Laden der Texte:', error);
        }
    }

    async function fetchTexts(language) {
        // Hier den Pfad zur zentralen Textdatei einfügen
        const response = await fetch(`../language/language-${language}.txt`);
        return response;
    }

    function updateNavbarTexts(texts, language) {
        // Array mit den IDs der Navbar-Elemente
        const navbarElementIds = ['home-link', 'about-link', 'contact-link', 'privacy-link', 'imprint-link'];

        navbarElementIds.forEach(function (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                // Ersetze '-link' am Ende der ID mit '' (leerem String) für die entsprechende Text-ID
                const textId = elementId.replace('-link', '');
                const newText = getTextValue(textId, texts);
                element.textContent = newText;
            }
        });
    }

    function getTextValue(textId, texts) {
        // Finde die Zeile in den Texten, die mit der gewünschten ID beginnt
        const regex = new RegExp(`^${textId}=`);

        // Filtere die Zeilen basierend auf der ID
        const matchingLines = texts.split('\n').filter(line => regex.test(line));

        // Extrahiere den Wert aus der Zeile (alles nach dem Gleichheitszeichen)
        if (matchingLines.length > 0) {
            return matchingLines[0].split('=')[1];
        }

        // Wenn keine Übereinstimmung gefunden wurde, gib eine leere Zeichenfolge zurück
        return '';
    }

    function updateLanguageCookie(language) {
        setCookie('language', language, 4); // Speichere die Sprache für 4 Tage
    }

    function setSliderState(language) {
        languageSlider.checked = language === 'en';
    }

    // Initialisiere den Text basierend auf dem gespeicherten Cookie
    const savedLanguage = getCookie('language') || 'de';
    setSliderState(savedLanguage);

    // Lade die Texte basierend auf der gespeicherten Sprache
    loadTexts(savedLanguage);

    // Überwache Änderungen am Schieberegler und speichere die Sprache als Cookie
    languageSlider.addEventListener('change', function () {
        const selectedLanguage = languageSlider.checked ? 'en' : 'de';

        // Aktualisiere den Text der Elemente basierend auf der ausgewählten Sprache
        loadTexts(selectedLanguage);

        // Speichere die ausgewählte Sprache im Cookie
        updateLanguageCookie(selectedLanguage);
    });
});