// Variable für den Timer-Intervall
let timerInterval;

// Funktion zum Anzeigen der Fehlermeldung
function showErrorPopup(message) {
    // Erstelle den Wrapper für das Popup und den Timer-Kreis
    const $wrapper = $(
        `<div class="error-popup-wrapper">
            <div class="error-popup">
                <span class="close-btn">&times;</span>
                ${message}
            </div>
            <div class="timer-circle"></div>
        </div>`
    );

    // Füge den Wrapper zum Body hinzu
    $('body').append($wrapper);

    // Variable zur Verfolgung der verbleibenden Zeit für den Timer
    let remainingTime = 10;

    // Funktion zum Aktualisieren des Timers
    function updateTimer() {
        $wrapper.find('.timer-circle').css('animation-duration', `${remainingTime}s`); // Aktualisiere die Dauer der Animation
        if (remainingTime <= 0) {
            clearInterval(timerInterval); // Stoppe den Timer, wenn die Zeit abgelaufen ist
            $wrapper.fadeOut(500, function() { $(this).remove(); }); // Blende das Popup aus und entferne es
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
    $wrapper.find('.close-btn').on('click', function() {
        stopTimer(); // Stoppe den Timer
        $wrapper.fadeOut(500, function() { $(this).remove(); }); // Blende das Popup aus und entferne es
    });

    // Hover-Ereignisse
    $wrapper.hover(
        function() { stopTimer(); }, // Wenn der Benutzer das Popup betritt, Timer anhalten
        function() { startTimer(); } // Wenn der Benutzer das Popup verlässt, Timer fortsetzen
    );

    // Schiebe alle bestehenden Popups nach oben
    $('.error-popup-wrapper').each(function(index) {
        $(this).css('bottom', `${20 + (index * 80)}px`); // Positioniere jede Nachricht etwas weiter oben
    });
}
