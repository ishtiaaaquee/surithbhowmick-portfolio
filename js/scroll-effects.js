/**
 * Scroll Effects Managers
 */

// Scroll Reveal Manager Class
class ScrollRevealManager {
    constructor(options = {}) {
        this.options = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px 0px -100px 0px'
        };
        this.observer = null;
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.options);

        this.observeElements();
    }

    observeElements() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        revealElements.forEach(el => this.observer.observe(el));
    }
}

// Parallax Effect Manager Class
class ParallaxManager {
    constructor() {
        this.heroSection = document.querySelector('#home');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateParallax());
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        if (this.heroSection) {
            const parallaxElements = this.heroSection.querySelectorAll('.gradient-blob');
            
            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
                parallaxElements.forEach((element, index) => {
                    const speed = (index + 1) * 0.15;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });
        }
    }
}

// Timeline Animation Manager Class
class TimelineAnimationManager {
    constructor() {
        this.timelineItems = document.querySelectorAll('#experience .scroll-reveal');
        this.init();
    }

    init() {
        this.timelineItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
        });
    }
}
