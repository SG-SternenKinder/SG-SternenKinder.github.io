// footer-loading-screen.js
document.addEventListener('DOMContentLoaded', function () {
    // JavaScript-Code für die Aktivierung und Deaktivierung des Ladebildschirms
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.querySelector('body');

    // Warte auf das 'load'-Ereignis (Seite ist vollständig geladen)
    window.addEventListener('load', function () {
        // Verstecke den Ladebildschirm und zeige den Content
        loadingScreen.classList.add('hidden');
        content.classList.remove('hidden');
    });

    // Das Ziel-Element, in das der Footer geladen werden soll
    var footerContainer = document.getElementById('footer-container');

    // Lade den Footer von der "footer.html"-Datei
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'footer/footer.html', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Füge den Footer-Inhalt dem Ziel-Element hinzu
            footerContainer.innerHTML = xhr.responseText;
        }
    };
    xhr.send();
});

// Diese Variable speichert die aktuelle Sprache
let currentLanguage = 'de';

// Diese Funktion ändert die Sprache
function changeLanguage(language) {
    currentLanguage = language;
    updateText();
}

// Diese Funktion aktualisiert den Text basierend auf der ausgewählten Sprache
function updateText() {
    if (currentLanguage === 'de') {
        // Texte für die Deutsche Sprache
        document.getElementById('main-title').textContent = 'TEST TEXT';
        document.getElementById('main-text').textContent = 'DIES IST EIN TEST TEXT';
        // Hier weitere Texte in Deutsch aktualisieren
    } else if (currentLanguage === 'en') {
        // Texte für die Englische Sprache
        document.getElementById('main-title').textContent = 'TEST TEXT';
        document.getElementById('main-text').textContent = 'THIS IS A TEST TEXT';
        // Hier weitere Texte in Englisch aktualisieren
    }
}

// Aktualisiere den Text beim Laden der Seite
updateText();