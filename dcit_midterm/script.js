// INTERACTIVE FEATURE 1: Sticky Navigation (Scroll Event)
// Changes the navbar style when the user scrolls down
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// INTERACTIVE FEATURE 2: Dynamic Content Display (Button Click Event)
// Shows and hides additional projects when the button is clicked
const viewMoreBtn = document.getElementById('viewMoreBtn');
const extraProjects = document.getElementById('extra-projects');

viewMoreBtn.addEventListener('click', function() {
    if (extraProjects.style.display === 'none' || extraProjects.style.display === '') {
        extraProjects.style.display = 'block';
        viewMoreBtn.textContent = 'Show Less';
        // Optional: Smooth scroll down to the newly revealed content
        extraProjects.scrollIntoView({ behavior: 'smooth' });
    } else {
        extraProjects.style.display = 'none';
        viewMoreBtn.textContent = 'View More Projects';
    }
});

// INTERACTIVE FEATURE 3: Form Validation and DOM Modification
// Prevents form submission if invalid, and provides feedback via DOM
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', function(event) {
    // Prevent the default page reload
    event.preventDefault(); 
    
    // Grab values from the DOM
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic Validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        formFeedback.style.color = '#cc0000'; // Red text for error
        formFeedback.textContent = 'Please fill out all required fields.';
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        formFeedback.style.color = '#cc0000';
        formFeedback.textContent = 'Please enter a valid email address.';
        return;
    }

    // If validation passes, simulate successful submission
    formFeedback.style.color = '#006600'; // CvSU green for success
    formFeedback.textContent = `Thank you, ${name}! Your message has been sent.`;
    
    // Clear the form fields
    contactForm.reset();
});

// Select all the links inside the navigation menu
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Prevent the default jump behavior
        event.preventDefault();

        // Get the ID of the section we want to scroll to (e.g., "#about")
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Smoothly scroll and align the section to the center of the screen
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center' // This forces it to the middle of the screen
        });
    });
});