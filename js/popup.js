// popup.js
document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    const acceptCookiesButton = document.getElementById('accept-cookies');
    const closeCookiesButton = document.getElementById('close-cookies');
    const acceptedPopup = document.getElementById('accepted-popup');
    const rejectedPopup = document.getElementById('rejected-popup');
    const closeAcceptedPopupButton = document.getElementById('close-accepted-popup');
    const closeRejectedPopupButton = document.getElementById('close-rejected-popup');

    // Überprüfen, ob das Popup bereits angezeigt wurde
    const popupShown = sessionStorage.getItem('popupShown');
    if (consolen.getConsoleOutput()) {
        console.log('Popup wurde bereits angezeigt:', popupShown);
    }

    // Überprüfe, ob Cookies akzeptiert wurden
    const acceptedCookies = CookieUtil.getCookie('cookiesAccepted');
    if (consolen.getConsoleOutput()) {
        console.log('Cookies wurden akzeptiert:', acceptedCookies);
    }

    // Überprüfe, ob Cookies abgelehnt wurden
    const rejectedCookies = CookieUtil.getCookie('cookiesRejected');
    if (consolen.getConsoleOutput()) {
        console.log('Cookies wurden abgelehnt:', rejectedCookies);
    }

    // Entscheidung des Benutzers überprüfen und Popup entsprechend anzeigen
    if (!popupShown && !acceptedCookies && !rejectedCookies && navigator.onLine) {
        if (consolen.getConsoleOutput()) {
            console.log('Popup wird angezeigt.');
        }

        popup.style.display = 'flex';

        acceptCookiesButton.addEventListener('click', function () {
            CookieUtil.setCookie('cookiesAccepted', 'true', 4);
            popup.style.display = 'none';
            acceptedPopup.style.display = 'flex';
            if (consolen.getConsoleOutput()) {
                console.log('Cookies wurden akzeptiert.');
            }
        });

        closeCookiesButton.addEventListener('click', function () {
            // Markiere das Popup als angezeigt in der Session-Speicherung
            sessionStorage.setItem('popupShown', 'true');
            popup.style.display = 'none';

            // Setze ein Session-Cookie für die Ablehnung von Cookies
            sessionStorage.setItem('cookiesRejected', 'true');
            rejectedPopup.style.display = 'flex';
            if (consolen.getConsoleOutput()) {
                console.log('Cookies wurden abgelehnt.');
            }
        });

        closeAcceptedPopupButton.addEventListener('click', function () {
            // Akzeptieren-Popup schließen
            acceptedPopup.style.display = 'none';
            if (consolen.getConsoleOutput()) {
                console.log('Akzeptieren-Popup wurde geschlossen.');
            }
        });

        closeRejectedPopupButton.addEventListener('click', function () {
            // Abgelehnt-Popup schließen
            rejectedPopup.style.display = 'none';
            if (consolen.getConsoleOutput()) {
                console.log('Abgelehnt-Popup wurde geschlossen.');
            }
        });
    } else {
        if (consolen.getConsoleOutput()) {
            console.log('Popup wird nicht angezeigt.');
        }
    }

    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data === 'showOfflinePopup') {
            // Show the offline popup
            const offlinePopup = document.getElementById('offline-popup');
            offlinePopup.style.display = 'flex';
            if (consolen.getConsoleOutput()) {
                console.log('Offline-Popup wird angezeigt.');
            }
        }
    });
});