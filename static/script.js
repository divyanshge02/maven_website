// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        navContainer.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        navContainer.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
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

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Form validation for contact form
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('btn-secondary')) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate {
        animation: fadeInUp 0.8s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-card,
    .service-card {
        animation: fadeInUp 0.6s ease-out;
    }
    
    .feature-card:nth-child(1) { animation-delay: 0.1s; }
    .feature-card:nth-child(2) { animation-delay: 0.2s; }
    .feature-card:nth-child(3) { animation-delay: 0.3s; }
    .feature-card:nth-child(4) { animation-delay: 0.4s; }
    
    .service-card:nth-child(1) { animation-delay: 0.1s; }
    .service-card:nth-child(2) { animation-delay: 0.2s; }
    .service-card:nth-child(3) { animation-delay: 0.3s; }
`;
document.head.appendChild(style);

// Banner Slider Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-play slider
function autoPlay() {
    changeSlide(1);
}

// Start auto-play when page loads
let slideInterval = setInterval(autoPlay, 5000);

// Pause auto-play on hover
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(autoPlay, 5000);
    });
}

// Scroll effect for navigation
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    const logoImg = document.querySelector('.logo-img');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navContainer.classList.add('scrolled');
        logoImg.classList.add('scrolled');
        navMenu.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        navContainer.classList.remove('scrolled');
        logoImg.classList.remove('scrolled');
        navMenu.classList.remove('scrolled');
    }
});

// Contact form service selection handler
document.addEventListener('DOMContentLoaded', function() {
    const serviceSelect = document.getElementById('service');
    const jobFields = document.getElementById('jobFields');
    const businessFields = document.getElementById('businessFields');
    const qualificationSelect = document.getElementById('qualification');
    const experienceSelect = document.getElementById('experience');
    const locationInput = document.getElementById('location');
    const resumeInput = document.getElementById('resume');
    const emailInput = document.getElementById('email');
    const businessLocationInput = document.getElementById('businessLocation');
    
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            if (this.value === 'Staff Recruitment') {
                // Show job-specific fields
                jobFields.style.display = 'block';
                businessFields.style.display = 'none';
                
                // Make job-specific fields required
                qualificationSelect.required = true;
                experienceSelect.required = true;
                locationInput.required = true;
                
                // Remove required from business fields
                emailInput.required = false;
                businessLocationInput.required = false;
                
                // Resume upload is optional
                resumeInput.required = false;
                
                // Clear business fields
                emailInput.value = '';
                businessLocationInput.value = '';
            } else if (this.value !== '') {
                // Show business fields for non-staff recruitment services
                businessFields.style.display = 'block';
                jobFields.style.display = 'none';
                
                // Make business fields required
                emailInput.required = true;
                businessLocationInput.required = true;
                
                // Remove required from job-specific fields
                qualificationSelect.required = false;
                experienceSelect.required = false;
                locationInput.required = false;
                resumeInput.required = false;
                
                // Clear job-specific fields
                qualificationSelect.value = '';
                experienceSelect.value = '';
                locationInput.value = '';
                resumeInput.value = '';
            } else {
                // Hide all conditional fields when no service is selected
                jobFields.style.display = 'none';
                businessFields.style.display = 'none';
                
                // Remove required from all conditional fields
                qualificationSelect.required = false;
                experienceSelect.required = false;
                locationInput.required = false;
                resumeInput.required = false;
                emailInput.required = false;
                businessLocationInput.required = false;
                
                // Clear all conditional fields
                qualificationSelect.value = '';
                experienceSelect.value = '';
                locationInput.value = '';
                resumeInput.value = '';
                emailInput.value = '';
                businessLocationInput.value = '';
            }
        });
    }
});

// Testimonials Slider Functionality
let currentTestimonialIndex = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');

function showTestimonial(index) {
    // Hide all testimonial slides
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    // Show current testimonial slide
    if (testimonialSlides[index]) {
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
    }
}

function changeTestimonial(direction) {
    currentTestimonialIndex += direction;
    
    if (currentTestimonialIndex >= testimonialSlides.length) {
        currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonialSlides.length - 1;
    }
    
    showTestimonial(currentTestimonialIndex);
}

function currentTestimonial(index) {
    currentTestimonialIndex = index - 1;
    showTestimonial(currentTestimonialIndex);
}

// Auto-play testimonials
function autoPlayTestimonials() {
    changeTestimonial(1);
}

// Start auto-play when page loads
let testimonialInterval = setInterval(autoPlayTestimonials, 5000);

// Pause auto-play on hover
const testimonialsSlider = document.querySelector('.testimonials-slider');
if (testimonialsSlider) {
    testimonialsSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialsSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(autoPlayTestimonials, 5000);
    });
} 