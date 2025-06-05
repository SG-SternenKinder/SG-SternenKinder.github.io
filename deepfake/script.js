// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Mobile Menu Toggle
    // ======================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            const isOpen = navLinks.style.display === 'flex';
            navLinks.style.display = isOpen ? 'none' : 'flex';
            
            // Add ARIA attributes for accessibility
            menuToggle.setAttribute('aria-expanded', !isOpen);
            navLinks.setAttribute('aria-hidden', isOpen);
        });
        
        // Close menu when clicking on a link (for mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navLinks.setAttribute('aria-hidden', 'true');
                }
            });
        });
    }

    // ======================
    // Dark/Light Mode Toggle
    // ======================
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌙';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    darkModeToggle.setAttribute('title', 'Toggle dark/light mode');
    
    Object.assign(darkModeToggle.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '1000',
        background: 'var(--discord-blurple)',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        color: 'white',
        cursor: 'pointer',
        transition: 'transform 0.3s ease'
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        enableLightMode();
    }

    darkModeToggle.addEventListener('click', toggleTheme);
    darkModeToggle.addEventListener('mouseenter', () => {
        darkModeToggle.style.transform = 'scale(1.1)';
    });
    darkModeToggle.addEventListener('mouseleave', () => {
        darkModeToggle.style.transform = 'scale(1)';
    });

    document.body.appendChild(darkModeToggle);

    function toggleTheme() {
        if (document.body.classList.contains('light-mode')) {
            disableLightMode();
        } else {
            enableLightMode();
        }
    }

    function enableLightMode() {
        document.body.classList.add('light-mode');
        document.body.style.backgroundColor = '#f6f6f6';
        document.body.style.color = '#2e3338';
        darkModeToggle.textContent = '🌞';
        localStorage.setItem('theme', 'light');
    }

    function disableLightMode() {
        document.body.classList.remove('light-mode');
        document.body.style.backgroundColor = '#36393f';
        document.body.style.color = 'white';
        darkModeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }

    // ======================
    // Scroll Animations
    // ======================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        // Run once on page load
        checkScroll();
        
        // Then on scroll
        window.addEventListener('scroll', checkScroll);
        
        // And on resize (in case layout changes)
        window.addEventListener('resize', checkScroll);
    }

    function checkScroll() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.8; // 80% from top
        
        fadeElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerPoint) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    // ======================
    // Particle Animation
    // ======================
    const particlesContainer = document.querySelector('.particles');
    
    if (particlesContainer) {
        // Clear any existing particles
        particlesContainer.innerHTML = '';
        
        // Create particles based on screen size
        const particleCount = Math.floor(window.innerWidth * window.innerHeight / 2000);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            Object.assign(particle.style, {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.5 + 0.3,
                animationDuration: `${Math.random() * 15 + 5}s`,
                animationDelay: `${Math.random() * 5}s`
            });
            
            particlesContainer.appendChild(particle);
        }
        
        // Recreate particles on resize (with debounce)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (particlesContainer) {
                    particlesContainer.innerHTML = '';
                    const newParticleCount = Math.floor(window.innerWidth * window.innerHeight / 2000);
                    for (let i = 0; i < newParticleCount; i++) {
                        // Same particle creation code as above
                    }
                }
            }, 200);
        });
    }

    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});