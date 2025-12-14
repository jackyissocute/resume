// ==================== EMAILJS SETUP ==================== 
// Initialize EmailJS with your public key
// Sign up at https://www.emailjs.com/ to get your credentials
emailjs.init('AnivkGN83wZECdPQf'); // Replace with your EmailJS public key

// ==================== NAVIGATION ==================== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        updateActiveLink(link);
    });
});

// Update active navigation link
function updateActiveLink(clickedLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

// Update active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== CONTACT FORM WITH EMAIL ==================== 
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Prepare email parameters
    const templateParams = {
        name: name,
        email: email,
        message: message,
        to_email: 'jacky_lin_929@yahoo.com' // Your email address
    };

    // Send email using EmailJS
    emailjs.send('service_zd08j2o', 'template_12iq6o5', templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }, function(error) {
            console.log('Failed to send email:', error);
            
            // Show error message
            alert('Failed to send message. Please try again or email me directly at jacky_lin_929@yahoo.com');
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== SMOOTH SCROLL ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== SCROLL ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill tags and experience cards for animation
const animateElements = document.querySelectorAll(
    '.experience-card, .education-card, .skill-category'
);

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// ==================== SKILLS INTERACTION ==================== 
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== EXPERIENCE CARDS INTERACTION ==================== 
const experienceCards = document.querySelectorAll('.experience-card');

experienceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    });
});

// ==================== LOGO SCROLL TO TOP ==================== 
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== DYNAMIC YEAR IN FOOTER ==================== 
const year = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.textContent = `© ${year} Jacky Lin. All rights reserved.`;
}

// ==================== KEYBOARD NAVIGATION ==================== 
document.addEventListener('keydown', (e) => {
    // Skip to content with Ctrl+K
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
    }
});

// ==================== PERFORMANCE: LAZY LOADING ==================== 
// Prefetch resources for better performance
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        console.log('Prefetching resources...');
        // Prefetch external resources if needed
    });
}

// ==================== INITIALIZATION ==================== 
document.addEventListener('DOMContentLoaded', () => {
    console.log('Resume website loaded successfully!');
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Check if EmailJS is initialized
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS library not loaded. Email functionality will not work.');
    }
});

function initSmoothScroll() {
    // Already handled by the scroll event listener above
    console.log('Smooth scrolling initialized');
}