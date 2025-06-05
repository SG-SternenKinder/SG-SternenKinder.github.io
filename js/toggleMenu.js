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
        navLinks: document.querySelectorAll('[data-nav-link]'),
        breakpoint: 768
    };

    // Zustandsmanagement
    const state = {
        isMenuOpen: false,
        currentPath: window.location.pathname
    };

    // NEU: Prüft exakte Übereinstimmung der Pfade
    function isCurrentPage(link) {
        return new URL(link.href).pathname === state.currentPath;
    }

    // Aktiven Link markieren
    function highlightCurrentPage() {
        DOM.navLinks.forEach(link => {
            if (isCurrentPage(link)) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // Menü-Zustand aktualisieren
    function updateMenuState(isOpen) {
        DOM.navbar.classList.toggle('active', isOpen);
        DOM.menuToggle.setAttribute('aria-expanded', isOpen);
        state.isMenuOpen = isOpen;
    }

    // Event-Handler
    function init() {
        DOM.menuToggle.addEventListener('click', () => updateMenuState(!state.isMenuOpen));
        window.addEventListener('resize', () => {
            if (window.innerWidth > DOM.breakpoint && state.isMenuOpen) {
                updateMenuState(false);
            }
        });
        
        highlightCurrentPage(); // Initiale Markierung
    }

    // Initialisierung
    document.addEventListener('DOMContentLoaded', init);
})();