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

    // Überprüfe, ob Cookies akzeptiert wurden
    const acceptedCookies = getCookie('cookiesAccepted');

    // Überprüfe, ob Cookies abgelehnt wurden
    const rejectedCookies = getCookie('cookiesRejected');

    // Entscheidung des Benutzers überprüfen und Popup entsprechend anzeigen
    if (!popupShown && !acceptedCookies) {
        popup.style.display = 'flex';
    }

    acceptCookiesButton.addEventListener('click', function () {
        setCookie('cookiesAccepted', 'true', 4);
        popup.style.display = 'none';
        acceptedPopup.style.display = 'flex';
    });

    closeCookiesButton.addEventListener('click', function () {
        // Markiere das Popup als angezeigt in der Session-Speicherung
        sessionStorage.setItem('popupShown', 'true');
        popup.style.display = 'none';
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

});