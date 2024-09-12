//Background.js
$(document).ready(function() {
    // Funktion zur Ermittlung des Basis-Pfades
    function getBasePath() {
        const pathParts = window.location.pathname.split('/').filter(part => part);
        const depth = Math.max(pathParts.length - 1, 0); // Sicherstellen, dass depth nicht negativ ist
        return '../'.repeat(depth);
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
    function checkImage(url) {
        return $.Deferred(function(defer) {
            const img = new Image();
            img.onload = () => defer.resolve(true);
            img.onerror = () => defer.resolve(false);
            img.src = url;
        }).promise();
    }

    // Funktion zum Zufallsbild auswählen
    function setRandomBackgroundImage() {
        const randomIndex = Math.floor(Math.random() * images.length);
        const imageUrl = images[randomIndex];

        // Überprüfen, ob das Bild existiert
        checkImage(imageUrl).done(function(exists) {
            const imageToUse = exists ? imageUrl : fallbackImage;
            if (!exists) {
                // Zeige Fehlermeldung oder mache etwas anderes
                showErrorPopup('Das Hintergrundbild konnte nicht geladen werden. Fallback verwendet.');
            }

            // Erstelle ein neues Bild-Element und setze es als Hintergrundbild
            const $backgroundImage = $('<img>', { src: imageToUse, id: 'fsb_image', style: 'display: none;' }).on('load', function() {
                $('body').css('background-image', `url(${imageToUse})`);
                $(this).remove(); // Entferne das Bild nach dem Laden
            });

            $('body').append($backgroundImage);
        });
    }

    // Beim Laden der Seite zufälliges Hintergrundbild setzen
    setRandomBackgroundImage();
});
