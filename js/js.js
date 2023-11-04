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

// Definiere eine Variable für die aktuelle Sprache (zunächst Deutsch)
let currentLanguage = 'de';

// Funktion zum Ändern der Sprache
function changeLanguage(lang) {
    // Setze die aktuelle Sprache
    currentLanguage = lang;

    // Rufe die Funktion auf, um den Text in der ausgewählten Sprache zu aktualisieren
    updateLanguageText();
}

// Funktion zum Aktualisieren des Texts in der ausgewählten Sprache
function updateLanguageText() {
    if (currentLanguage === 'de') {
        // Texte für die Deutsche Sprache
        document.getElementById('main-title').textContent = 'TEST <br> TEXT';
        document.getElementById('main-text').textContent = 'DIES IST EIN TEST TEXT';
        // Füge hier weitere Texte in Deutsch hinzu
    } else if (currentLanguage === 'en') {
        // Texte für die Englische Sprache
        document.getElementById('main-title').textContent = 'TEST <br> TEXT';
        document.getElementById('main-text').textContent = 'THIS IS A TEST TEXT';
        // Füge hier weitere Texte in Englisch hinzu
    }
}

// Führe die Funktion aus, um den Text in der aktuellen Sprache anzuzeigen
updateLanguageText();