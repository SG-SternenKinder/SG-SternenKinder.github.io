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
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation =
                    `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
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
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
    });

    // Initialisierung des focus-visible Polyfills
    if (typeof window.applyFocusVisiblePolyfill === 'function') {
        window.applyFocusVisiblePolyfill();
    }

    // Easter Egg (Konami-Code)
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];
    let konamiInput = [];

    document.addEventListener('keydown', (e) => {
        konamiInput.push(e.key);
        
        // Keep array at correct length
        if (konamiInput.length > konamiCode.length) {
            konamiInput.shift();
        }
        
        // Check match
        if (konamiInput.join('') === konamiCode.join('')) {
            document.body.classList.add('konami');
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
        langSwitcher?.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') !== 'true';
            this.setAttribute('aria-expanded', isExpanded);
        });

        // Sprachauswahl
        langDropdown?.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', function(e) {
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

        // Features - mit sicherer Überprüfung
        const features = document.querySelectorAll('.feature-card');
        if (features.length > 0) {
            const feature1Title = features[0].querySelector('h3');
            const feature1Text = features[0].querySelector('p');
            if (feature1Title) feature1Title.textContent = t.feature1_title;
            if (feature1Text) feature1Text.textContent = t.feature1_text;
        }
        if (features.length > 1) {
            const feature2Title = features[1].querySelector('h3');
            const feature2Text = features[1].querySelector('p');
            if (feature2Title) feature2Title.textContent = t.feature2_title;
            if (feature2Text) feature2Text.textContent = t.feature2_text;
        }
        if (features.length > 2) {
            const feature3Title = features[2].querySelector('h3');
            const feature3Text = features[2].querySelector('p');
            if (feature3Title) feature3Title.textContent = t.feature3_title;
            if (feature3Text) feature3Text.textContent = t.feature3_text;
        }

        // UI aktualisieren
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