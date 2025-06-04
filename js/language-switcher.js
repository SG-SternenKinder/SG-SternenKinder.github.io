/**
 * Sprachumschalter-Komponente
 * @namespace languageSwitcher
 */
(function($) {
    'use strict';

    // Konfiguration
    const config = {
        cookieName: 'language',
        cookieDuration: 4, // Tage
        cookieOptions: { secure: true },
        defaultLanguage: 'de',
        textFilesPath: '/language/language-',
        logPrefix: '[Sprachumschalter]'
    };

    // DOM-Elemente
    const $elements = {
        slider: $('#language-slider'),
        languageDisplay: $('#language'),
        flagsDisplay: $('#flags')
    };

    // Zustand
    let currentLanguage = $.CookieUtil.getCookie(config.cookieName) || config.defaultLanguage;

    /**
     * Initialisiert den Sprachumschalter
     */
    async function init() {
        setSliderState();
        await loadTexts(currentLanguage);
        setupEventListeners();
    }

    /**
     * Setzt den Slider-Zustand basierend auf der aktuellen Sprache
     */
    function setSliderState() {
        $elements.slider.prop('checked', currentLanguage === 'en');
        log(`Slider auf ${currentLanguage} gesetzt`);
    }

    /**
     * Lädt die Texte für die ausgewählte Sprache
     * @param {string} language - Sprachcode (z.B. 'de', 'en')
     */
    async function loadTexts(language) {
        if (!navigator.onLine) {
            handleOfflineState(language);
            return;
        }

        try {
            const response = await fetch(`${config.textFilesPath}${language}.txt`);
            
            if (!response.ok) {
                throw new Error(`Sprachdatei konnte nicht geladen werden (Status: ${response.status})`);
            }

            const textData = await response.text();
            applyTexts(textData);
            log(`Texte für ${language} erfolgreich geladen`);
        } catch (error) {
            console.error(`${config.logPrefix} Fehler:`, error);
        }
    }

    /**
     * Behandelt den Offline-Zustand
     * @param {string} language - Aktuelle Sprache
     */
    function handleOfflineState(language) {
        if ($elements.languageDisplay.length) {
            $elements.languageDisplay.text(language.toUpperCase());
        }
        
        if ($elements.flagsDisplay.length) {
            $elements.flagsDisplay.hide();
        }
        
        log(`Offline - Sprachcode angezeigt: ${language}`);
    }

    /**
     * Wendet die geladenen Texte auf die Seite an
     * @param {string} textData - Rohdaten der Sprachdatei
     */
    function applyTexts(textData) {
        textData.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                $(`#${key}`).html(value);
            }
        });
    }

    /**
     * Aktualisiert das Sprach-Cookie
     * @param {string} language - Neue Sprache
     */
    function updateLanguageCookie(language) {
        $.CookieUtil.setCookie(
            config.cookieName, 
            language, 
            config.cookieDuration, 
            config.cookieOptions
        );
        log(`Sprach-Cookie aktualisiert: ${language}`);
    }

    /**
     * Richtet Event-Listener ein
     */
    function setupEventListeners() {
        $elements.slider.on('change', async function() {
            currentLanguage = $(this).prop('checked') ? 'en' : 'de';
            await loadTexts(currentLanguage);
            updateLanguageCookie(currentLanguage);
        });
    }

    /**
     * Loggt Nachrichten in die Konsole
     * @param {string} message - Nachricht
     */
    function log(message) {
        if (typeof $.consoleManager !== 'undefined' && $.consoleManager.getConsoleOutput()) {
            console.log(`${config.logPrefix} ${message}`);
        }
    }

    // Initialisierung
    $(document).ready(init);

})(jQuery);