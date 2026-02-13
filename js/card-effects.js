/**
 * Card Effects Managers
 */

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
