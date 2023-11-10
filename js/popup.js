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
    const acceptedCookies = getCookie('cookiesAccepted');

    if (!popupShown) {
        popup.style.display = 'flex';
    }

    if (!acceptedCookies) {
        popup.style.display = 'flex';
    }

    acceptCookiesButton.addEventListener('click', function () {
        setCookie('cookiesAccepted', 'true', 7);
        popup.style.display = 'none';
        acceptedPopup.style.display = 'flex';
    });

    closeCookiesButton.addEventListener('click', function () {
        popup.style.display = 'none';
        rejectedPopup.style.display = 'flex';
        // Markiere das Popup als angezeigt in der Session-Speicherung
        sessionStorage.setItem('popupShown', 'true');
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