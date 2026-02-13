// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

// Typing Animation
const typingText = document.querySelector('.typing-text');
const text = 'SURITH BHOWMICK';
let index = 0;

function typeWriter() {
    if (typingText && index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 150);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Close mobile menu when a link is clicked
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 64; // Account for fixed nav height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all scroll-reveal elements
const revealElements = document.querySelectorAll('.scroll-reveal');
revealElements.forEach(el => observer.observe(el));

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-xl');
    } else {
        nav.classList.remove('shadow-xl');
    }
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-400', 'font-bold');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-blue-400', 'font-bold');
        }
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        const parallaxElements = heroSection.querySelectorAll('.stars, .stars2, .stars3');
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Add Hover Effect to Cards
const cards = document.querySelectorAll('.bg-gray-800\\/50');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animate Timeline Items on Scroll
const timelineItems = document.querySelectorAll('#experience .scroll-reveal');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Add Floating Animation to Avatar
const avatar = document.querySelector('.floating');
if (avatar) {
    let floatDirection = 1;
    let currentY = 0;
    
    setInterval(() => {
        currentY += floatDirection * 0.5;
        if (Math.abs(currentY) > 10) {
            floatDirection *= -1;
        }
        avatar.style.transform = `translateY(${currentY}px)`;
    }, 50);
}

// Add Gradient Animation to Hero Text
const heroText = document.querySelector('#home h1 span');
if (heroText) {
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        // Gradient animation is handled by CSS, this is for additional effects
    }, 50);
}

// Particle Effect on Mouse Move (subtle)
let particles = [];
const particleCount = 20;

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) { // Only create particles occasionally
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Skill Cards Animation on Hover
const skillCards = document.querySelectorAll('#skills .bg-gray-800\\/50');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.fa');
        if (icon) {
            icon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)';
            }, 600);
        }
    });
});

// Counter Animation for Statistics (if you want to add any)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Add Ripple Effect on Button Click
const buttons = document.querySelectorAll('a[href^="#"]');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Progressive Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add Tilt Effect to Cards (subtle 3D effect)
const tiltCards = document.querySelectorAll('.bg-gray-800\\/50');
tiltCards.forEach(card => {
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

// Lazy Loading for Images (if you add any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add Cursor Trail Effect (optional - can be disabled if too much)
try {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');

    if (circles.length === 0) {
        // Create cursor circles if they don't exist
        for (let i = 0; i < 3; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            document.body.appendChild(circle);
        }
    }

    const cursorCircles = document.querySelectorAll('.cursor-circle');

    if (cursorCircles.length > 0) {
        document.addEventListener('mousemove', (e) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
        });

        cursorCircles.forEach((circle, index) => {
            circle.x = 0;
            circle.y = 0;
            circle.style.backgroundColor = `hsla(${index * 60}, 70%, 50%, 0.1)`;
        });

        function animateCursor() {
            let x = coords.x;
            let y = coords.y;
            
            cursorCircles.forEach((circle, index) => {
                if (circle) {
                    circle.style.left = x - 12 + 'px';
                    circle.style.top = y - 12 + 'px';
                    circle.style.transform = `scale(${(cursorCircles.length - index) / cursorCircles.length})`;
                    
                    circle.x = x;
                    circle.y = y;
                    
                    const nextCircle = cursorCircles[index + 1] || cursorCircles[0];
                    x += (nextCircle.x - x) * 0.3;
                    y += (nextCircle.y - y) * 0.3;
                }
            });
            
            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }
} catch (error) {
    // Silently fail if cursor animation doesn't work
}

// Console Easter Egg
console.log('%c👋 Hello! Welcome to my portfolio!', 'font-size: 20px; color: #60a5fa; font-weight: bold;');
console.log('%cLooking for a developer? Let\'s connect!', 'font-size: 14px; color: #a78bfa;');
console.log('%c📧 surithb@gmail.com', 'font-size: 12px; color: #34d399;');

// Close DOMContentLoaded event listener
});