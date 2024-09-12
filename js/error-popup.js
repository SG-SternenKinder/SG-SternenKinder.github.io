//Error-Popup.js
// Funktion zum Anzeigen der Fehlermeldung
function showErrorPopup(message) {
    // Erstelle das Popup-Element
    const $errorPopup = $('<div>', { class: 'error-popup' });
    const $closeButton = $('<span>', { class: 'error-close-btn', html: '&times;' });
    const $messageContent = $('<div>', { text: message.trim() });
    const $timer = $('<div>', { class: 'error-timer' });

    $errorPopup.append($closeButton, $messageContent, $timer);

    // Füge das Popup zum Container hinzu
    const $container = $('.error-popup-container');
    $container.append($errorPopup);

    // Variable zur Verfolgung der verbleibenden Zeit für den Timer
    let remainingTime = 10;

    // Funktion zum Aktualisieren des Timers
    function updateTimer() {
        $timer.text(`${remainingTime}s`);
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            $errorPopup.hide();
            $errorPopup.remove();
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
    $closeButton.on('click', function() {
        stopTimer();
        $errorPopup.hide();
        $errorPopup.remove();
    });

    // Hover-Ereignisse
    $errorPopup.on('mouseover', stopTimer);
    $errorPopup.on('mouseout', startTimer);

    // Zeige das Popup an
    $errorPopup.show();

    // Schiebe alle bestehenden Popups nach oben
    $container.children('.error-popup').each(function(index) {
        $(this).css('bottom', `${20 + (index * 70)}px`); // Setze den Abstand zwischen den Popups
    });
}

