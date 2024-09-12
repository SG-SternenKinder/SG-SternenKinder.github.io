$(document).ready(function() {
    // Funktion zur Ermittlung des Basis-Pfades
    function getBasePath() {
        // Bestimme die Anzahl der Verzeichnisebenen nach oben
        const pathParts = window.location.pathname.split('/').filter(part => part);
        const depth = pathParts.length - 1;

        // Baue den Basis-Pfad für den Zugriff auf das `images`-Verzeichnis zusammen
        let basePath = '';
        for (let i = 0; i < depth; i++) {
            basePath += '../';
        }
        return basePath;
    }

    // Basis-Pfad ermitteln
    const basePath = getBasePath();

    // Array mit Bild-URLs
    const images = [
        `${basePath}img/background.png`,
        `${basePath}img/background2.png`,
        `${basePath}img/background3.png`
        // Füge hier weitere Bild-URLs hinzu
    ];

    // Funktion zum Zufallsbild auswählen
    function setRandomBackgroundImage() {
        const randomIndex = Math.floor(Math.random() * images.length);
        $('body').append(`<img src="${images[randomIndex]}" id="fsb_image" alt=""/>`);
    }

    // Beim Laden der Seite zufälliges Hintergrundbild setzen
    setRandomBackgroundImage();

});
