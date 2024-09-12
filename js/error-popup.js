// Variable für den Timer-Intervall
let timerInterval;

// Container für Fehlermeldungen
const $popupContainer = $('<div class="popup-container"></div>').appendTo('body');

// Funktion zum Anzeigen der Fehlermeldung
function showErrorPopup(message) {
    // Erstelle das Popup-Element
    const $popup = $(`
        <div class="error-popup">
            <span class="close-btn">&times;</span>
            ${message}
            <div class="timer"></div>
        </div>
    `);

    // Füge das Popup zum Container hinzu
    $popupContainer.append($popup);

    // Variable zur Verfolgung der verbleibenden Zeit für den Timer
    let remainingTime = 10;

    // Funktion zum Aktualisieren des Timers
    function updateTimer() {
        $popup.find('.timer').text(`${remainingTime}s`);
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            $popup.fadeOut(500, function() { $(this).remove(); });
        } else {
            remainingTime--;
        }
    }

    // Funktion zum Starten des Timers
    function startTimer() {
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Funktion zum Stoppen des Timers
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Timer starten
    startTimer();

    // Schließen beim Klicken auf das X
    $popup.find('.close-btn').on('click', function() {
        stopTimer();
        $popup.fadeOut(500, function() { $(this).remove(); });
    });

    // Hover-Ereignisse
    $popup.hover(
        function() { stopTimer(); },
        function() { startTimer(); }
    );

    // Zeige das Popup an
    $popup.fadeIn(500);

    // Schiebe alle bestehenden Popups nach oben
    $popupContainer.children('.error-popup').each(function(index) {
        $(this).css('bottom', `${20 + (index * 70)}px`); // Setze den Abstand zwischen den Popups
    });
}
