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

// Diese Funktion ändert die Sprache und aktualisiert den Schieberegler
function changeLanguage(language) {
    currentLanguage = language;
    updateText();
    updateSlider();
}

// Diese Funktion aktualisiert den Text basierend auf der ausgewählten Sprache
function updateText() {
    if (currentLanguage === 'de') {
        document.getElementById('main-title').textContent = 'TEST TEXT';
        document.getElementById('main-text').textContent = 'DIES IST EIN TEST TEXT';
        // Hier weitere Texte in Deutsch aktualisieren
    } else if (currentLanguage === 'en') {
        document.getElementById('main-title').textContent = 'TEST TEXT';
        document.getElementById('main-text').textContent = 'THIS IS A TEST TEXT';
        // Hier weitere Texte in Englisch aktualisieren
    }
}

// Diese Funktion aktualisiert den Schieberegler
function updateSlider() {
    const slider = document.querySelector('.slider');
    const germanButton = document.getElementById('german-button');
    const englishButton = document.getElementById('english-button');

    if (currentLanguage === 'de') {
        // Schieberegler nach links für Deutsch
        slider.style.left = '0';
        germanButton.style.textDecoration = 'underline';
        englishButton.style.textDecoration = 'none';
    } else if (currentLanguage === 'en') {
        // Schieberegler nach rechts für Englisch
        slider.style.left = '100%';
        germanButton.style.textDecoration = 'none';
        englishButton.style.textDecoration = 'underline';
    }
}

// Aktualisiere den Text und den Schieberegler beim Laden der Seite
updateText();
updateSlider();