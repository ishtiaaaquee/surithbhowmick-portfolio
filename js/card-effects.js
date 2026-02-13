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
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add touch support for mobile
            card.addEventListener('touchstart', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            }, { passive: true });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.style.transform = 'translateY(0) scale(1)';
                }, 300);
            }, { passive: true });
        });
    }

    setupTiltEffects() {
        this.cards.forEach(card => {
            let isHovering = false;
            
            card.addEventListener('mouseenter', () => {
                isHovering = true;
            });
            
            card.addEventListener('mouseleave', () => {
                isHovering = false;
                card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
            });
            
            card.addEventListener('mousemove', (e) => {
                if (!isHovering) return;
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                // Use requestAnimationFrame for smoother animation
                requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg) translateY(-8px) scale(1.02)`;
                });
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
