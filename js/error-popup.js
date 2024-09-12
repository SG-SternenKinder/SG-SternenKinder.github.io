// Variable für den Timer-Intervall
let timerInterval;

// Container für Fehlermeldungen
const $errorpopupContainer = $('<div class="error-popup-container"></div>').appendTo('body');

// Funktion zum Anzeigen der Fehlermeldung
function showErrorPopup(message) {
    // Erstelle das Popup-Element
    const $errorpopup = $(` 
        <div class="error-popup"> 
            <span class="close-btn">&times;</span> 
            <div class="message">${message}</div>
            <div class="timer"></div> 
        </div>
    `);

    // Füge das Popup zum Container hinzu
    $errorpopupContainer.append($errorpopup);

    // Variable zur Verfolgung der verbleibenden Zeit für den Timer
    let remainingTime = 10;

    // Funktion zum Aktualisieren des Timers
    function updateTimer() {
        $errorpopup.find('.timer').text(`${remainingTime}s`);
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            $errorpopup.fadeOut(500, function() { $(this).remove(); });
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
    $errorpopup.find('.close-btn').on('click', function() {
        stopTimer();
        $errorpopup.fadeOut(500, function() { $(this).remove(); });
    });

    // Hover-Ereignisse
    $errorpopup.hover(
        function() { stopTimer(); },
        function() { startTimer(); }
    );

    // Zeige das Popup an
    $errorpopup.fadeIn(500);

    // Schiebe alle bestehenden Popups nach oben
    $errorpopupContainer.children('.error-popup').each(function(index) {
        $(this).css('bottom', `${20 + (index * 75)}px`); // Setze den Abstand zwischen den Popups
    });
}
