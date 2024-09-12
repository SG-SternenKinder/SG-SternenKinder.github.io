// Variable für den Timer-Intervall
let timerInterval;

// Container für Fehlermeldungen
const $errorPopupContainer = $('<div class="error-popup-container"></div>').appendTo('body');

// Funktion zum Anzeigen der Fehlermeldung
function showErrorPopup(message) {
    // Erstelle das Popup-Element
    const $errorPopup = $(`
        <div class="error-popup">
            <span class="error-close-btn">&times;</span>
            ${message}
            <div class="error-timer"></div>
        </div>
    `);

    // Füge das Popup zum Container hinzu
    $errorPopupContainer.append($errorPopup);

    // Variable zur Verfolgung der verbleibenden Zeit für den Timer
    let remainingTime = 10;

    // Funktion zum Aktualisieren des Timers
    function updateTimer() {
        $errorPopup.find('.error-timer').text(`${remainingTime}s`);
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            $errorPopup.fadeOut(500, function() { $(this).remove(); });
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
    $errorPopup.find('.error-close-btn').on('click', function() {
        stopTimer();
        $errorPopup.fadeOut(500, function() { $(this).remove(); });
    });

    // Hover-Ereignisse
    $errorPopup.hover(
        function() { stopTimer(); },
        function() { startTimer(); }
    );

    // Zeige das Popup an
    $errorPopup.fadeIn(500);

    // Schiebe alle bestehenden Popups nach oben
    $errorPopupContainer.children('.error-popup').each(function(index) {
        $(this).css('bottom', `${20 + (index * 70)}px`); // Setze den Abstand zwischen den Popups
    });
}
