// Variable für den Timer-Intervall
let timerInterval;

// Funktion zum Anzeigen der Fehlermeldung
function showErrorPopup(message) {
    // Erstelle das Popup-Element
    const $popup = $(
        `<div class="error-popup">
            <span class="close-btn">&times;</span>
            <div class="popup-content">${message}</div>
            <div class="timer-wrapper">
                <div class="timer"></div>
            </div>
        </div>`
    );

    // Füge das Popup zum Body hinzu
    $('body').append($popup);

    // Variable zur Verfolgung der verbleibenden Zeit für den Timer
    let remainingTime = 10;
    const circleDuration = 10; // Dauer des Timers in Sekunden

    // Funktion zum Aktualisieren des Timers
    function updateTimer() {
        const percentage = (remainingTime / circleDuration) * 100; // Berechne den Fortschritt
        $popup.find('.timer-wrapper').css({
            'border-top-color': `rgba(255, 255, 255, ${percentage / 100})` // Ändere die Farbe des Kreises basierend auf der verbleibenden Zeit
        });

        if (remainingTime <= 0) {
            clearInterval(timerInterval); // Stoppe den Timer, wenn die Zeit abgelaufen ist
            $popup.fadeOut(500, function() { $(this).remove(); }); // Blende das Popup aus und entferne es
        } else {
            remainingTime--; // Verringere die verbleibende Zeit um eine Sekunde
        }
    }

    // Funktion zum Starten des Timers
    function startTimer() {
        timerInterval = setInterval(updateTimer, 1000); // Aktualisiere den Timer jede Sekunde
    }

    // Funktion zum Stoppen des Timers
    function stopTimer() {
        clearInterval(timerInterval); // Stoppe das Intervall
    }

    // Timer starten
    startTimer();

    // Schließen beim Klicken auf das X
    $popup.find('.close-btn').on('click', function() {
        stopTimer(); // Stoppe den Timer
        $popup.fadeOut(500, function() { $(this).remove(); }); // Blende das Popup aus und entferne es
    });

    // Hover-Ereignisse
    $popup.hover(
        function() { stopTimer(); }, // Wenn der Benutzer das Popup betritt, Timer anhalten
        function() { startTimer(); } // Wenn der Benutzer das Popup verlässt, Timer fortsetzen
    );

    // Zeige das Popup an
    $popup.fadeIn(500); // Blende das Popup sanft ein

    // Schiebe alle bestehenden Popups nach oben
    $('.error-popup').each(function(index) {
        $(this).css('bottom', `${20 + (index * 60)}px`); // Positioniere jede Nachricht etwas weiter oben
    });
}
