function toggleMenu() {
    var navbar = document.querySelector('.navbar');
    var menuToggle = document.querySelector('.menu-toggle');
    
    if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    } else {
        navbar.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
    }
}
