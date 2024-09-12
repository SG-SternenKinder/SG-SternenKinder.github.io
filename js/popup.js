// popup.js
$(document).ready(function () {
    function createPopup(id, content) {
        const popup = $('<div class="popup-container"></div>').attr('id', id).html(content).appendTo('body');
        return popup;
    }

    function removePopup(id) {
        $(`#${id}`).remove();
    }

    function loadPopupTexts(callback) {
        $.getJSON('json/popup.json', function(data) { // Pfad anpassen
            callback(data);
        });
    }

    function createPopupContent(type, data) {
        let content = '';
        switch(type) {
            case 'cookiePopup':
                content = `
                    <div class="popup-content">
                        <h2>${data.title}</h2>
                        ${data.paragraphs.map(p => `<p>${p}</p>`).join('')}
                        <br>
                        <div class="mitte-container">
                            ${data.links.map(link => `<a href="${link.href}" target="_self">${link.text}</a>`).join(' ')}
                        </div>
                        <button id="accept-cookies">${data.buttons.accept}</button>
                        <button id="close-cookies">${data.buttons.reject}</button>
                    </div>
                `;
                break;
            case 'acceptedPopup':
                content = `
                    <div class="popup-content">
                        <h2>${data.title}</h2>
                        <p>${data.paragraph}</p>
                        <button id="close-accepted-popup">${data.button}</button>
                    </div>
                `;
                break;
            case 'rejectedPopup':
                content = `
                    <div class="popup-content">
                        <h2>${data.title}</h2>
                        <p>${data.paragraph}</p>
                        <button id="close-rejected-popup">${data.button}</button>
                    </div>
                `;
                break;
            case 'offlinePopup':
                content = `
                    <div class="popup-content">
                        <h2>${data.title}</h2>
                        <p>${data.paragraph}</p>
                        <button id="close-offline-popup">${data.button}</button>
                    </div>
                `;
                break;
        }
        return content;
    }

    loadPopupTexts(function(data) {
        const popupContent = createPopupContent('cookiePopup', data.cookiePopup);
        const acceptedPopupContent = createPopupContent('acceptedPopup', data.acceptedPopup);
        const rejectedPopupContent = createPopupContent('rejectedPopup', data.rejectedPopup);
        const offlinePopupContent = createPopupContent('offlinePopup', data.offlinePopup);

        const p = createPopup('popup', popupContent);
        const ap = createPopup('accepted-popup', acceptedPopupContent);
        const rp = createPopup('rejected-popup', rejectedPopupContent);

        // Popup-Initialisierung
        const ps = sessionStorage.getItem('popupShown');
        logToConsole('Popup wurde bereits angezeigt:', ps);

        const ac = $.CookieUtil.getCookie('cookiesAccepted');
        logToConsole('Cookies wurden akzeptiert:', ac);

        const rc = $.CookieUtil.getCookie('cookiesRejected');
        logToConsole('Cookies wurden abgelehnt:', rc);

        if (!ps && !ac && !rc && navigator.onLine) {
            logToConsole('Popup wird angezeigt.');
            p.css('display', 'flex');

            $('#accept-cookies').on('click', function () {
                $.CookieUtil.setCookie('cookiesAccepted', 'true', 4);
                p.remove();
                ap.css('display', 'flex');
                logToConsole('Cookies wurden akzeptiert.');
            });

            $('#close-cookies').on('click', function () {
                sessionStorage.setItem('popupShown', 'true');
                p.remove();
                sessionStorage.setItem('cookiesRejected', 'true');
                rp.css('display', 'flex');
                logToConsole('Cookies wurden abgelehnt.');
            });

            $('#close-accepted-popup').on('click', function () {
                ap.remove();
                logToConsole('Akzeptieren-Popup wurde geschlossen.');
            });

            $('#close-rejected-popup').on('click', function () {
                rp.remove();
                logToConsole('Abgelehnt-Popup wurde geschlossen.');
            });
        } else {
            logToConsole('Popup wird nicht angezeigt.');
        }

        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data === 'showOfflinePopup') {
                const op = createPopup('offline-popup', offlinePopupContent);
                op.css('display', 'flex');
                logToConsole('Offline-Popup wird angezeigt.');

                $('#close-offline-popup').on('click', function () {
                    op.remove();
                    logToConsole('Offline-Popup wurde geschlossen.');
                });
            }
        });

        function logToConsole(message) {
            if (typeof $.consoleManager !== 'undefined' && $.consoleManager.getConsoleOutput()) {
                console.log(message);
            }
        }
    });
});
