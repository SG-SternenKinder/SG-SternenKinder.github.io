/**
 * Toggle-Funktion für das responsive Menü
 * @namespace toggleMenu
 */
(function() {
    'use strict';

    // DOM-Elemente
    const DOM = {
        navbar: document.querySelector('.navbar'),
        menuToggle: document.querySelector('.menu-toggle'),
        breakpoint: 768
    };

    // Zustandsmanagement
    const state = {
        isMenuOpen: false
    };

    /**
     * Aktualisiert den Menü-Zustand und ARIA-Attribute
     * @param {boolean} isOpen - Ob das Menü geöffnet ist
     */
    function updateMenuState(isOpen) {
        DOM.navbar.classList.toggle('active', isOpen);
        DOM.menuToggle.setAttribute('aria-expanded', String(isOpen));
        state.isMenuOpen = isOpen;

        // Konsolenausgabe
        const message = isOpen ? 'Menü wurde geöffnet' : 'Menü wurde geschlossen';
        $.consoleManager.logOnce(message, 'menu-toggle');
    }

    /**
     * Schaltet den Menü-Zustand um
     */
    function toggleMenu() {
        updateMenuState(!state.isMenuOpen);
    }

    /**
     * Schließt das Menü bei ausreichender Bildschirmgröße
     */
    function handleResize() {
        if (window.innerWidth > DOM.breakpoint && state.isMenuOpen) {
            updateMenuState(false);
        }
    }

    // Event-Handler
    function init() {
        DOM.menuToggle.addEventListener('click', toggleMenu);
        window.addEventListener('resize', handleResize);
        
        // Initialen Zustand setzen
        updateMenuState(false);
    }

    // Initialisierung nach DOM ready
    document.addEventListener('DOMContentLoaded', init);
})();