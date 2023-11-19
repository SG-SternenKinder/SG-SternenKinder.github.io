// language-switcher.js
document.addEventListener('DOMContentLoaded', function () {
    // Holen Sie sich das Element des Sprach-Umschalters
    const languageSwitcher = document.getElementById('language-switcher');

    // Funktion zum Setzen des Zustands des Sprach-Umschalters basierend auf der ausgewählten Sprache
    function setSwitcherState(language) {
        languageSwitcher.checked = language === 'en';
    }

    // Überprüfen und Anpassen des Zustands des Sprach-Umschalters beim Laden der Seite
    const defaultLanguage = 'de';
    const selectedLanguage = CookieUtil.getCookie('language') || defaultLanguage;
    const storedLanguage = localStorage.getItem('selectedLanguage');
    setSwitcherState(storedLanguage || selectedLanguage);

    // Funktion zum Laden von Texten aus der Datei basierend auf der ausgewählten Sprache
    async function loadTexts(language) {
        try {
            const isOnline = navigator.onLine;

            if (!isOnline) {
                // Keine Internetverbindung, zeige den Sprachcode anstelle der Flaggen
                const offlineText = language.toUpperCase();

                const languageElement = document.getElementById('language');
                if (languageElement) {
                    languageElement.innerHTML = offlineText;
                }

                const flagsElement = document.getElementById('flags');
                if (flagsElement) {
                    flagsElement.style.display = 'none';
                }

                return;
            }

            // Lade die Texte normal, wenn eine Internetverbindung besteht
            console.log('Loading texts for language:', language);

            const response = await fetchTexts(language);
            const texts = await response.text();

            texts.split('\n').forEach(function (text) {
                const [key, value] = text.split('=');
                if (key && value) {
                    const element = document.getElementById(key);
                    if (element) {
                        element.innerHTML = value;
                    }
                }
            });
        } catch (error) {
            console.error('Fehler beim Laden der Texte:', error);
        }
    }

    // Funktion zum Fetchen der Texte für eine bestimmte Sprache
    async function fetchTexts(language) {
        try {
            console.log('Fetching texts for language:', language);

            const response = await fetch(`/language/language-${language}.txt`);

            if (!response.ok) {
                throw new Error(`Failed to fetch language file for ${language}`);
            }

            return response;
        } catch (error) {
            throw new Error(`Error fetching language file: ${error.message}`);
        }
    }

    // Funktion zum Aktualisieren des Sprach-Cookies
    function updateLanguageCookie(language) {
        CookieUtil.setCookie('language', language, 4, { secure: true });
    }

    // Überwache Änderungen am Sprach-Umschalter und aktualisiere die Sprache
    languageSwitcher.addEventListener('change', function () {
        // Bestimme die ausgewählte Sprache basierend auf dem Zustand des Sprach-Umschalters
        const selectedLanguage = languageSwitcher.checked ? 'de' : 'en';

        // Aktualisiere das Sprach-Cookie
        updateLanguageCookie(selectedLanguage);

        // Speichere die ausgewählte Sprache im localStorage
        localStorage.setItem('selectedLanguage', selectedLanguage);

        // Lade die Texte basierend auf der ausgewählten Sprache
        loadTexts(selectedLanguage);
    });
});