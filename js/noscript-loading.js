// noscript-loading.js
document.addEventListener('DOMContentLoaded', function () {
    const messageElement = document.querySelector('.message');
    const spinnerElement = document.querySelector('.loading-spinner');

    // Array mit freundlichen Nachrichten
    const messages = [
        "Willkommen! Bitte aktiviere JavaScript, um unsere Website vollständig zu genießen.",
        "JavaScript macht unsere Website interaktiv und benutzerfreundlich. Aktiviere es, um alle Funktionen zu nutzen!",
        "Hey! Unsere Website wird noch besser, wenn du JavaScript einschaltest. Viel Spaß beim Erkunden!"
    ];

    let messageIndex = 0;

    // Funktion zum Wechseln der Nachrichten alle 8 Sekunden
    function changeMessage() {
        messageElement.textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length;
    }

    // Initialisiere die erste Nachricht
    changeMessage();

    // Starte die Animation und den Nachrichtenwechsel
    setInterval(function () {
        spinnerElement.style.borderTopColor = getRandomColor();
        changeMessage();
    }, 8000);

    // Hilfsfunktion für eine zufällige Farbe
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});