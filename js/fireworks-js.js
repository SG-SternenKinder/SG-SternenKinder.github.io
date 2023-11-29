function startFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const sounds = ['sound1.mp3', 'sound2.mp3', 'sound3.mp3'];
  
    const fireworksContainer = document.getElementById('fireworks-container');
  
    for (let i = 0; i < 5; i++) {
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
  