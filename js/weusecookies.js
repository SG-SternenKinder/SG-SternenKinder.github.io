//WeuseCookies.js überarbeiten und zur Ankündigungsbanner machen
// Zeige das Cookie-Banner, es sei denn, der Benutzer hat bereits Cookies akzeptiert
document.addEventListener('DOMContentLoaded', function () {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    const acceptedCookies = getCookie('cookiesAccepted');

    if (!acceptedCookies) {
        cookieBanner.style.display = 'block';
    }

    acceptCookiesButton.addEventListener('click', function () {
        setCookie('cookiesAccepted', 'true', 7);
        cookieBanner.style.display = 'none';
    });
});