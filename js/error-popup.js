// Funktion zum Anzeigen der Fehlermeldung
function showErrorPopup(message) {
    // Erstelle das Popup-Element
    const $popup = $(
        `<div class="error-popup">
            <span class="close-btn">&times;</span>
            ${message}
            <div class="timer"></div>
        </div>`
    );

    // Füge das Popup zum Body hinzu
    $('body').append($popup);

    // Funktion zum Aktualisieren des Timers
    let remainingTime = 10;
    const timerInterval = setInterval(function() {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            $popup.fadeOut(500, function() { $(this).remove(); });
        } else {
            $popup.find('.timer').text(`${remainingTime}s`);
            remainingTime--;
        }
    }, 1000);

    // Schließen beim Klicken auf das X
    $popup.find('.close-btn').on('click', function() {
        clearInterval(timerInterval);
        $popup.fadeOut(500, function() { $(this).remove(); });
    });

    // Zeige das Popup an
    $popup.fadeIn(500);
}
