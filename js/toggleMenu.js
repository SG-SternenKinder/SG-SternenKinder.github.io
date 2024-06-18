// jQuery, um das Menü ein- und auszublenden
$(document).ready(function() {
    $('.menu-toggle').click(function() {
        try {
            $('.navbar').toggleClass('active');
            var ariaExpanded = $('.navbar').hasClass('active') ? 'true' : 'false';
            $('.menu-toggle').attr('aria-expanded', ariaExpanded);
            
            // Konsolenausgabe
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Menü wurde geklickt');
            }
        } catch (error) {
            // Fehlerbehandlung
            if ($.consoleManager.getConsoleOutput()) {
                $.consoleManager.error('Fehler beim Umschalten des Menüs: ' + error.message);
            }
        }
    });
});
