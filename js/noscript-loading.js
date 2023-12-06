// noscript-loading.js
$(document).ready(function () {
    const noscriptContainer = $('.noscript-message');

    if (noscriptContainer.length) {
        // Ladeanimation erstellen
        const spinnerElement = $('<div>').addClass('loading-spinner');
        spinnerElement.css('borderColor', getRandomColor()); // Setze die zufällige Farbe

        // Nachricht erstellen
        const messageElement = $('<p>').addClass('message').text('Welcome! Please enable JavaScript to fully enjoy our website.');

        // Elemente dem Container hinzufügen
        noscriptContainer.append(spinnerElement);
        noscriptContainer.append(messageElement);

        if ($.consoleManager.getConsoleOutput()) {
            console.log('JavaScript is enabled. NoScript message has been created successfully.');
        }
    } else {
        console.error('NoScript container not found.');
    }

    // Funktion für eine zufällige Hex-Farbe
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
