/**
 * Portfolio Website - Object-Oriented Architecture
 * Author: Surith Bhowmick
 */

// Base Animation Class
class Animation {
    constructor() {
        this.animationFrame = null;
    }

    start() {
        throw new Error('start() must be implemented');
    }

    stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Typing Animation Class
class TypingAnimation extends Animation {
    constructor(element, text, speed = 150) {
        super();
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    start() {
        if (!this.element) return;
        this.typeWriter();
    }

    typeWriter() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.typeWriter(), this.speed);
        }
    }

    reset() {
        this.index = 0;
        if (this.element) {
            this.element.textContent = '';
        }
    }
}

// Navigation Manager Class
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
            const parallaxElements = this.heroSection.querySelectorAll('.stars, .stars2, .stars3');
            parallaxElements.forEach((element, index) => {
                const speed = (index + 1) * 0.3;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    }
}

// Card Effects Manager Class
class CardEffectsManager {
    constructor() {
        this.cards = document.querySelectorAll('.bg-gray-800\\/50');
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupTiltEffects();
    }

    setupHoverEffects() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    setupTiltEffects() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                card.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
            });
        });
    }
}

// Particle Effect Manager Class
class ParticleEffectManager {
    constructor() {
        this.particles = [];
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.95) {
                this.createParticle(e.clientX, e.clientY);
            }
        });
    }

    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Floating Animation Manager Class
class FloatingAnimationManager {
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.floatDirection = 1;
        this.currentY = 0;
        this.intervalId = null;
        this.init();
    }

    init() {
        if (this.element) {
            this.start();
        }
    }

    start() {
        this.intervalId = setInterval(() => {
            this.currentY += this.floatDirection * 0.5;
            if (Math.abs(this.currentY) > 10) {
                this.floatDirection *= -1;
            }
            this.element.style.transform = `translateY(${this.currentY}px)`;
        }, 50);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

// Icon Animation Manager Class
class IconAnimationManager {
    constructor() {
        this.skillCards = document.querySelectorAll('#skills .bg-gray-800\\/50');
        this.init();
    }

    init() {
        this.skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.fa');
                if (icon) {
                    icon.style.transform = 'rotate(360deg)';
                    setTimeout(() => {
                        icon.style.transform = 'rotate(0deg)';
                    }, 600);
                }
            });
        });
    }
}

// Ripple Effect Manager Class
class RippleEffectManager {
    constructor() {
        this.buttons = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        element.appendChild(ripple);
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Cursor Trail Manager Class
class CursorTrailManager {
    constructor() {
        this.coords = { x: 0, y: 0 };
        this.circles = [];
        this.init();
    }

    init() {
        try {
            this.createCircles();
            this.setupEventListeners();
            this.animate();
        } catch (error) {
            console.error('Cursor trail initialization failed:', error);
        }
    }

    createCircles() {
        for (let i = 0; i < 3; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            circle.x = 0;
            circle.y = 0;
            circle.style.backgroundColor = `hsla(${i * 60}, 70%, 50%, 0.1)`;
            document.body.appendChild(circle);
            this.circles.push(circle);
        }
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.coords.x = e.clientX;
            this.coords.y = e.clientY;
        });
    }

    animate() {
        let x = this.coords.x;
        let y = this.coords.y;
        
        this.circles.forEach((circle, index) => {
            if (circle) {
                circle.style.left = x - 12 + 'px';
                circle.style.top = y - 12 + 'px';
                circle.style.transform = `scale(${(this.circles.length - index) / this.circles.length})`;
                
                circle.x = x;
                circle.y = y;
                
                const nextCircle = this.circles[index + 1] || this.circles[0];
                x += (nextCircle.x - x) * 0.3;
                y += (nextCircle.y - y) * 0.3;
            }
        });
        
        requestAnimationFrame(() => this.animate());
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

// Main Portfolio Application Class
class PortfolioApp {
    constructor() {
        this.managers = {};
        this.animations = {};
    }

    init() {
        // Initialize all managers
        this.managers.navigation = new NavigationManager();
        this.managers.scrollReveal = new ScrollRevealManager();
        this.managers.parallax = new ParallaxManager();
        this.managers.cardEffects = new CardEffectsManager();
        this.managers.particleEffect = new ParticleEffectManager();
        this.managers.iconAnimation = new IconAnimationManager();
        this.managers.rippleEffect = new RippleEffectManager();
        this.managers.timeline = new TimelineAnimationManager();

        // Initialize animations
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            this.animations.typing = new TypingAnimation(typingElement, 'SURITH BHOWMICK', 150);
            window.addEventListener('load', () => {
                setTimeout(() => this.animations.typing.start(), 500);
            });
        }

        this.animations.floating = new FloatingAnimationManager('.floating');

        // Initialize cursor trail only on desktop
        if (window.innerWidth > 768) {
            this.managers.cursorTrail = new CursorTrailManager();
        }

        // Setup page loaded state
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });

        // Console greeting
        this.displayConsoleGreeting();
    }

    displayConsoleGreeting() {
        console.log('%c👋 Hello! Welcome to my portfolio!', 'font-size: 20px; color: #60a5fa; font-weight: bold;');
        console.log('%cLooking for a developer? Let\'s connect!', 'font-size: 14px; color: #a78bfa;');
        console.log('%c📧 surithb@gmail.com', 'font-size: 12px; color: #34d399;');
    }

    destroy() {
        // Cleanup method to remove event listeners and stop animations
        Object.values(this.animations).forEach(animation => {
            if (animation.stop) animation.stop();
        });
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.init();
    
    // Make app instance available globally for debugging
    window.portfolioApp = app;
});