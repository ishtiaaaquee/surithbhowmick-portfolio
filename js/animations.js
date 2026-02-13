/**
 * Base Animation Classes
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
