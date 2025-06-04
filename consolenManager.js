/**
 * Console Manager für zentrale Steuerung der Konsolenausgaben
 * @namespace consoleManager
 */
$.consoleManager = {
    /**
     * Konsolen-Einstellungen
     * @type {Object}
     * @property {boolean} enableConsoleOutput
     */
    consoleSettings: {
        enableConsoleOutput: true
    },

    /**
     * Setzt den Konsolenausgabe-Status
     * @param {boolean} enabled - true für aktiviert, false für deaktiviert
     */
    setConsoleOutput: function(enabled) {
        this.consoleSettings.enableConsoleOutput = Boolean(enabled);
    },

    /**
     * Gibt den aktuellen Konsolenausgabe-Status zurück
     * @return {boolean} Aktueller Status
     */
    getConsoleOutput: function() {
        return this.consoleSettings.enableConsoleOutput;
    },

    /**
     * Gibt eine Fehlermeldung in der Konsole aus (wenn aktiviert)
     * @param {string} message - Fehlermeldung
     * @param {Error} [error] - Optionales Error-Objekt
     */
    error: function(message, error) {
        if (this.consoleSettings.enableConsoleOutput) {
            console.error('[ERROR]', message, error || '');
        }
    },

    /**
     * Gibt eine Warnung in der Konsole aus (wenn aktiviert)
     * @param {string} message - Warnmeldung
     */
    warn: function(message) {
        if (this.consoleSettings.enableConsoleOutput) {
            console.warn('[WARN]', message);
        }
    },

    /**
     * Gibt eine Info in der Konsole aus (wenn aktiviert)
     * @param {string} message - Infomeldung
     */
    info: function(message) {
        if (this.consoleSettings.enableConsoleOutput) {
            console.info('[INFO]', message);
        }
    },

    /**
     * Einmaliges Logging mit Nachrichten-Deduplizierung
     * @type {function}
     */
    logOnce: (() => {
        const messageCache = new Map();

        return function(message, key = 'default') {
            if (!this.consoleSettings.enableConsoleOutput) return;
            
            if (!messageCache.has(key) || messageCache.get(key) !== message) {
                console.log(message);
                messageCache.set(key, message);
            }
        };
    })()
};

// Alias für backward compatibility
$.consoleManager.logToConsoleOnce = $.consoleManager.logOnce;