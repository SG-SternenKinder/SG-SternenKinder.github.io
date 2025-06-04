/**
 * Popup Manager - Verwaltet alle Popup-Funktionen
 * @namespace popupManager
 */
(function($) {
    'use strict';

    // Konfiguration
    const config = {
        popupTypen: {
            COOKIE: 'cookiePopup',
            AKZEPTIERT: 'acceptedPopup',
            ABGELEHNT: 'rejectedPopup',
            OFFLINE: 'offlinePopup'
        },
        speicherSchlüssel: {
            POPUP_GEZEIGT: 'popupShown',
            COOKIES_AKZEPTIERT: 'cookiesAccepted',
            COOKIES_ABGELEHNT: 'cookiesRejected'
        },
        jsonPfad: '../json/popup.json',
        logPrefix: '[Popup]'
    };

    // DOM Elemente
    const $body = $('body');
    let popups = {};

    /**
     * Erstellt ein Popup mit gegebener ID und Inhalt
     * @param {string} id - Popup ID
     * @param {string} content - HTML Inhalt
     * @returns {jQuery} Popup Element
     */
    function erstellePopup(id, content) {
        const $popup = $('<div class="popup-container"></div>')
            .attr('id', id)
            .html(content)
            .appendTo($body)
            .hide();
        
        popups[id] = $popup;
        return $popup;
    }

    /**
     * Entfernt ein Popup anhand der ID
     * @param {string} id - Zu entfernende Popup ID
     */
    function entfernePopup(id) {
        if (popups[id]) {
            popups[id].remove();
            delete popups[id];
        }
    }

    /**
     * Lädt Popup-Texte aus JSON Datei
     * @returns {Promise} Promise mit Popup-Daten
     */
    function ladePopupTexte() {
        return $.getJSON(config.jsonPfad)
            .fail(() => log('Fehler beim Laden der Popup-Texte'));
    }

    /**
     * Erstellt HTML Inhalt für verschiedene Popup-Typen
     * @param {string} typ - Popup Typ
     * @param {Object} daten - Popup Inhaltsdaten
     * @returns {string} HTML Inhalt
     */
    function erstellePopupInhalt(typ, daten) {
        const vorlagen = {
            [config.popupTypen.COOKIE]: `
                <div class="popup-content">
                    <h2>${daten.title}</h2>
                    ${daten.paragraphs.map(p => `<p>${p}</p>`).join('')}
                    <br>
                    <div class="mitte-container">
                        ${daten.links.map(link => 
                            `<a href="${link.href}" target="_self">${link.text}</a>`
                        ).join(' ')}
                    </div>
                    <button class="popup-btn accept-btn">${daten.buttons.accept}</button>
                    <button class="popup-btn reject-btn">${daten.buttons.reject}</button>
                </div>
            `,
            [config.popupTypen.AKZEPTIERT]: `
                <div class="popup-content">
                    <h2>${daten.title}</h2>
                    <p>${daten.paragraph}</p>
                    <button class="popup-btn close-btn">${daten.button}</button>
                </div>
            `,
            [config.popupTypen.ABGELEHNT]: `
                <div class="popup-content">
                    <h2>${daten.title}</h2>
                    <p>${daten.paragraph}</p>
                    <button class="popup-btn close-btn">${daten.button}</button>
                </div>
            `,
            [config.popupTypen.OFFLINE]: `
                <div class="popup-content">
                    <h2>${daten.title}</h2>
                    <p>${daten.paragraph}</p>
                    <button class="popup-btn close-btn">${daten.button}</button>
                </div>
            `
        };

        return vorlagen[typ] || '';
    }

    /**
     * Richtet Event-Handler für ein Popup ein
     * @param {jQuery} $popup - Popup Element
     * @param {string} typ - Popup Typ
     */
    function richtePopupEventsEin($popup, typ) {
        $popup.on('click', '.close-btn', () => {
            $popup.remove();
            log(`${typ} wurde geschlossen`);
        });

        if (typ === config.popupTypen.COOKIE) {
            $popup.on('click', '.accept-btn', handleCookieAkzeptiert);
            $popup.on('click', '.reject-btn', handleCookieAbgelehnt);
        }
    }

    /**
     * Verarbeitet die Cookie-Akzeptierung
     */
    function handleCookieAkzeptiert() {
        $.CookieUtil.setCookie(config.speicherSchlüssel.COOKIES_AKZEPTIERT, 'true', 4);
        entfernePopup('popup');
        zeigePopup(config.popupTypen.AKZEPTIERT);
        log('Cookies wurden akzeptiert');
    }

    /**
     * Verarbeitet die Cookie-Ablehnung
     */
    function handleCookieAbgelehnt() {
        sessionStorage.setItem(config.speicherSchlüssel.POPUP_GEZEIGT, 'true');
        sessionStorage.setItem(config.speicherSchlüssel.COOKIES_ABGELEHNT, 'true');
        entfernePopup('popup');
        zeigePopup(config.popupTypen.ABGELEHNT);
        log('Cookies wurden abgelehnt');
    }

    /**
     * Zeigt ein Popup anhand des Typs
     * @param {string} typ - Popup Typ
     */
    function zeigePopup(typ) {
        const popupId = `${typ}-popup`.toLowerCase();
        if (popups[popupId]) {
            popups[popupId].css('display', 'flex');
        }
    }

    /**
     * Initialisiert das Offline-Popup vom Service Worker
     */
    function initOfflinePopup() {
        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data === 'showOfflinePopup') {
                zeigePopup(config.popupTypen.OFFLINE);
                log('Offline-Popup wird angezeigt');
            }
        });
    }

    /**
     * Loggt Nachrichten in die Konsole, wenn aktiviert
     * @param {string} nachricht - Zu loggende Nachricht
     */
    function log(nachricht) {
        if (typeof $.consoleManager !== 'undefined' && $.consoleManager.getConsoleOutput()) {
            console.log(`${config.logPrefix} ${nachricht}`);
        }
    }

    /**
     * Haupt-Initialisierungsfunktion
     */
    async function init() {
        try {
            const daten = await ladePopupTexte();
            
            // Erstelle alle Popups (werden noch nicht angezeigt)
            erstellePopup('popup', erstellePopupInhalt(config.popupTypen.COOKIE, daten.cookiePopup));
            erstellePopup('accepted-popup', erstellePopupInhalt(config.popupTypen.AKZEPTIERT, daten.acceptedPopup));
            erstellePopup('rejected-popup', erstellePopupInhalt(config.popupTypen.ABGELEHNT, daten.rejectedPopup));
            erstellePopup('offline-popup', erstellePopupInhalt(config.popupTypen.OFFLINE, daten.offlinePopup));

            // Richte Event-Handler ein
            Object.keys(popups).forEach(id => {
                const typ = id.replace('-popup', '');
                richtePopupEventsEin(popups[id], typ);
            });

            // Prüfe ob das Cookie-Popup angezeigt werden soll
            const popupGezeigt = sessionStorage.getItem(config.speicherSchlüssel.POPUP_GEZEIGT);
            const cookiesAkzeptiert = $.CookieUtil.getCookie(config.speicherSchlüssel.COOKIES_AKZEPTIERT);
            const cookiesAbgelehnt = $.CookieUtil.getCookie(config.speicherSchlüssel.COOKIES_ABGELEHNT);

            log(`Popup gezeigt: ${popupGezeigt}`);
            log(`Cookies akzeptiert: ${cookiesAkzeptiert}`);
            log(`Cookies abgelehnt: ${cookiesAbgelehnt}`);

            if (!popupGezeigt && !cookiesAkzeptiert && !cookiesAbgelehnt && navigator.onLine) {
                log('Cookie-Popup wird angezeigt');
                zeigePopup(config.popupTypen.COOKIE);
            } else {
                log('Cookie-Popup wird nicht angezeigt');
            }

            initOfflinePopup();
        } catch (error) {
            log(`Initialisierungsfehler: ${error}`);
        }
    }

    // Initialisierung wenn DOM bereit ist
    $(document).ready(init);

})(jQuery);