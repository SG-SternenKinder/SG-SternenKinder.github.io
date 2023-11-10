// noscript-loading.js
document.addEventListener('DOMContentLoaded', function () {
    const spinnerElement = document.querySelector('.loading-spinner');
    spinnerElement.style.borderTopColor = getRandomColor();
    
    // Hilfsfunktion für eine zufällige Farbe
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});