// Funktion zum Anzeigen der Fehlermeldung
function showErrorPopup(message) {
    // Erstelle das Popup-Element
    const errorPopup = document.createElement('div');
    errorPopup.className = 'error-popup';
    
    const closeButton = document.createElement('span');
    closeButton.className = 'error-close-btn';
    closeButton.innerHTML = '&times;';
    
    const messageContent = document.createElement('div');
    messageContent.innerText = message.trim();
    
    const timer = document.createElement('div');
    timer.className = 'error-timer';

    errorPopup.appendChild(closeButton);
    errorPopup.appendChild(messageContent);
    errorPopup.appendChild(timer);
    
    // Füge das Popup zum Container hinzu
    const container = document.querySelector('.error-popup-container');
    container.appendChild(errorPopup);

    // Variable zur Verfolgung der verbleibenden Zeit für den Timer
    let remainingTime = 10;

    // Funktion zum Aktualisieren des Timers
    function updateTimer() {
        timer.innerText = `${remainingTime}s`;
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            errorPopup.style.display = 'none';
            container.removeChild(errorPopup);
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
    closeButton.addEventListener('click', function() {
        stopTimer();
        errorPopup.style.display = 'none';
        container.removeChild(errorPopup);
    });

    // Hover-Ereignisse
    errorPopup.addEventListener('mouseover', stopTimer);
    errorPopup.addEventListener('mouseout', startTimer);

    // Zeige das Popup an
    errorPopup.style.display = 'flex';

    // Schiebe alle bestehenden Popups nach oben
    Array.from(container.children).forEach((popup, index) => {
        popup.style.bottom = `${20 + (index * 70)}px`; // Setze den Abstand zwischen den Popups
    });
}
