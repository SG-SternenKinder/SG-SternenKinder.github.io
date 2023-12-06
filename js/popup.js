// popup.js
$(document).ready(function () {
    const popup = $('#popup');
    const acceptCookiesButton = $('#accept-cookies');
    const closeCookiesButton = $('#close-cookies');
    const acceptedPopup = $('#accepted-popup');
    const rejectedPopup = $('#rejected-popup');
    const closeAcceptedPopupButton = $('#close-accepted-popup');
    const closeRejectedPopupButton = $('#close-rejected-popup');

    // Überprüfen, ob das Popup bereits angezeigt wurde
    const popupShown = sessionStorage.getItem('popupShown');
    if ($.consoleManager.getConsoleOutput()) {
        console.log('Popup wurde bereits angezeigt:', popupShown);
    }

    // Überprüfe, ob Cookies akzeptiert wurden
    const acceptedCookies = $.CookieUtil.getCookie('cookiesAccepted');
    if ($.consoleManager.getConsoleOutput()) {
        console.log('Cookies wurden akzeptiert:', acceptedCookies);
    }

    // Überprüfe, ob Cookies abgelehnt wurden
    const rejectedCookies = $.CookieUtil.getCookie('cookiesRejected');
    if ($.consoleManager.getConsoleOutput()) {
        console.log('Cookies wurden abgelehnt:', rejectedCookies);
    }

    // Entscheidung des Benutzers überprüfen und Popup entsprechend anzeigen
    if (!popupShown && !acceptedCookies && !rejectedCookies && navigator.onLine) {
        if ($.consoleManager.getConsoleOutput()) {
            console.log('Popup wird angezeigt.');
        }

        popup.css('display', 'flex');

        acceptCookiesButton.on('click', function () {
            $.CookieUtil.setCookie('cookiesAccepted', 'true', 4);
            popup.css('display', 'none');
            acceptedPopup.css('display', 'flex');
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Cookies wurden akzeptiert.');
            }
        });

        closeCookiesButton.on('click', function () {
            // Markiere das Popup als angezeigt in der Session-Speicherung
            sessionStorage.setItem('popupShown', 'true');
            popup.css('display', 'none');

            // Setze ein Session-Cookie für die Ablehnung von Cookies
            sessionStorage.setItem('cookiesRejected', 'true');
            rejectedPopup.css('display', 'flex');
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Cookies wurden abgelehnt.');
            }
        });

        closeAcceptedPopupButton.on('click', function () {
            // Akzeptieren-Popup schließen
            acceptedPopup.css('display', 'none');
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Akzeptieren-Popup wurde geschlossen.');
            }
        });

        closeRejectedPopupButton.on('click', function () {
            // Abgelehnt-Popup schließen
            rejectedPopup.css('display', 'none');
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Abgelehnt-Popup wurde geschlossen.');
            }
        });
    } else {
        if ($.consoleManager.getConsoleOutput()) {
            console.log('Popup wird nicht angezeigt.');
        }
    }

    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data === 'showOfflinePopup') {
            // Show the offline popup
            const offlinePopup = $('#offline-popup');
            offlinePopup.css('display', 'flex');
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Offline-Popup wird angezeigt.');
            }
        }
    });
});