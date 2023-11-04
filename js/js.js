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


// LANGUAGE SWITCHER !
// Diese Variable speichert die aktuelle Sprache
let currentLanguage = 'de';

function updateText() {
    const titleElement = document.getElementById('main-title');
    const textElement = document.getElementById('main-text');

    if (currentLanguage === 'de') {
        titleElement.textContent = 'TEST TEXT';
        textElement.textContent = 'DIES IST EIN TEST TEXT';
    } else if (currentLanguage === 'en') {
        titleElement.textContent = 'TEST TEXT';
        textElement.textContent = 'THIS IS A TEST TEXT';
    }
}

// Funktion zum Ändern der Sprache
function changeLanguage(language) {
    currentLanguage = language;
    updateText();
}

// Aktualisiere den Text beim Laden der Seite
updateText();

// Event-Listener für die Schaltflächen zum Ändern der Sprache
const languageButtons = document.querySelectorAll('.language-button');

languageButtons.forEach(button => {
    button.addEventListener('click', function () {
        const selectedLanguage = this.getAttribute('data-lang');
        changeLanguage(selectedLanguage);
    });
});

// Event-Listener für den Slider des Language Switchers
const languageSlider = document.getElementById('language-slider');

languageSlider.addEventListener('change', function () {
    if (this.checked) {
        changeLanguage('en'); // Wenn der Slider nach rechts verschoben wird, ändere die Sprache auf Englisch
    } else {
        changeLanguage('de'); // Wenn der Slider nach links verschoben wird, ändere die Sprache auf Deutsch
    }
});