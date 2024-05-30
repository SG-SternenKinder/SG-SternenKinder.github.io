// noscript-loading.js
$(document).ready(function () {
    const noscriptContainer = $('.noscript-message');

    if (noscriptContainer.length) {
        createLoadingAnimation(noscriptContainer);

        logToConsole('JavaScript is enabled. NoScript message has been created successfully.');
    } else {
        console.error('NoScript container not found.');
    }

    /**
     * Erstellt und fügt eine Ladeanimation und Nachricht in das angegebene Container-Element ein.
     * @param {jQuery} container - Das Container-Element, in das die Ladeanimation eingefügt werden soll.
     */
    function createLoadingAnimation(container) {
        const spinnerElement = $('<div>').addClass('loading-spinner');
        spinnerElement.css('borderColor', getRandomColor());

        const messageElement = $('<p>').addClass('message').text('Welcome! Please enable JavaScript to fully enjoy our website.');

        container.append(spinnerElement);
        container.append(messageElement);
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

    /**
     * Loggt Nachrichten in die Konsole, falls der consoleManager aktiviert ist.
     * @param {string} message - Die zu loggende Nachricht.
     */
    function logToConsole(message) {
        if (typeof $.consoleManager !== 'undefined' && $.consoleManager.getConsoleOutput()) {
            console.log(message);
        }
    }
});
