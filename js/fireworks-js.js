// Einstellungen für das Feuerwerk
let fireworksSettings = {
    numFireworks: 5,
    colors: generateRandomColors(5),
    sounds: ['sound1.mp3', 'sound2.mp3', 'sound3.mp3'],
    sizes: [10, 20, 30],
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

// Funktion zum Laden der Standard-Einstellungen
function loadDefaultSettings() {
    const fireworkSizeInput = document.getElementById('firework-size');
    const mouseTrackingCheckbox = document.getElementById('mouse-tracking');
    const spawnOnClickCheckbox = document.getElementById('spawn-on-click');
    const numFireworksInput = document.getElementById('num-fireworks');

    // Lade die Standardwerte in die Eingabefelder
    fireworkSizeInput.value = fireworksSettings.sizes[0];
    mouseTrackingCheckbox.checked = fireworksSettings.mouseTracking;
    spawnOnClickCheckbox.checked = fireworksSettings.spawnOnButtonClick;
    numFireworksInput.value = fireworksSettings.numFireworks;
}

// Funktion zum Starten des Feuerwerks
function startFireworks() {
    let fireworks = [];
    let allowFireworks = true;
    const fireworksContainer = document.getElementById('fireworks-container');

    // Funktion zum Anwenden der Einstellungen
    function applySettings() {
        const fireworkSizeInput = document.getElementById('firework-size');
        const mouseTrackingCheckbox = document.getElementById('mouse-tracking');
        const spawnOnClickCheckbox = document.getElementById('spawn-on-click');
        const numFireworksInput = document.getElementById('num-fireworks');

        // Aktualisiere die Optionen mit den Werten aus den Eingabefeldern
        fireworksSettings.sizes = [parseInt(fireworkSizeInput.value, 10)];
        fireworksSettings.mouseTracking = mouseTrackingCheckbox.checked;
        fireworksSettings.spawnOnButtonClick = spawnOnClickCheckbox.checked;
        fireworksSettings.numFireworks = parseInt(numFireworksInput.value, 10);

        // Speichere die aktualisierten Einstellungen im Session-Cookie
        sessionStorage.setItem('fireworksSettings', JSON.stringify(fireworksSettings));

        // Hier kannst du weitere Code schreiben, um die anderen Optionen zu aktualisieren

        // Schließe das Einstellungspopup
        toggleSettings();
    }

    // Funktion zum Erstellen eines Feuerwerks
    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';

        // Wähle eine zufällige Größe aus den verfügbaren Größen
        const size = getRandomSize(fireworksSettings.sizes);
        firework.style.width = `${size}px`;
        firework.style.height = `${size}px`;

        // Wähle eine zufällige Farbe aus den verfügbaren Farben
        firework.style.backgroundColor = getRandomColor(fireworksSettings.colors);

        const audio = new Audio(getRandomSound(fireworksSettings.sounds));

        fireworksContainer.appendChild(firework);

        setTimeout(() => {
            // Verwende dynamische Keyframes basierend auf der Größe
            firework.style.animation = size > 15 ? 'explodeLarge 1s linear' : 'explodeSmall 1s linear';
            audio.play();

            firework.addEventListener('animationend', () => {
                fireworksContainer.removeChild(firework);
            });
        }, fireworksSettings.delay);
    }

    // Funktion zum Starten des Feuerwerks
    function spawnFireworks() {
        if (!allowFireworks) {
            alert("Um das Feuerwerk zu stoppen, klicken Sie erneut auf den Button.");
            return;
        }

        for (let i = 0; i < fireworksSettings.numFireworks; i++) {
            createFirework();
        }
    }

    // Funktion zum Stoppen des Feuerwerks
    function stopFireworks() {
        allowFireworks = false;
        fireworks.forEach(firework => fireworksContainer.removeChild(firework));
        fireworks = [];
    }

    // Funktion zum Anzeigen/Ausblenden der Einstellungen
    function toggleSettings() {
        const settingsPopup = document.getElementById('settings-popup');
        const fireworkSizeInput = document.getElementById('firework-size');
        const mouseTrackingCheckbox = document.getElementById('mouse-tracking');
        const spawnOnClickCheckbox = document.getElementById('spawn-on-click');
        const numFireworksInput = document.getElementById('num-fireworks');

        // Setze die aktuellen Werte der Optionen in die Eingabefelder
        fireworkSizeInput.value = fireworksSettings.sizes[0];
        mouseTrackingCheckbox.checked = fireworksSettings.mouseTracking;
        spawnOnClickCheckbox.checked = fireworksSettings.spawnOnButtonClick;
        numFireworksInput.value = fireworksSettings.numFireworks;

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

    // Event listener for the apply settings button click
    document.getElementById('applySettingsButton').addEventListener('click', applySettings);
}

// Funktionsaufruf zum Laden der Standardwerte
loadDefaultSettings();

// Funktionsaufruf zum Starten des Feuerwerks
startFireworks();