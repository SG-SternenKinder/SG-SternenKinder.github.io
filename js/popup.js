/**
 * Popup Manager - Verwaltet Cookie- und Offline-Popups
 * @namespace popupManager
 * @requires jQuery
 * @requires CookieUtil
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
        jsonPfad: '/json/popup.json',
        logPrefix: '[Popup]',
        cookieLaufzeit: 2 // Tage
    };

    // DOM Elemente
    const $body = $('body');
    let popups = {};

    /**
     * Initialisiert die Popup-Komponente
     * @throws {Error} Wenn Abhängigkeiten fehlen
     */
    function initialisiereAbhaengigkeiten() {
        if (typeof $ === 'undefined') {
            throw new Error('jQuery nicht geladen');
        }
        if (typeof $.CookieUtil === 'undefined') {
            throw new Error('CookieUtil nicht verfügbar');
        }
    }

    /**
     * Erstellt ein Popup mit Inhalt
     * @param {string} id - Popup ID
     * @param {string} content - HTML Inhalt
     * @returns {jQuery} Popup Element
     */
    function erstellePopup(id, content) {
        return $('<div class="popup-container"></div>')
            .attr('id', id)
            .html(content)
            .appendTo($body)
            .hide();
    }

    /**
     * Lädt Popup-Texte mit Fehlerbehandlung
     * @returns {Promise<Object>} Popup-Daten
     */
    function ladePopupTexte() {
        return $.getJSON(config.jsonPfad).catch(() => ({
            cookiePopup: {
                title: "Cookie-Einstellungen",
                paragraphs: ["Wir verwenden Cookies für wesentliche Funktionen."],
                links: [],
                buttons: { accept: "Akzeptieren", reject: "Ablehnen" }
            }
        }));
    }

    /**
     * Cookie-Akzeptierung verarbeiten
     */
    function handleCookieAkzeptiert() {
        $.CookieUtil.setCookie(
            config.speicherSchlüssel.COOKIES_AKZEPTIERT, 
            'true', 
            config.cookieLaufzeit
        );
        popups.popup.remove();
        popups['accepted-popup'].fadeIn(200);
        log('Cookies akzeptiert');
    }

    /**
     * Cookie-Ablehnung verarbeiten
     */
    function handleCookieAbgelehnt() {
        sessionStorage.setItem(config.speicherSchlüssel.POPUP_GEZEIGT, 'true');
        popups.popup.remove();
        popups['rejected-popup'].fadeIn(200);
        log('Cookies abgelehnt');
    }

    /**
     * Service Worker Nachrichten verarbeiten
     */
    function initOfflinePopup() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data === 'showOfflinePopup' && popups['offline-popup']) {
                    popups['offline-popup'].fadeIn(200);
                }
            });
        }
    }

    /**
     * Loggt Nachrichten über consoleManager
     * @param {string} nachricht - Zu loggende Nachricht
     */
    function log(nachricht) {
        if ($.consoleManager && $.consoleManager.getConsoleOutput()) {
            console.log(`${config.logPrefix} ${nachricht}`);
        }
    }

    /**
     * Hauptinitialisierung
     */
    async function init() {
        try {
            initialisiereAbhaengigkeiten();
            const daten = await ladePopupTexte();

            // Popups erstellen
            popups = {
                'popup': erstellePopup('popup', `
                    <div class="popup-content">
                        <h2>${daten.cookiePopup.title}</h2>
                        ${daten.cookiePopup.paragraphs.map(p => `<p>${p}</p>`).join('')}
                        <div class="popup-buttons">
                            <button class="popup-btn reject-btn">${daten.cookiePopup.buttons.reject}</button>
                            <button class="popup-btn accept-btn">${daten.cookiePopup.buttons.accept}</button>
                        </div>
                    </div>
                `),
                'accepted-popup': erstellePopup('accepted-popup', `
                    <div class="popup-content">
                        <h2>${daten.acceptedPopup?.title || 'Danke'}</h2>
                        <p>${daten.acceptedPopup?.paragraph || 'Ihre Einstellungen wurden gespeichert.'}</p>
                        <button class="popup-btn close-btn">${daten.acceptedPopup?.button || 'Schließen'}</button>
                    </div>
                `),
                'rejected-popup': erstellePopup('rejected-popup', `
                    <div class="popup-content">
                        <h2>${daten.rejectedPopup?.title || 'Hinweis'}</h2>
                        <p>${daten.rejectedPopup?.paragraph || 'Es werden nur notwendige Cookies verwendet.'}</p>
                        <button class="popup-btn close-btn">${daten.rejectedPopup?.button || 'Verstanden'}</button>
                    </div>
                `)
            };

            // Event-Handler
            popups.popup
                .on('click', '.accept-btn', handleCookieAkzeptiert)
                .on('click', '.reject-btn', handleCookieAbgelehnt);

            popups['accepted-popup']
                .on('click', '.close-btn', () => popups['accepted-popup'].fadeOut(200));

            popups['rejected-popup']
                .on('click', '.close-btn', () => popups['rejected-popup'].fadeOut(200));

            // Initial anzeigen wenn nötig
            if (!sessionStorage.getItem(config.speicherSchlüssel.POPUP_GEZEIGT)){
                const cookiesAkzeptiert = $.CookieUtil.getCookie(config.speicherSchlüssel.COOKIES_AKZEPTIERT);
                if (!cookiesAkzeptiert && navigator.onLine) {
                    popups.popup.fadeIn(200);
                }
            }

            initOfflinePopup();

        } catch (error) {
            console.error(`${config.logPrefix} Initialisierungsfehler:`, error);
        }
    }

    // Start
    $(init);

})(jQuery);