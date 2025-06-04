/**
 * Hintergrundbild-Manager - Lädt zufällige Hintergrundbilder mit Fallback-Option
 * @namespace backgroundManager
 */
(function($) {
    'use strict';

    // Konfiguration
    const config = {
        imagePaths: [
            '/img/background.png',
            '/img/background2.png',
            '/img/background3.png'
        ],
        fallbackImage: '/img/background.png',
        imageElementId: 'fsb_image',
        errorMessage: 'Hintergrundbild konnte nicht geladen werden. Standardbild wird verwendet.'
    };

    /**
     * Initialisiert den Hintergrund-Manager
     */
    async function init() {
        try {
            const basePath = getBasePath();
            const images = prepareImageUrls(basePath);
            await setRandomBackground(images);
        } catch (error) {
            handleBackgroundError(error);
        }
    }

    /**
     * Ermittelt den Basis-Pfad für die Bilder
     * @returns {string} Basis-Pfad
     */
    function getBasePath() {
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        const depth = Math.max(pathParts.length - 1, 0);
        return '../'.repeat(depth);
    }

    /**
     * Bereitet die vollständigen Bild-URLs vor
     * @param {string} basePath - Basis-Pfad
     * @returns {string[]} Array mit vollständigen Bild-URLs
     */
    function prepareImageUrls(basePath) {
        return config.imagePaths.map(path => basePath + path);
    }

    /**
     * Überprüft ob ein Bild existiert
     * @param {string} url - Bild-URL
     * @returns {Promise<boolean>} True wenn Bild existiert
     */
    function checkImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    /**
     * Setzt ein zufälliges Hintergrundbild
     * @param {string[]} images - Array mit Bild-URLs
     */
    async function setRandomBackground(images) {
        const randomIndex = Math.floor(Math.random() * images.length);
        const imageUrl = images[randomIndex];
        const fallbackUrl = getBasePath() + config.fallbackImage;

        const useFallback = !(await checkImageExists(imageUrl));
        const finalImageUrl = useFallback ? fallbackUrl : imageUrl;

        if (useFallback) {
            showError(config.errorMessage);
        }

        applyBackgroundImage(finalImageUrl);
    }

    /**
     * Wendet das Hintergrundbild an
     * @param {string} imageUrl - URL des Bildes
     */
    function applyBackgroundImage(imageUrl) {
        // Existierendes Bild entfernen falls vorhanden
        $(`#${config.imageElementId}`).remove();
        
        // Neues Bild einfügen
        $('<img>', {
            id: config.imageElementId,
            src: imageUrl,
            alt: 'Hintergrundbild'
        }).appendTo('body');
    }

    /**
     * Zeigt eine Fehlermeldung an
     * @param {string} message - Fehlermeldung
     */
    function showError(message) {
        if (typeof $.consoleManager !== 'undefined') {
            $.consoleManager.error(message);
        } else {
            console.error(message);
        }
    }

    /**
     * Behandelt Fehler beim Laden des Hintergrunds
     * @param {Error} error - Fehlerobjekt
     */
    function handleBackgroundError(error) {
        showError(`Fehler beim Laden des Hintergrunds: ${error.message}`);
        applyBackgroundImage(getBasePath() + config.fallbackImage);
    }

    // Initialisierung bei DOM ready
    $(document).ready(init);

})(jQuery);