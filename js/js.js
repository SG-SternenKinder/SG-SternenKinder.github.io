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
