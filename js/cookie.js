/**
 * Cookie Utility - Sichere Cookie-Handling-Funktionen
 * @namespace CookieUtil
 * @requires jQuery
 */
if (typeof jQuery === 'undefined') {
    throw new Error('jQuery ist nicht verfügbar. CookieUtil benötigt jQuery.');
}

(function($) {
    'use strict';

    // Standard-Cookie-Optionen
    const DEFAULT_OPTIONS = {
        path: '/',
        secure: true,
        sameSite: 'Strict'
    };

    /**
     * Kodiert Cookie-Namen und Werte sicher
     * @param {string} value - Zu kodierender Wert
     * @returns {string} Kodierter Wert
     */
    function encodeCookieValue(value) {
        return encodeURIComponent(value).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent);
    }

    /**
     * Setzt ein Cookie mit erweiterten Sicherheitsoptionen
     * @param {string} name - Cookie-Name
     * @param {string} value - Cookie-Wert
     * @param {number} days - Gültigkeit in Tagen
     * @param {object} [options={}] - Zusätzliche Optionen
     */
    function setCookie(name, value, days, options = {}) {
        if (!name || !/^[a-zA-Z0-9_-]+$/.test(name)) {
            console.error('Ungültiger Cookie-Name:', name);
            return;
        }

        if (typeof days !== 'number' || days <= 0) {
            console.error('Ungültige Gültigkeitsdauer:', days);
            return;
        }

        const expires = new Date();
        expires.setTime(expires.getTime() + days * 864e5);

        const cookieOptions = {
            ...DEFAULT_OPTIONS,
            ...options,
            expires: expires.toUTCString()
        };

        let cookieString = `${encodeCookieValue(name)}=${encodeCookieValue(value)}`;

        for (const [key, val] of Object.entries(cookieOptions)) {
            if (val === true) {
                cookieString += `;${key}`;
            } else if (val) {
                cookieString += `;${key}=${val}`;
            }
        }

        document.cookie = cookieString;
        log(`Cookie "${name}" gesetzt`, 'log');
    }

    /**
     * Liest ein Cookie
     * @param {string} name - Cookie-Name
     * @returns {string|null} Cookie-Wert oder null
     */
    function getCookie(name) {
        const nameEncoded = encodeCookieValue(name);
        const cookies = document.cookie.split(';');

        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === nameEncoded) {
                const value = decodeURIComponent(cookieValue || '');
                log(`Cookie "${name}" gelesen`, 'log');
                return value;
            }
        }

        log(`Cookie "${name}" nicht gefunden`, 'warn');
        return null;
    }

    /**
     * Entfernt ein Cookie
     * @param {string} name - Cookie-Name
     */
    function deleteCookie(name) {
        setCookie(name, '', -1);
        log(`Cookie "${name}" gelöscht`, 'log');
    }

    /**
     * Konsolenausgabe mit consoleManager
     * @param {string} message - Nachricht
     * @param {string} type - Log-Typ ('log', 'warn', 'error')
     */
    function log(message, type = 'log') {
        if ($.consoleManager && $.consoleManager.getConsoleOutput()) {
            console[type](`[CookieUtil] ${message}`);
        }
    }

    // jQuery-Plugin erstellen
    $.CookieUtil = {
        setCookie,
        getCookie,
        deleteCookie,
        encodeCookieValue
    };

})(jQuery);