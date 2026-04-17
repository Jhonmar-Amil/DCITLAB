window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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

const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
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

    formFeedback.style.color = '#006600'; 
    formFeedback.textContent = `Thank you, ${name}! Your message has been sent.`;
    
    
    contactForm.reset();
});

const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center' 
        });
    });
});