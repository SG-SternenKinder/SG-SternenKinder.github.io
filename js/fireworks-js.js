function startFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const sounds = ['sound1.mp3', 'sound2.mp3', 'sound3.mp3'];
    const fireworksContainer = document.getElementById('fireworks-container');

    // Hier können weitere Farben hinzugefügt werden
    const moreColors = ['#ffa500', '#008080', '#800080', '#00ff80'];
    colors.push(...moreColors);

    // Hier kann die Anzahl der Feuerwerke angepasst werden
    const numFireworks = 5;

    for (let i = 0; i < numFireworks; i++) {
        createFirework(colors[Math.floor(Math.random() * colors.length)], sounds[Math.floor(Math.random() * sounds.length)]);
    }

    function createFirework(color, sound) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.backgroundColor = color;

        const audio = new Audio(sound);

        fireworksContainer.appendChild(firework);

        setTimeout(() => {
            firework.style.animation = 'explode 1s linear';
            audio.play();

            firework.addEventListener('animationend', () => {
                fireworksContainer.removeChild(firework);
            });
        }, i * 1000);
    }
}

function toggleSettings() {
    const settingsPopup = document.getElementById('settings-popup');
    settingsPopup.style.display = (settingsPopup.style.display === 'none' || settingsPopup.style.display === '') ? 'block' : 'none';
}

function applySettings() {
    const fireworkSize = document.getElementById('firework-size').value;
    const mouseTracking = document.getElementById('mouse-tracking').checked;
    const spawnOnClick = document.getElementById('spawn-on-click').checked;
    const numFireworks = document.getElementById('num-fireworks').value;

    // Hier können die Einstellungen angewendet werden (z.B., um die Größe zu ändern, die Mausverfolgung zu aktivieren usw.)
    console.log('Applied settings:', { fireworkSize, mouseTracking, spawnOnClick, numFireworks });

    // Schließe das Einstellungsfenster
    toggleSettings();
}