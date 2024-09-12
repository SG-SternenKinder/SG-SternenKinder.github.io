// consolenManager.js

/**
 * Das Objekt consoleManager
 */
$.consoleManager = {
    /**
     * Einstellungen für die Konsolenausgabe
     * @property {Object} consoleSettings - Die Konsoleneinstellungen
     * @property {boolean} consoleSettings.enableConsoleOutput - Status der Konsolenausgabe
     */
    consoleSettings: {
        enableConsoleOutput: true // Initial ist die Konsolenausgabe aktiviert
    },

    /**
     * Setzt die Konsolenausgabe (aktivieren oder deaktivieren)
     * @param {boolean} value - Der neue Status der Konsolenausgabe
     */
    setConsoleOutput: function (value) {
        this.consoleSettings.enableConsoleOutput = value;
    },

    /**
     * Ruft den aktuellen Status der Konsolenausgabe ab
     * @returns {boolean} - Der aktuelle Status der Konsolenausgabe
     */
    getConsoleOutput: function () {
        return this.consoleSettings.enableConsoleOutput;
    },

    /**
     * Gibt eine Fehlermeldung in der Konsole aus, wenn die Konsolenausgabe aktiviert ist
     * @param {string} message - Die Fehlermeldung, die ausgegeben werden soll
     */
    error: function (message) {
        if (this.consoleSettings.enableConsoleOutput) {
            console.error(message);
        }
    },

    /**
     * Loggt eine Nachricht in die Konsole, aber nur einmal pro Statusänderung.
     * Speichert den letzten geloggten Status, um unnötiges Logging zu vermeiden.
     * @param {string} message - Die Nachricht, die geloggt werden soll.
     */
    logToConsoleOnce: (function() {
        let lastMessage = ''; // Variable zum Speichern der letzten geloggten Nachricht

        return function(message) {
            if (this.consoleSettings.enableConsoleOutput && message !== lastMessage) {
                console.log(message);
                lastMessage = message;  // Speichert die aktuelle Nachricht
            }
        };
    })()
};
