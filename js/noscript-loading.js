/**
 * NoScript Loading Manager - Handhabung der NoScript-Nachricht und Ladeanimation
 * @namespace noScriptManager
 */
(function() {
    'use strict';

    // Konfiguration
    const config = {
        selectors: {
            noScriptContainer: '.noscript-message',
            body: 'body'
        },
        messages: {
            welcome: 'Willkommen! Bitte aktivieren Sie JavaScript für das beste Erlebnis.',
            success: 'JavaScript ist aktiviert. NoScript-Nachricht wurde erfolgreich erstellt.',
            errors: {
                noContainer: 'NoScript-Container nicht gefunden.',
                noBody: 'Body-Tag fehlt. Dies könnte Probleme verursachen.'
            }
        },
        styles: {
            spinner: {
                borderColor: getRandomColor(),
                borderTopColor: 'transparent',
                animation: 'spin 2s linear infinite'
            },
            container: {
                transition: 'opacity 1s',
                opacity: '1'
            }
        }
    };

    // DOM-Elemente
    const domElements = {
        body: document.querySelector(config.selectors.body),
        noScriptContainer: document.querySelector(config.selectors.noScriptContainer)
    };

    /**
     * Initialisiert den NoScript-Manager
     */
    function init() {
        validateDOM();
        
        if (domElements.noScriptContainer) {
            createLoadingAnimation();
            log(config.messages.success);
        }
    }

    /**
     * Validiert notwendige DOM-Elemente
     */
    function validateDOM() {
        if (!domElements.body) {
            console.error(config.messages.errors.noBody);
        }
        if (!domElements.noScriptContainer) {
            console.error(config.messages.errors.noContainer);
        }
    }

    /**
     * Erstellt die Ladeanimation und Nachricht
     */
    function createLoadingAnimation() {
        const spinner = createSpinner();
        const message = createMessage();
        
        appendElements(spinner, message);
        applyFadeInEffect();
    }

    /**
     * Erstellt den Spinner
     * @returns {HTMLElement} Spinner-Element
     */
    function createSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        
        // Stile anwenden
        Object.assign(spinner.style, config.styles.spinner);
        
        return spinner;
    }

    /**
     * Erstellt die Willkommensnachricht
     * @returns {HTMLElement} Nachrichten-Element
     */
    function createMessage() {
        const message = document.createElement('p');
        message.className = 'message';
        message.textContent = config.messages.welcome;
        return message;
    }

    /**
     * Fügt Elemente dem Container hinzu
     * @param {HTMLElement} spinner 
     * @param {HTMLElement} message 
     */
    function appendElements(spinner, message) {
        domElements.noScriptContainer.appendChild(spinner);
        domElements.noScriptContainer.appendChild(message);
    }

    /**
     * Wendet Fade-In-Effekt an
     */
    function applyFadeInEffect() {
        const container = domElements.noScriptContainer;
        container.style.display = 'none';
        Object.assign(container.style, config.styles.container);
        container.style.display = 'block';
    }

    /**
     * Generiert eine zufällige Farbe
     * @returns {string} Hex-Farbcode
     */
    function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    /**
     * Loggt Nachrichten in die Konsole
     * @param {string} message 
     */
    function log(message) {
        console.log('[NoScriptManager] ' + message);
    }

    // Initialisierung wenn DOM bereit ist
    if (document.readyState !== 'loading') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

})();