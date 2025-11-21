// GSAP & ScrollTrigger Initialization
gsap.registerPlugin(ScrollTrigger);

// Smooth Scrolling and Active Link Highlight
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Remove active class from all links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to clicked link
        this.classList.add('active');

        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.querySelector('.menu-toggle i').classList.remove('fa-times');
            document.querySelector('.menu-toggle i').classList.add('fa-bars');
        }
    });
});

// Navbar Animation
gsap.to('.navbar', {
    scrollTrigger: {
        trigger: '.navbar',
        start: 'top top',
        toggleClass: 'scrolled',
        scrub: true
    }
});

// Menu Toggle for Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Hero Particle Animation
particlesJS('particle-canvas', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#007bff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        move: { enable: true, speed: 3, direction: 'none', random: true }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 100, duration: 0.4 } }
    }
});

// AOS Initialization
AOS.init({
    duration: 1000,
    once: true
});

// Progress Circles for Skills
document.querySelectorAll('.progress-circle').forEach(circle => {
    const progress = parseInt(circle.getAttribute('data-progress'));
    gsap.to(circle, {
        '--progress': `${progress}%`,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: circle,
            start: 'top 80%'
        }
    });
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    darkModeToggle.querySelector('i').classList.toggle('fa-moon', !isDark);
    darkModeToggle.querySelector('i').classList.toggle('fa-sun', isDark);
});

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    darkModeToggle.querySelector('i').classList.remove('fa-moon');
    darkModeToggle.querySelector('i').classList.add('fa-sun');
}

// Modal for Projects
function openModal(projectId) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');

    switch (projectId) {
        case 'project1':
            modalTitle.textContent = 'Portfolio Website';
            modalDescription.textContent = 'A responsive personal portfolio showcasing my skills and projects with modern UI/UX.';
            modalLink.href = 'https://github.com/Farhankhann56/portfolio';
            break;
        case 'project2':
            modalTitle.textContent = 'E-commerce Platform';
            modalDescription.textContent = 'A frontend e-commerce site with responsive layouts and smooth navigation.';
            modalLink.href = 'https://github.com/Farhankhann56/ecommerce';
            break;
        case 'project3':
            modalTitle.textContent = 'Weather Dashboard';
            modalDescription.textContent = 'A dynamic weather app integrating a public API for real-time data.';
            modalLink.href = 'https://github.com/Farhankhann56/weather-dashboard';
            break;
    }
    modal.style.display = 'block';
    gsap.from('.modal-content', { opacity: 0, y: -50, duration: 0.5 });
}

function closeModal() {
    const modal = document.getElementById('modal');
    gsap.to('.modal-content', {
        opacity: 0,
        y: -50,
        duration: 0.5,
        onComplete: () => modal.style.display = 'none'
    });
}

// Contact Form Validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    if (name && email && message) {
        alert('Message sent successfully! Thank you, ' + name + '.');
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Typing Animation for Hero
function typeWriter(element, texts, speed, delayBetween) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (!isDeleting) {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, delayBetween);
            } else {
                setTimeout(type, speed);
            }
        } else {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, speed);
            } else {
                setTimeout(type, speed / 2);
            }
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.hero h2.typing-text');
    const texts = [
        "Crafting Digital Excellence",
        "Designing Tomorrow’s Web",
        "Solving Real Challenges"
    ];
    typeWriter(typingElement, texts, 80, 1200);
});

// Scroll to Top
function scrollToTop() {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.out' });
}

// Newsletter Form
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
        alert('Thank you for subscribing, ' + email + '!');
        this.reset();
    } else {
        alert('Please enter a valid email.');
    }
});