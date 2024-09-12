$(document).ready(function() {
    // Funktion zur Ermittlung des Basis-Pfades
    function getBasePath() {
        // Bestimme die Anzahl der Verzeichnisebenen nach oben
        const pathParts = window.location.pathname.split('/').filter(part => part);
        const depth = pathParts.length - 1;

        // Baue den Basis-Pfad für den Zugriff auf das `img`-Verzeichnis zusammen
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

    // Der Fallback-Image-URL (immer vorhandenes Bild)
    const fallbackImage = `${basePath}img/background.png`; // Ändere dies, falls nötig

    // Funktion zum Überprüfen, ob das Bild existiert
    function checkImage(url, callback) {
        $('<img>').attr('src', url).on('load', function() {
            callback(true);
        }).on('error', function() {
            callback(false);
        });
    }

    // Funktion zum Zufallsbild auswählen
    function setRandomBackgroundImage() {
        const randomIndex = Math.floor(Math.random() * images.length);
        const imageUrl = images[randomIndex];

        // Überprüfen, ob das Bild existiert
        checkImage(imageUrl, function(exists) {
            if (exists) {
                // Bild existiert, also hinzufügen
                $('body').append(`<img src="${imageUrl}" id="fsb_image" alt=""/>`);
            } else {
                // Bild existiert nicht, auf das Fallback-Bild zurückgreifen
                $('body').append(`<img src="${fallbackImage}" id="fsb_image" alt=""/>`);
            }
        });
    }

    // Beim Laden der Seite zufälliges Hintergrundbild setzen
    setRandomBackgroundImage();
});
