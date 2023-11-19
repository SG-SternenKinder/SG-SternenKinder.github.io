// footer.js
document.addEventListener('DOMContentLoaded', function () {
    const footerContainer = document.getElementById('footer-container');

    const currentYear = new Date().getFullYear();
    const currentTime = new Date().toLocaleTimeString();

    const footerHtml = `
        <footer>
            <div class="footer-bottom">
                &copy; 2016 - ${currentYear} | Spiele-Gemeinschaft (SG) SternenKinder | Alle Rechte vorbehalten | ${currentTime}
            </div>
        </footer>
    `;

    footerContainer.innerHTML = footerHtml;
});