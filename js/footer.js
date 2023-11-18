// footer.js
document.addEventListener('DOMContentLoaded', function () {
    const footerContainer = document.getElementById('footer-container');

    const currentYear = new Date().getFullYear();

    const footerHtml = `
        <footer>
            <div class="footer-bottom">
                &copy; 2023 - ${currentYear} SG SternenKinder | Alle Rechte vorbehalten
            </div>
        </footer>
    `;

    footerContainer.innerHTML = footerHtml;
});