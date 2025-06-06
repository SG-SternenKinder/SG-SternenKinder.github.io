document.addEventListener('DOMContentLoaded', async function () {
    // 1. Partikel-Animation
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        const particleCount = Math.min(
            Math.floor(window.innerWidth * window.innerHeight / 4000),
            100
        );

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 2 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.4 + 0.2;
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
            particlesContainer.appendChild(particle);
        }
    }

    // 2. Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (menuToggle && mobileMenu && menuOverlay) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        menuOverlay.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // 3. Scroll-Animationen
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {                                   //(entry, index)
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');                 //entry.target.style.animation =
                //`fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // 4. Focus Management
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('mousedown', function () {
            this.classList.add('using-mouse');
        });

        element.addEventListener('keydown', function () {
            this.classList.remove('using-mouse');
        });

        element.addEventListener('focus', function () {
            if (this.classList.contains('using-mouse')) {
                this.blur();
            }
        });
    });

    // 5. Responsive Handling
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768 && mobileMenu) {
                mobileMenu.classList.remove('active');
                if (menuOverlay) menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 100);
    });

    // 6. Lazy Loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imgObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imgObserver.observe(img));

    // Easter Egg (Konami-Code)
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'];
    let konamiInput = [];
    let konamiTimeout = null;
    let strobeAnimation = null;

    // Mega-Confetti-Funktion (300 Partikel)
    function fireMegaConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00',
            '#ff00ff', '#00ffff', '#ff9900'];

        // Confetti von beiden Seiten
        for (let i = 0; i < 150; i++) {
            setTimeout(() => createConfetti('left', colors), i * 20);
            setTimeout(() => createConfetti('right', colors), i * 20);
        }
    }

    function createConfetti(origin, colors) {
        const confetti = document.createElement('div');
        confetti.className = 'konfetti-particle';

        // Dynamische Formen
        confetti.style.setProperty('--is-round', Math.random() > 0.5 ? 1 : 0);
        confetti.style.setProperty('--is-triangle', Math.random() > 0.8 ? 1 : 0);
        confetti.style.setProperty('--rotation', Math.random() * 360);

        // Visuelle Eigenschaften
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = confetti.style.width;
        confetti.style.left = origin === 'left' ? '-10px' : `${window.innerWidth + 10}px`;
        confetti.style.bottom = '-10px';

        document.body.appendChild(confetti);

        // Animation
        const animation = confetti.animate([
            {
                transform: `translateX(${origin === 'left' ? '0' : '-100vw'}) 
                  translateY(0) 
                  rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translateX(${origin === 'left'
                    ? Math.random() * window.innerWidth
                    : -(Math.random() * window.innerWidth)}px) 
                  translateY(-${window.innerHeight + 100}px) 
                  rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: 2000 + Math.random() * 3000,
            easing: 'cubic-bezier(0.1,0.8,0.3,1)'
        });

        animation.onfinish = () => confetti.remove();
    }

    // Stroboskop-Effekt
    function startStrobe() {
        const strobo = document.createElement('div');
        strobo.className = 'strobo-light';
        document.body.appendChild(strobo);

        return strobo.animate(
            [
                { opacity: 0 },
                { opacity: 0.7 },
                { opacity: 0 }
            ],
            {
                duration: 100,
                iterations: 100
            }
        );
    }

    // Event Listener für Konami-Code
    document.addEventListener('keydown', (e) => {
        konamiInput.push(e.key);
        if (konamiInput.length > konamiCode.length) {
            konamiInput.shift();
        }

        if (konamiInput.join('') === konamiCode.join('')) {
            // Effekte aktivieren
            document.body.classList.add('konami-party');
            fireMegaConfetti();
            strobeAnimation = startStrobe();

            // Notification erstellen
            const feedback = document.createElement('div');
            feedback.className = 'konami-notification';
            feedback.innerHTML = '🎉 PARTY MODUS AKTIVIERT! 🎊';
            document.body.appendChild(feedback);

            // Zurücksetzen nach 10 Sekunden
            clearTimeout(konamiTimeout);
            konamiTimeout = setTimeout(() => {
                document.body.classList.remove('konami-party');
                if (strobeAnimation) strobeAnimation.cancel();
                document.body.style.backgroundColor = '';
                feedback.remove();
            }, 12000);

            konamiInput = [];
        }
    });

    // Sprachumschalter und Übersetzungen
    const LANG_NAMES = { de: 'Deutsch', en: 'English', fr: 'Français' };
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    try {
        const translations = await loadTranslations();
        initLanguageSwitcher(translations);
    } catch (error) {
        console.error('Fehler beim Laden der Übersetzungen:', error);
    }

    async function loadTranslations() {
        const response = await fetch('translations.json');
        if (!response.ok) throw new Error('Übersetzungen konnten nicht geladen werden');
        return await response.json();
    }

    function initLanguageSwitcher(translations) {
        const langSwitcher = document.querySelector('.language-switcher');
        const langDropdown = document.querySelector('.language-dropdown');
        const savedLang = localStorage.getItem('preferredLanguage') || 'de';

        applyTranslations(savedLang);

        // Dropdown-Toggle
        langSwitcher?.addEventListener('click', function (e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') !== 'true';
            this.setAttribute('aria-expanded', isExpanded);
        });

        // Sprachauswahl
        langDropdown?.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const lang = this.dataset.lang;
                applyTranslations(lang);
                langSwitcher?.setAttribute('aria-expanded', 'false');
            });
        });

        // Schließen bei Klick außerhalb
        document.addEventListener('click', () => {
            langSwitcher?.setAttribute('aria-expanded', 'false');
        });

        // Schließen bei ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                langSwitcher?.setAttribute('aria-expanded', 'false');
            }
        });

        function applyTranslations(lang) {
            const t = translations[lang];
            if (!t) return;

            // Hero Section
            document.querySelector('.hero-content h1').innerHTML = t.hero_title;
            document.querySelector('.hero-content p').textContent = t.hero_text;
            document.querySelector('.download-btn').innerHTML = `<i class="fas fa-download"></i> ${t.download_btn}`;
            document.querySelector('.open-in-browser-btn').innerHTML = `<i class="fas fa-globe"></i> ${t.browser_btn}`;

            // Features
            const features = document.querySelectorAll('.feature-card');
            features.forEach((feature, index) => {
                const title = feature.querySelector('h3');
                const text = feature.querySelector('p');
                if (title) title.textContent = t[`feature${index + 1}_title`];
                if (text) text.textContent = t[`feature${index + 1}_text`];
            });

            // Navbar & Mobile Menu
            const navItems = [
                { icon: 'download', key: 'nav_download' },
                { icon: 'bolt', key: 'nav_nitro' },
                { icon: 'compass', key: 'nav_discover' },
                { icon: 'shield-alt', key: 'nav_safety' },
                { icon: 'question-circle', key: 'nav_support' },
                { icon: 'blog', key: 'nav_blog' },
                { icon: 'briefcase', key: 'nav_careers' }
            ];

            navItems.forEach((item, i) => {
                // Desktop Nav
                const desktopLink = document.querySelectorAll('.nav-links a')[i];
                if (desktopLink) {
                    desktopLink.innerHTML = `<i class="fas fa-${item.icon}"></i> ${t[item.key]}`;
                }

                // Mobile Nav
                const mobileLink = document.querySelectorAll('.mobile-menu .nav-links a')[i];
                if (mobileLink) {
                    mobileLink.innerHTML = `<i class="fas fa-${item.icon}"></i> ${t[item.key]}`;
                }
            });

            // Footer
            const footerItems = [
                {
                    title: 'footer_product_title',
                    links: [
                        'footer_download',
                        'footer_nitro',
                        'footer_status'
                    ]
                },
                {
                    title: 'footer_company_title',
                    links: [
                        'footer_uber_uns',
                        'footer_jobs',
                        'footer_marke'
                    ]
                },
                {
                    title: 'footer_resources_title',
                    links: [
                        'footer_hochschule',
                        'footer_support',
                        'footer_sicherheit'
                    ]
                },
                {
                    title: 'footer_legal_title',
                    links: [
                        'footer_datenschutz',
                        'footer_nutzungsbedingungen',
                        'footer_cookie_einstellungen'
                    ]
                }
            ];

            footerItems.forEach((column, i) => {
                const footerColumn = document.querySelectorAll('.footer-column')[i];
                if (footerColumn) {
                    // Titel setzen
                    const title = footerColumn.querySelector('h3');
                    if (title) {
                        title.innerHTML = t[column.title];
                    }

                    // Links setzen
                    const links = footerColumn.querySelectorAll('a');
                    column.links.forEach((linkKey, j) => {
                        if (links[j] && t[linkKey]) {
                            links[j].innerHTML = t[linkKey];
                        }
                    });
                }
            });

            // Sprache in UI aktualisieren
            const currentLangElement = document.querySelector('.current-language');
            if (currentLangElement) {
                currentLangElement.textContent = LANG_NAMES[lang] || lang;
            }

            document.documentElement.lang = lang;
            localStorage.setItem('preferredLanguage', lang);
        }
    }

    // Theme-Wechsler
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Initiales Theme setzen
        const currentTheme = localStorage.getItem('theme') ||
            (prefersDark.matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', currentTheme);

        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
        });

        prefersDark.addListener(e => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }
});