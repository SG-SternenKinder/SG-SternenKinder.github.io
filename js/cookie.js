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
        getCookie
    };
})();