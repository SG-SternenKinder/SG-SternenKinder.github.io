function startFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const sounds = ['sound1.mp3', 'sound2.mp3', 'sound3.mp3'];

    const fireworksContainer = document.getElementById('fireworks-container');

    const options = {
        numFireworks: 5,
        colors: colors.concat(generateRandomColors(5)),
        sounds: sounds,
        size: 10,
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

    let fireworks = [];
    let allowFireworks = true;

    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.backgroundColor = getRandomColor(options.colors);

        const audio = new Audio(getRandomSound(options.sounds));

        fireworksContainer.appendChild(firework);

        setTimeout(() => {
            firework.style.animation = 'explode 1s linear';
            audio.play();

            firework.addEventListener('animationend', () => {
                fireworksContainer.removeChild(firework);
            });
        }, options.delay);

        return firework;
    }

    function getRandomColor(colorArray) {
        return colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    function getRandomSound(soundArray) {
        return soundArray[Math.floor(Math.random() * soundArray.length)];
    }

    function generateRandomColors(numColors) {
        const randomColors = [];
        for (let i = 0; i < numColors; i++) {
            randomColors.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);
        }
        return randomColors;
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

    // Event listener for the button click
    document.getElementById('startButton').addEventListener('click', () => {
        if (allowFireworks) {
            spawnFireworks();
        } else {
            stopFireworks();
            allowFireworks = true;
        }
    });
}