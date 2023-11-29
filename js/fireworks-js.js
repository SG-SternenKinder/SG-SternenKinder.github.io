function startFireworks() {

    const fireworksContainer = document.getElementById('fireworks-container');

    // Überprüfe, ob es bereits gespeicherte Einstellungen gibt
    const savedSettings = sessionStorage.getItem('fireworksSettings');
    const options = savedSettings ? JSON.parse(savedSettings) : getDefaultSettings();

    function getDefaultSettings() {
        return {
            numFireworks: 5,
            colors: colors.concat(generateRandomColors(5)),
            sounds: ['sound1.mp3', 'sound2.mp3', 'sound3.mp3'],
            size: [10, 20, 30],
            mouseTracking: true,
            spawnOnButtonClick: true,
            maxRandomFireworks: 12,
            delay: 5000,
            explosionOptions: {
                flickering: true,
                lineWidth: { min: 1, max: 3 },
                explosionLength: { min: 1, max: 2 },
                brightness: { min: 50, max: 80 },
                decay: { min: 0.015, max: 0.03 }
            }
        };
    }

    let fireworks = [];
    let allowFireworks = true;

    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';

        // Wähle eine zufällige Größe aus den verfügbaren Größen
        const size = getRandomSize(options.sizes);
        firework.style.width = `${size}px`;
        firework.style.height = `${size}px`;

        // Wähle eine zufällige Farbe aus den verfügbaren Farben
        firework.style.backgroundColor = getRandomColor(options.colors);

        const audio = new Audio(getRandomSound(options.sounds));

        fireworksContainer.appendChild(firework);

        setTimeout(() => {
            // Verwende dynamische Keyframes basierend auf der Größe
            firework.style.animation = size > 15 ? 'explodeLarge 1s linear' : 'explodeSmall 1s linear';
            audio.play();

            firework.addEventListener('animationend', () => {
                fireworksContainer.removeChild(firework);
            });
        }, options.delay);

        return firework;
    }

    function getRandomSize(sizeArray) {
        return sizeArray[Math.floor(Math.random() * sizeArray.length)];
    }

    function generateRandomColors(numColors) {
        const randomColors = [];
        for (let i = 0; i < numColors; i++) {
            randomColors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        }
        return randomColors;
    }

    function getRandomColor(colorArray) {
        return colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    function getRandomSound(soundArray) {
        return soundArray[Math.floor(Math.random() * soundArray.length)];
    }

    function spawnFireworks() {
        if (!allowFireworks) {
            alert("Um das Feuerwerk zu stoppen, klicken Sie erneut auf den Button.");
            return;
        }

        for (let i = 0; i < options.numFireworks; i++) {
            const firework = createFirework();
            fireworks.push(firework);
        }
    }

    function stopFireworks() {
        allowFireworks = false;
        fireworks.forEach(firework => fireworksContainer.removeChild(firework));
        fireworks = [];
    }

    function toggleSettings() {
        const settingsPopup = document.getElementById('settings-popup');
        const fireworkSizeInput = document.getElementById('firework-size');
        const mouseTrackingCheckbox = document.getElementById('mouse-tracking');
        const spawnOnClickCheckbox = document.getElementById('spawn-on-click');
        const numFireworksInput = document.getElementById('num-fireworks');

        // Setze die aktuellen Werte der Optionen in die Eingabefelder
        fireworkSizeInput.value = options.size;
        mouseTrackingCheckbox.checked = options.mouseTracking;
        spawnOnClickCheckbox.checked = options.spawnOnButtonClick;
        numFireworksInput.value = options.numFireworks;

        // Blende das Einstellungspopup ein oder aus
        settingsPopup.style.display = (settingsPopup.style.display === 'none' || settingsPopup.style.display === '') ? 'block' : 'none';
    }

    // Event listener for the button click
    document.getElementById('startButton').addEventListener('click', () => {
        if (allowFireworks) {
            spawnFireworks();
        } else {
            stopFireworks();
            allowFireworks = true;
        }
    });

    // Event listener for the settings button click
    document.getElementById('settingsButton').addEventListener('click', toggleSettings);
}

// Funktion zum Anwenden der Einstellungen
function applySettings() {
    const fireworkSizeInput = document.getElementById('firework-size');
    const mouseTrackingCheckbox = document.getElementById('mouse-tracking');
    const spawnOnClickCheckbox = document.getElementById('spawn-on-click');
    const numFireworksInput = document.getElementById('num-fireworks');

    // Aktualisiere die Optionen mit den Werten aus den Eingabefeldern
    options.size = parseInt(fireworkSizeInput.value, 10);
    options.mouseTracking = mouseTrackingCheckbox.checked;
    options.spawnOnButtonClick = spawnOnClickCheckbox.checked;
    options.numFireworks = parseInt(numFireworksInput.value, 10);

    // Speichere die aktualisierten Einstellungen im Session-Cookie
    sessionStorage.setItem('fireworksSettings', JSON.stringify(options));

    // Gib die aktualisierten Optionen in der Konsole aus (kannst du entfernen)
    consoleSettings.log('Aktualisierte Einstellungen:', options);

    // Hier kannst du weitere Code schreiben, um die anderen Optionen zu aktualisieren

    // Schließe das Einstellungspopup
    toggleSettings();
}