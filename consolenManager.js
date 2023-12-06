// consolenManager.js

// Das Objekt consoleManager
$.consoleManager = {
    // Einstellungen für die Konsolenausgabe
    consoleSettings: {
        enableConsoleOutput: false // Initial ist die Konsolenausgabe deaktiviert
    },

    // Methode zum Setzen der Konsolenausgabe (aktivieren oder deaktivieren)
    setConsoleOutput: function (value) {
        this.consoleSettings.enableConsoleOutput = value;
    },

    // Methode zum Abrufen des aktuellen Status der Konsolenausgabe
    getConsoleOutput: function () {
        return this.consoleSettings.enableConsoleOutput;
    },

    // Methode für die Konsolenausgabe mit Fehlermeldung
    error: function (message) {
        if (this.consoleSettings.enableConsoleOutput) {
            console.error(message);
        }
    }
};