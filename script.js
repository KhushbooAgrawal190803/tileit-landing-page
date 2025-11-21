// Smooth scroll to How It Works section
function scrollToDemo() {
    const section = document.getElementById('how-it-works');
    section.scrollIntoView({ behavior: 'smooth' });
}

// Open Buy Now Form Modal
function openBuyNowForm() {
    const modal = document.getElementById('buyNowModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close Buy Now Form Modal
function closeBuyNowForm() {
    const modal = document.getElementById('buyNowModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Handle Buy Now Form Submission
function handleBuyNow(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form values
    const email = document.getElementById('email').value;
    const zipcode = document.getElementById('zipcode').value;
    const marketing = document.getElementById('marketing').checked;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Validate zipcode
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(zipcode)) {
        alert('Please enter a valid 5-digit ZIP code');
        return;
    }
    
    // Submit form data to Netlify in the background
    const form = document.getElementById('buyNowForm');
    const formData = new FormData(form);
    
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => {
        console.log('Form submitted to Netlify successfully');
    })
    .catch((error) => {
        console.error('Form submission error:', error);
    });
    
    // Close the form modal
    closeBuyNowForm();
    
    // Show area not available popup
    setTimeout(() => {
        showAreaPopup();
    }, 300);
}

// Show Area Not Available Popup
function showAreaPopup() {
    const popup = document.getElementById('areaPopup');
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close Area Not Available Popup
function closeAreaPopup() {
    const popup = document.getElementById('areaPopup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Reset form
    document.getElementById('buyNowForm').reset();
}

// Close modals when clicking outside
window.onclick = function(event) {
    const buyNowModal = document.getElementById('buyNowModal');
    const areaPopup = document.getElementById('areaPopup');
    
    if (event.target === buyNowModal) {
        closeBuyNowForm();
    }
    
    if (event.target === areaPopup) {
        closeAreaPopup();
    }
}

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeBuyNowForm();
        closeAreaPopup();
    }
});

// Add scroll reveal animations
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in animation to sections
    const animatedElements = document.querySelectorAll(
        '.step-card, .benefit-card, .testimonial-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add stagger effect to cards
    document.querySelectorAll('.step-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.benefit-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
});

// Add parallax effect to hero section (subtle)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 800);
    }
});

