// popup.js
// Zeige das Popup und setze einen Event-Listener für den OK-Button
function showConfirmationPopup() {
    const popup = document.getElementById('confirmation-popup');
    popup.style.display = 'flex';
    const closeBtn = document.getElementById('close-popup');
    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
    });
}