// Cookie.js

// Überprüfe, ob jQuery vorhanden ist
if (typeof jQuery !== 'undefined') {
    (function ($) {
        /**
         * Escape-Sicherheit für Cookie-Namen
         * @param {string} name - Der Name des Cookies
         * @returns {string} - Der escapeierte Cookie-Name
         */
        function escapeCookieName(name) {
            return encodeURIComponent(name);
        }

        /**
         * Setzen eines Cookies mit angegebenem Namen, Wert und Gültigkeitsdauer in Tagen
         * @param {string} name - Der Name des Cookies
         * @param {string} value - Der Wert des Cookies
         * @param {number} days - Die Gültigkeitsdauer in Tagen
         * @param {object} options - Zusätzliche Cookie-Optionen (optional)
         */
        function setCookie(name, value, days, options = {}) {
            name = escapeCookieName(name);

            if (typeof days !== 'number' || days <= 0) {
                console.error('Ungültiger Gültigkeitsdauer-Wert für das Cookie.');
                return;
            }
            if (!name || !value) {
                console.error('Ungültiger Name oder Wert für das Cookie.');
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
            logToConsole(`Cookie "${name}" wurde erfolgreich gesetzt.`);
        }

        /**
         * Abrufen eines Cookies anhand des Namens
         * @param {string} name - Der Name des Cookies
         * @returns {string|null} - Der Wert des Cookies oder null, wenn das Cookie nicht gefunden wurde
         */
        function getCookie(name) {
            const cookieName = escapeCookieName(name) + '=';
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.indexOf(cookieName) === 0) {
                    const cookieValue = decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
                    logToConsole(`Cookie "${name}" wurde erfolgreich abgerufen.`);
                    return cookieValue;
                }
            }
            logToConsole(`Cookie "${name}" wurde nicht gefunden.`, 'warn');
            return null;
        }

        /**
         * Log-Nachrichten in die Konsole, wenn consoleManager aktiviert ist
         * @param {string} message - Die Nachricht zum Loggen
         * @param {string} [type='log'] - Der Log-Typ ('log', 'warn', 'error')
         */
        function logToConsole(message, type = 'log') {
            if ($.consoleManager && $.consoleManager.getConsoleOutput()) {
                console[type](message);
            }
        }

        // Füge CookieUtil zu jQuery hinzu
        $.CookieUtil = {
            setCookie,
            getCookie
        };
    })(jQuery);
} else {
    console.error('jQuery is not available. Make sure it is properly loaded.');
}