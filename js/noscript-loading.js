// noscript-loading.js
document.addEventListener('DOMContentLoaded', function () {
    const noscriptContainer = document.querySelector('.noscript-message');

    if (noscriptContainer) {
        // Ladeanimation erstellen
        const spinnerElement = document.createElement('div');
        spinnerElement.classList.add('loading-spinner');
        spinnerElement.style.borderColor = getRandomColor(); // Setze die zufällige Farbe

        // Nachricht erstellen
        const messageElement = document.createElement('p');
        messageElement.classList.add('message');
        messageElement.textContent = 'Welcome! Please enable JavaScript to fully enjoy our website.';

        // Elemente dem Container hinzufügen
        noscriptContainer.appendChild(spinnerElement);
        noscriptContainer.appendChild(messageElement);

        if (consoleManager.getConsoleOutput()) {
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