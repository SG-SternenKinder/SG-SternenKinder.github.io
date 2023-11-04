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


// Initialisiere den Text und den Language Slider
document.addEventListener('DOMContentLoaded', function () {
    const languageSlider = document.getElementById('language-slider');
    const savedLanguage = getCookie('language');

    // Wenn es ein gespeichertes Sprach-Cookie gibt, stelle den Schieberegler entsprechend ein
    if (savedLanguage === 'en') {
        languageSlider.checked = true;
    }

    // Überwache Änderungen am Schieberegler und speichere die Sprache als Cookie
    languageSlider.addEventListener('change', function () {
        const selectedLanguage = languageSlider.checked ? 'en' : 'de';
        setCookie('language', selectedLanguage, 365);
        updateText(selectedLanguage);
    });

    // Initialisiere den Text basierend auf dem gespeicherten Cookie
    updateText(savedLanguage);
});

// Diese Funktion aktualisiert den Text basierend auf der ausgewählten Sprache
function updateText(language) {
    const mainTitle = document.getElementById('main-title');
    const mainText = document.getElementById('main-text');

    if (language === 'de') {
        mainTitle.textContent = 'TEST\nTEXT';
        mainText.textContent = 'DIES IST EIN TEST TEXT';
    } else if (language === 'en') {
        mainTitle.textContent = 'TEST\nTEXT';
        mainText.textContent = 'THIS IS A TEST TEXT';
    }

    // Zeige das Popup zur Bestätigung
    showConfirmationPopup();
}

// Cookie-Funktionen zum Speichern und Abrufen des Sprach-Cookies
function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Zeige das Popup und setze einen Event-Listener für den OK-Button
function showConfirmationPopup() {
    const popup = document.getElementById('confirmation-popup');
    popup.style.display = 'flex';
    const closeBtn = document.getElementById('close-popup');
    closeBtn.addEventListener('click', function () {
        popup.style display = 'none';
    });
}