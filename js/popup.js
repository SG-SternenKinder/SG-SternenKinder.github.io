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
    const popupShown = CookieUtil.setSessionItem('popupShown');

    // Überprüfe, ob Cookies akzeptiert wurden
    const acceptedCookies = CookieUtil.getCookie('cookiesAccepted');

    // Überprüfe, ob Cookies abgelehnt wurden
    const rejectedCookies = CookieUtil.getCookie('cookiesRejected');

    // Entscheidung des Benutzers überprüfen und Popup entsprechend anzeigen
    if (!popupShown && !acceptedCookies && !rejectedCookies && navigator.onLine) {
        popup.style.display = 'flex';

        acceptCookiesButton.addEventListener('click', function () {
            CookieUtil.setCookie('cookiesAccepted', 'true', 4);
            popup.style.display = 'none';
            acceptedPopup.style.display = 'flex';
        });

        closeCookiesButton.addEventListener('click', function () {
            // Markiere das Popup als angezeigt in der Session-Speicherung
            sessionStorage.setItem('popupShown', 'true');
            popup.style.display = 'none';

            // Setze ein Session-Cookie für die Ablehnung von Cookies
            CookieUtil.setSessionCookie('cookiesRejected', 'true');
            rejectedPopup.style.display = 'flex';
        });

        closeAcceptedPopupButton.addEventListener('click', function () {
            // Akzeptieren-Popup schließen
            acceptedPopup.style.display = 'none';
        });

        closeRejectedPopupButton.addEventListener('click', function () {
            // Abgelehnt-Popup schließen
            rejectedPopup.style.display = 'none';
        });
    }

    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data === 'showOfflinePopup') {
            // Show the offline popup
            const offlinePopup = document.getElementById('offline-popup');
            offlinePopup.style.display = 'flex';
        }
    });
});