/**
 * Main Portfolio Application Class
 * Author: Surith Bhowmick
 */

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
