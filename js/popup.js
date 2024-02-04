// popup.js
$(document).ready(function () {
    const p = $('#popup');
    const a = $('#accept-cookies');
    const c = $('#close-cookies');
    const ap = $('#accepted-popup');
    const rp = $('#rejected-popup');
    const capb = $('#close-accepted-popup');
    const crpb = $('#close-rejected-popup');

    // Überprüfen, ob das Popup bereits angezeigt wurde
    const ps = sessionStorage.getItem('popupShown');
    if ($.consoleManager.getConsoleOutput()) {
        console.log('Popup wurde bereits angezeigt:', ps);
    }

    // Überprüfe, ob Cookies akzeptiert wurden
    const ac = $.CookieUtil.getCookie('cookiesAccepted');
    if ($.consoleManager.getConsoleOutput()) {
        console.log('Cookies wurden akzeptiert:', ac);
    }

    // Überprüfe, ob Cookies abgelehnt wurden
    const rc = $.CookieUtil.getCookie('cookiesRejected');
    if ($.consoleManager.getConsoleOutput()) {
        console.log('Cookies wurden abgelehnt:', rc);
    }

    // Entscheidung des Benutzers überprüfen und Popup entsprechend anzeigen
    if (!ps && !ac && !rc && navigator.onLine) {
        if ($.consoleManager.getConsoleOutput()) {
            console.log('Popup wird angezeigt.');
        }

        p.css('display', 'flex');

        a.on('click', function () {
            $.CookieUtil.setCookie('cookiesAccepted', 'true', 4);
            p.css('display', 'none');
            ap.css('display', 'flex');
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Cookies wurden akzeptiert.');
            }
        });

        c.on('click', function () {
            // Markiere das Popup als angezeigt in der Session-Speicherung
            sessionStorage.setItem('popupShown', 'true');
            p.css('display', 'none');

            // Setze ein Session-Cookie für die Ablehnung von Cookies
            sessionStorage.setItem('cookiesRejected', 'true');
            rp.css('display', 'flex');
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Cookies wurden abgelehnt.');
            }
        });

        capb.on('click', function () {
            // Akzeptieren-Popup schließen
            ap.css('display', 'none');
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Akzeptieren-Popup wurde geschlossen.');
            }
        });

        crpb.on('click', function () {
            // Abgelehnt-Popup schließen
            rp.css('display', 'none');
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Abgelehnt-Popup wurde geschlossen.');
            }
        });
    } else {
        if ($.consoleManager.getConsoleOutput()) {
            console.log('Popup wird nicht angezeigt.');
        }
    }

    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data === 'showOfflinePopup') {
            // Show the offline popup
            const op = $('#offline-popup');
            op.css('display', 'flex');
            if ($.consoleManager.getConsoleOutput()) {
                console.log('Offline-Popup wird angezeigt.');
            }
        }
    });
});