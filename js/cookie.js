// Cookie.js
const CookieUtil = (function () {
    // Escape-Sicherheit für Cookie-Namen
    function escapeCookieName(name) {
        return encodeURIComponent(name);
    }

    // Setzen eines Cookies mit angegebenem Namen, Wert und Gültigkeitsdauer in Tagen
    function setCookie(name, value, days, options = {}) {
        name = escapeCookieName(name);

        if (typeof days !== 'number' || days <= 0) {
            return;
        }
        if (!name || !value) {
            return;
        }

        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

        let cookieString = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;

        // Füge optionale Cookie-Optionen hinzu
        for (const option in options) {
            if (options.hasOwnProperty(option)) {
                cookieString += `;${option}${options[option] === true ? '' : `=${options[option]}`}`;
            }
        }

        document.cookie = cookieString;
    }

    // Setzen eines Session-Cookies mit angegebenem Namen und Wert
    function setSessionCookie(name, value) {
        name = escapeCookieName(name);

        if (!name || !value) {
            return;
        }

        document.cookie = `${name}=${encodeURIComponent(value)};path=/`;
    }

    // Abrufen eines Werts aus dem Session Storage anhand des Namens
    function getSessionItem(name) {
        try {
            const item = sessionStorage.getItem(name);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Fehler beim Abrufen des Session-Items:', error);
            return null;
        }
    }

    // Abrufen eines Cookies anhand des Namens
    function getCookie(name) {
        const cookieName = escapeCookieName(name) + '=';
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(cookieName) === 0) {
                return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
            }
        }
        return null;
    }

    return {
        setCookie,
        getCookie,
        setSessionCookie,
        getSessionItem
    };
})();