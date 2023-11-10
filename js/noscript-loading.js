// noscript-loading.js
document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.querySelector('body');

    // Array mit freundlichen Nachrichten
    const messages = [
        "Willkommen! Bitte aktiviere JavaScript, um unsere Website vollständig zu genießen.",
        "JavaScript macht unsere Website interaktiv und benutzerfreundlich. Aktiviere es, um alle Funktionen zu nutzen!",
        "Hey! Unsere Website wird noch besser, wenn du JavaScript einschaltest. Viel Spaß beim Erkunden!"
    ];

    // Zufällige Nachricht auswählen
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // Verstecke den Ladebildschirm und zeige den Content
    loadingScreen.classList.add('hidden');
    content.classList.remove('hidden');

    // Zeige freundliche Nachricht an
    const messageElement = document.createElement('p');
    messageElement.textContent = randomMessage;
    loadingScreen.appendChild(messageElement);

    const loadingSpinner = document.createElement('div');
    loadingSpinner.classList.add('loading-spinner');
    loadingScreen.appendChild(loadingSpinner);

    // Füge eine freundliche Animation hinzu (z.B. Hervorhebung des Textes)
    setInterval(function () {
        messageElement.classList.toggle('highlight');
    }, 1000);

});
