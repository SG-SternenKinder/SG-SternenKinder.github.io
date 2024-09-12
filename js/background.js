$(document).ready(function() {
    // Funktion zur Ermittlung des Basis-Pfades
    function getBasePath() {
        const pathParts = window.location.pathname.split('/').filter(part => part);
        return '../'.repeat(pathParts.length - 1);
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
        return new Promise((resolve) => {
            $('<img>').attr('src', url).on('load', () => resolve(true)).on('error', () => resolve(false));
        });
    }

    // Funktion zum Zufallsbild auswählen
    async function setRandomBackgroundImage() {
        const randomIndex = Math.floor(Math.random() * images.length);
        const imageUrl = images[randomIndex];

        // Überprüfen, ob das Bild existiert
        const exists = await checkImage(imageUrl);
        
        const imageToUse = exists ? imageUrl : fallbackImage;
        if (!exists) {
            showErrorPopup('Das Hintergrundbild konnte nicht geladen werden. Fallback verwendet.');
        }

        // Bild hinzufügen
        $('#fsb_image').remove(); // Entferne vorheriges Bild, falls vorhanden
        $('body').append(`<img src="${imageToUse}" id="fsb_image" alt=""/>`);
    }

    // Beim Laden der Seite zufälliges Hintergrundbild setzen
    setRandomBackgroundImage();
});
