// Cookie.js
if (typeof jQuery !== 'undefined') {
    (function ($) {
        const CookieUtil = (function () {
            // Funktion für die Escape-Sicherheit von Cookie-Namen
            function escapeCookieName(name) {
                return encodeURIComponent(name);
            }

            // Funktion zum Setzen eines Cookies mit angegebenem Namen, Wert und Gültigkeitsdauer in Tagen
            function setCookie(name, value, days, options = {}) {
                // Escape-Sicherheit für den Cookie-Namen
                name = escapeCookieName(name);

                // Überprüfen der Gültigkeitsdauer
                if (typeof days !== 'number' || days <= 0) {
                    $.consoleManager.error('Ungültiger Gültigkeitsdauer-Wert für das Cookie.');
                    return;
                }

                // Überprüfen von Name und Wert
                if (!name || !value) {
                    $.consoleManager.error('Ungültiger Name oder Wert für das Cookie.');
                    return;
                }

                // Berechnen des Ablaufdatums
                const expires = new Date();
                expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

                // Erstellen des Cookie-Strings
                let cookieString = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;

                // Füge optionale Cookie-Optionen hinzu
                for (const option in options) {
                    if (options.hasOwnProperty(option)) {
                        cookieString += `;${option}${options[option] === true ? '' : `=${options[option]}`}`;
                    }
                }

                // Setzen des Cookies im DOM
                document.cookie = cookieString;

                // Logge eine Erfolgsmeldung, wenn die Konsolenausgabe aktiviert ist
                if ($.consoleManager.getConsoleOutput()) {
                    console.log(`Cookie "${name}" wurde erfolgreich gesetzt.`);
                }
            }

            // Funktion zum Abrufen eines Cookies anhand des Namens
            function getCookie(name) {
                // Escape-Sicherheit für den Cookie-Namen
                const cookieName = escapeCookieName(name) + '=';
                const cookies = document.cookie.split(';');

                // Durchsuchen aller Cookies
                for (let i = 0; i < cookies.length; i++) {
                    let cookie = cookies[i].trim();

                    // Wenn das Cookie gefunden wurde
                    if (cookie.indexOf(cookieName) === 0) {
                        // Dekodiere den Wert und gebe ihn zurück
                        const cookieValue = decodeURIComponent(cookie.substring(cookieName.length, cookie.length));

                        // Logge eine Erfolgsmeldung, wenn die Konsolenausgabe aktiviert ist
                        if ($.consoleManager.getConsoleOutput()) {
                            console.log(`Cookie "${name}" wurde erfolgreich abgerufen.`);
                        }

                        return cookieValue;
                    }
                }

                // Wenn das Cookie nicht gefunden wurde
                if ($.consoleManager.getConsoleOutput()) {
                    console.warn(`Cookie "${name}" wurde nicht gefunden.`);
                }

                return null;
            }

            // Öffentlich zugängliche Methoden
            return {
                setCookie,
                getCookie
            };
        })();

        // Weise das CookieUtil-Objekt dem globalen Bereich zu, damit es von außen zugänglich ist
        window.CookieUtil = CookieUtil;

    })(jQuery);
} else {
    // jQuery ist nicht verfügbar, hier könntest du eine Fehlermeldung ausgeben oder alternative Maßnahmen ergreifen
    console.error('jQuery ist nicht verfügbar. Stellen Sie sicher, dass es richtig geladen wird.');
}