/**
 * Visual Effects Managers
 */

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
