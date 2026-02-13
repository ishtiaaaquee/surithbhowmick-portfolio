/**
 * Navigation Manager Class
 */

class NavigationManager {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.nav = document.querySelector('nav');
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupActiveLinks();
        this.setupNavbarBackground();
    }

    setupMobileMenu() {
        if (this.mobileMenuBtn && this.mobileMenu) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
            
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMobileMenu());
            });
        }
    }

    toggleMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.classList.toggle('hidden');
        }
    }

    closeMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.classList.add('hidden');
        }
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 64;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupActiveLinks() {
        window.addEventListener('scroll', () => {
            let current = '';
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('text-blue-400', 'font-bold');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('text-blue-400', 'font-bold');
                }
            });
        });
    }

    setupNavbarBackground() {
        window.addEventListener('scroll', () => {
            if (this.nav) {
                if (window.scrollY > 50) {
                    this.nav.classList.add('shadow-xl');
                } else {
                    this.nav.classList.remove('shadow-xl');
                }
            }
        });
    }
}
