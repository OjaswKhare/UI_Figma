// DOM Elements
const searchIcon = document.getElementById('searchIcon');
const searchBox = document.getElementById('searchBox');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');
const dots = document.querySelectorAll('.dot');
const prevArrow = document.getElementById('prevArrow');
const nextArrow = document.getElementById('nextArrow');
const flavorRadios = document.querySelectorAll('input[name="flavor"]');
const typeRadios = document.querySelectorAll('input[name="type"]');
const addToCart = document.getElementById('addToCart');
const percentage1 = document.getElementById('percentage1');
const percentage2 = document.getElementById('percentage2');
const percentage3 = document.getElementById('percentage3');
const faqQuestions = document.querySelectorAll('.faq-question');

// Product Gallery Variables
let currentIndex = 0;
const images = [
    'assets/images/product1.jpg',
    'assets/images/product2.jpg',
    'assets/images/product3.jpg',
    'assets/images/product4.jpg'
];

// Search Functionality
searchIcon.addEventListener('click', () => {
    searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
});

// Hamburger Menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Product Gallery Functions
function updateGallery(index) {
    // Validate index
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    
    // Update main image
    mainImage.src = images[index];
    mainImage.alt = `Product Image ${index + 1}`;
    
    // Update thumbnails
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
}

// Thumbnail click event
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        updateGallery(index);
    });
});

// Dot click event
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateGallery(index);
    });
});

// Arrow navigation
prevArrow.addEventListener('click', () => {
    updateGallery(currentIndex - 1);
});

nextArrow.addEventListener('click', () => {
    updateGallery(currentIndex + 1);
});

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        updateGallery(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
        updateGallery(currentIndex + 1);
    }
});

// Radio Button Functionality
function updateAddToCartText() {
    const flavor = document.querySelector('input[name="flavor"]:checked').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    
    // Format display text
    const flavorText = flavor.charAt(0).toUpperCase() + flavor.slice(1);
    let typeText = '';
    
    switch(type) {
        case 'single':
            typeText = 'Single Pack';
            break;
        case 'three':
            typeText = 'Three Pack';
            break;
        case 'subscription':
            typeText = 'Subscription';
            break;
    }
    
    // Update button text and data attributes
    addToCart.textContent = `Add to Cart - ${flavorText}, ${typeText}`;
    addToCart.dataset.flavor = flavor;
    addToCart.dataset.type = type;
}

// Add event listeners to radio buttons
flavorRadios.forEach(radio => {
    radio.addEventListener('change', updateAddToCartText);
});

typeRadios.forEach(radio => {
    radio.addEventListener('change', updateAddToCartText);
});

// Add to Cart functionality
addToCart.addEventListener('click', (e) => {
    e.preventDefault();
    const flavor = addToCart.dataset.flavor;
    const type = addToCart.dataset.type;
    
    // Here you would typically send this data to your cart system
    console.log(`Added to cart: ${flavor}, ${type}`);
    
    // Visual feedback
    addToCart.textContent = 'Added!';
    addToCart.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        addToCart.textContent = `Add to Cart - ${document.querySelector('input[name="flavor"]:checked').value.charAt(0).toUpperCase() + document.querySelector('input[name="flavor"]:checked').value.slice(1)}, ${document.querySelector('input[name="type"]:checked').value === 'single' ? 'Single Pack' : document.querySelector('input[name="type"]:checked').value === 'three' ? 'Three Pack' : 'Subscription'}`;
        addToCart.style.backgroundColor = '#333';
    }, 1500);
});

// Percentage Counter Animation
function animatePercentage(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }
        element.textContent = Math.floor(current) + '%';
    }, 10);
}

// Intersection Observer for percentage animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animatePercentage(percentage1, 84);
            animatePercentage(percentage2, 78);
            animatePercentage(percentage3, 92);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.percentage-section'));

// FAQ Accordion
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const toggle = question.querySelector('.faq-toggle');
        
        // Toggle current item
        question.classList.toggle('active');
        answer.classList.toggle('active');
        
        // Close other items
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                otherQuestion.classList.remove('active');
                otherQuestion.nextElementSibling.classList.remove('active');
            }
        });
    });
});

// Responsive adjustments
function handleResize() {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        if (!navLinks.classList.contains('active')) {
            navLinks.style.display = 'none';
        }
    }
}

window.addEventListener('resize', handleResize);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateAddToCartText();
    handleResize();
    
    // Preload images for better user experience
    images.forEach(imgSrc => {
        const img = new Image();
        img.src = imgSrc;
    });
});