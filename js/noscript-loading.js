// noscript-loading.js
document.addEventListener('DOMContentLoaded', function () {
    const noscriptContainer = document.querySelector('.noscript-message');

    if (noscriptContainer) {
        // Ladeanimation erstellen
        const spinnerElement = document.createElement('div');
        spinnerElement.classList.add('loading-spinner');

        // Nachricht erstellen
        const messageElement = document.createElement('p');
        messageElement.classList.add('message');
        messageElement.textContent = 'Welcome! Please enable JavaScript to fully enjoy our website.';

        // Elemente dem Container hinzufügen
        noscriptContainer.appendChild(spinnerElement);
        noscriptContainer.appendChild(messageElement);

        if (consolen.getConsoleOutput()) {
            console.log('JavaScript is disabled. NoScript message has been created successfully.');
        }
    } else {
        console.error('NoScript container not found.');
    }
});