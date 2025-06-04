/**
 * Banner Manager - Verwaltung von Ankündigungsbannern
 * @namespace bannerManager
 */
(function($) {
    'use strict';

    // Konfiguration
    const config = {
        bannerName: 'Aktion',
        bannerVersion: 'v0.0.0.3.6',
        animationDuration: 500,
        storagePrefix: 'banner',
        logPrefix: '[Banner]'
    };

    // DOM-Elemente
    const $elements = {
        banner: $('#announcement-banner'),
        closeButton: $('#close-announcement')
    };

    // Zustand
    let bannerClosed = false;

    /**
     * Initialisiert den Banner-Manager
     */
    function init() {
        checkBannerState();
        setupEventListeners();
    }

    /**
     * Überprüft den Banner-Zustand im LocalStorage
     */
    function checkBannerState() {
        const storageKey = getStorageKey();
        bannerClosed = localStorage.getItem(storageKey) === 'true';

        log(`Banner-Status: ${bannerClosed ? 'geschlossen' : 'offen'}`);

        if (!bannerClosed) {
            showBanner();
        } else {
            log('Banner wird nicht angezeigt (bereits geschlossen)');
        }
    }

    /**
     * Zeigt das Banner mit Animation an
     */
    function showBanner() {
        $elements.banner.stop().fadeIn(config.animationDuration);
        log('Banner wird angezeigt');
    }

    /**
     * Schließt das Banner mit Animation
     */
    function closeBanner() {
        const storageKey = getStorageKey();
        localStorage.setItem(storageKey, 'true');
        $elements.banner.stop().fadeOut(config.animationDuration);
        log('Banner wurde geschlossen');
    }

    /**
     * Generiert den Storage-Key für den Banner
     * @returns {string} Storage-Key
     */
    function getStorageKey() {
        return `${config.storagePrefix}-${config.bannerName}-${config.bannerVersion}-Closed`;
    }

    /**
     * Richtet Event-Listener ein
     */
    function setupEventListeners() {
        if (!bannerClosed) {
            $elements.closeButton.on('click', closeBanner);
        }
    }

    /**
     * Loggt Nachrichten über consoleManager
     * @param {string} message - Nachricht
     */
    function log(message) {
        if (typeof $.consoleManager !== 'undefined' && $.consoleManager.getConsoleOutput()) {
            $.consoleManager.logToConsoleOnce(`${config.logPrefix} ${message}`, 'banner-log');
        }
    }

    // Initialisierung bei DOM ready
    $(document).ready(init);

})(jQuery);