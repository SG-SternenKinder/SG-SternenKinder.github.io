// noscript-loading.js
document.addEventListener('DOMContentLoaded', function () {
    const spinnerElement = document.querySelector('.loading-spinner');

    // Überprüfe, ob das Element gefunden wurde, bevor es verwendet wird
    if (spinnerElement) {
        spinnerElement.style.borderTopColor = getRandomColor();

        // Hilfsfunktion für eine zufällige Farbe
        function getRandomColor() {
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    }
});