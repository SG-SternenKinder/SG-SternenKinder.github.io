// noscript-loading.js
document.addEventListener('DOMContentLoaded', function () {
    const noscriptContainer = document.querySelector('.noscript-message');

    // Überprüfen, ob das noscriptContainer vorhanden ist
    if (noscriptContainer) {
        createLoadingAnimation(noscriptContainer);
        console.log('JavaScript is enabled. NoScript message has been created successfully.');
    } else {
        console.error('NoScript container not found.');
    }

    // Überprüfen, ob das Body-Element vorhanden ist
    if (!document.body) {
        console.error('Body tag is missing. This might cause issues.');
    }

    /**
     * Erstellt und fügt eine Ladeanimation und Nachricht in das angegebene Container-Element ein.
     * @param {HTMLElement} container - Das Container-Element, in das die Ladeanimation eingefügt werden soll.
     */
    function createLoadingAnimation(container) {
        // Spinner-Element erstellen
        const spinnerElement = document.createElement('div');
        spinnerElement.className = 'loading-spinner';
        spinnerElement.style.borderColor = getRandomColor();
        spinnerElement.style.borderTopColor = 'transparent';  // Für den Dreheffekt
        spinnerElement.style.animation = 'spin 2s linear infinite';  // Rotationseffekt

        // Begrüßungsnachricht erstellen
        const messageElement = document.createElement('p');
        messageElement.className = 'message';
        messageElement.textContent = 'Welcome! Please enable JavaScript to fully enjoy our website.';

        // Beide Elemente einfügen
        container.appendChild(spinnerElement);
        container.appendChild(messageElement);

        // Fade-In-Effekt anwenden
        container.style.display = 'none';
        container.style.transition = 'opacity 1s';
        container.style.opacity = '1';
        container.style.display = 'block';
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
