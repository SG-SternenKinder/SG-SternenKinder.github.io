document.addEventListener('DOMContentLoaded', function() {
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
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
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
            // Zeige Fehlermeldung oder mache etwas anderes
            showErrorPopup('Das Hintergrundbild konnte nicht geladen werden. Fallback verwendet.');
        }

        // Setze das Hintergrundbild des Bodys
        document.body.style.backgroundImage = `url(${imageToUse})`;
        document.body.classList.remove('hidden'); // Zeige den Inhalt des Bodys an
    }

    // Beim Laden der Seite zufälliges Hintergrundbild setzen
    setRandomBackgroundImage();
});
