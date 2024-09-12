// noscript-loading.js
$(document).ready(function () {
    const noscriptContainer = $('.noscript-message');
    const mainContent = $('.main-content'); // Beispiel eines wichtigen Seitenelements

    // Überprüfen, ob das noscriptContainer vorhanden ist
    if (noscriptContainer.length) {
        createLoadingAnimation(noscriptContainer);
        $.consoleManager.logToConsoleOnce('JavaScript is enabled. NoScript message has been created successfully.', 'noscript-loading');
    } else {
        $.consoleManager.error('NoScript container not found.');
    }

    // Überprüfen, ob das mainContent vorhanden ist
    if (mainContent.length) {
        $.consoleManager.logToConsoleOnce('Main content loaded successfully.', 'main-content-check');
    } else {
        $.consoleManager.error('Main content not found.');
    }

    // Überprüfen, ob das Body-Element vorhanden ist
    if ($('body').length === 0) {
        $.consoleManager.error('Body tag is missing. This might cause issues.');
    }

    /**
     * Erstellt und fügt eine Ladeanimation und Nachricht in das angegebene Container-Element ein.
     * @param {jQuery} container - Das Container-Element, in das die Ladeanimation eingefügt werden soll.
     */
    function createLoadingAnimation(container) {
        // Spinner-Element erstellen
        const spinnerElement = $('<div>').addClass('loading-spinner');
        spinnerElement.css({
            'borderColor': getRandomColor(),
            'borderTopColor': 'transparent',  // Für den Dreheffekt
            'animation': 'spin 2s linear infinite'  // Rotationseffekt
        });

        // Begrüßungsnachricht erstellen
        const messageElement = $('<p>').addClass('message').text('Welcome! Please enable JavaScript to fully enjoy our website.');

        // Beide Elemente einfügen
        container.append(spinnerElement);
        container.append(messageElement);

        // Fade-In-Effekt anwenden
        container.hide().fadeIn(1000);  // Sanfte Einblendung über 1 Sekunde
    }

    /**
     * Gibt eine zufällige Hex-Farbe zurück.
     * @returns {string} - Eine zufällige Hex-Farbe.
     */
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
