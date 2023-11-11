// language-switcher.js
document.addEventListener('DOMContentLoaded', function () {
    const languageSlider = document.getElementById('language-slider');
    const navbarLinks = document.querySelectorAll('.navbar a');

    // Konsolenausgabe für Debugging
    for (const link of navbarLinks) {
        console.log(link.href, window.location.href);
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    }

    // Funktion zum Laden von Texten aus der Datei
    async function loadTexts(language) {
        try {
            const response = await fetchTexts(language);
            const texts = await response.text();
            updatePageTexts(texts);
            updateTexts(texts, language);
            loadDynamicTexts(texts);
        } catch (error) {
            console.error('Fehler beim Laden der Texte:', error);
        }
    }

    // Funktion zum Fetchen der Texte
    async function fetchTexts(language) {
        try {
            const response = await fetch(`language/language-${language}.txt`);
            if (!response.ok) {
                throw new Error(`Failed to fetch language file for ${language}`);
            }
            return response;
        } catch (error) {
            throw new Error(`Error fetching language file: ${error.message}`);
        }
    }

    // Funktion zum Aktualisieren von statischem Text
    function updatePageTexts(texts) {
        const ElementIds = ['home-link', 'about-link', 'contact-link', 'privacy-link', 'imprint-link'];
        ElementIds.forEach(function (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                const textId = elementId.replace('-link', '');
                const newText = getTextValue(textId, texts);
                element.innerHTML = newText;
            }
        });
    }

    function updateTexts(texts, language) {
        // Array mit den IDs der Navbar-Elemente
        const ElementIds = ['home-link', 'about-link', 'contact-link', 'privacy-link', 'imprint-link', 'tiktok-link', 'instagram-link', 'discord-link', 'github-link'];

        ElementIds.forEach(function (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                // Ersetze '-link' am Ende der ID mit '' (leerem String) für die entsprechende Text-ID
                const textId = elementId.replace('-link', '');
                const newText = getTextValue(textId, texts);
                element.innerHTML = newText;
            }
        });

        // Funktion zum Aktualisieren von dynamischem Text
        async function loadDynamicTexts(texts) {
            try {
                const linkTexts = await getLinkTexts();
                const tikTokLink = getTextValue('tiktok-link', linkTexts);
                const instagramLink = getTextValue('instagram-link', linkTexts);
                const discordLink = getTextValue('discord-link', linkTexts);
                const githubLink = getTextValue('github-link', linkTexts);

                document.getElementById('tiktok-link').addEventListener('click', function () {
                    checkLink('TikTok', tikTokLink);
                });

                document.getElementById('instagram-link').addEventListener('click', function () {
                    checkLink('Instagram', instagramLink);
                });

                document.getElementById('discord-link').addEventListener('click', function () {
                    checkLink2('Discord', discordLink);
                });

                document.getElementById('github-link').addEventListener('click', function () {
                    checkLink2('Github', githubLink);
                });
            } catch (error) {
                console.error('Fehler beim Laden dynamischer Texte:', error);
            }
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

        loadDynamicTexts();
    }

    // Funktion zum Abrufen der Link-Texte
    async function getLinkTexts() {
        const savedLanguage = getCookie('language') || 'de';
        const response = await fetchTexts(savedLanguage);
        const texts = await response.text();
        return texts;
    }
    // Initialisierung basierend auf gespeichertem Cookie
    const savedLanguage = getCookie('language') || 'de';
    setSliderState(savedLanguage);
    loadTexts(savedLanguage);

    // Überwachung des Schiebereglers und Speichern der Sprache im Cookie
    languageSlider.addEventListener('change', function () {
        const selectedLanguage = languageSlider.checked ? 'en' : 'de';
        loadTexts(selectedLanguage);
        updateLanguageCookie(selectedLanguage);
    });
});