// ========== Mobile Menu Toggle ==========
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('fa-x');
  navbar.classList.toggle('active');
});

// Close menu when scrolling
window.addEventListener('scroll', () => {
  menuIcon.classList.remove('fa-x');
  navbar.classList.remove('active');
});

// ========== Sticky Header ==========
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 100);
});

// ========== Smooth Scrolling for Navigation Links ==========
const navLinks = document.querySelectorAll('header nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });

      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// ========== Scroll-to-Top Button ==========
const scrollBtn = document.querySelector('.footer-iconTop');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'inline-flex' : 'none';
});

// ========== Skills Section Animation ==========
document.addEventListener('DOMContentLoaded', () => {
  const skillBars = document.querySelectorAll('.skill-bar');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.fill');
        const width = bar.getAttribute('data-width');
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  skillBars.forEach(bar => {
    const fill = bar.querySelector('.fill');
    fill.setAttribute('data-width', fill.style.width);
    fill.style.width = '0';
    observer.observe(bar);
  });
});

// ========== ScrollReveal Animations ==========
ScrollReveal({
  reset: true,
  distance: '60px',
  duration: 1000,
  delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .footer-content-wrapper', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


// Close mobile menu on link click
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
  });
});

// ========== Contact Form Submission ==========
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);

    // Send email using EmailJS
    emailjs.sendForm('service_6yg72yo', 'template_wpbh2aj', form)
      .then(function(response) {
        alert('Message sent successfully!');
        form.reset(); // Reset the form after successful submission
      }, function(error) {
        alert('Failed to send message. Please try again later.');
      });
  });

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const footer = document.querySelector('footer');
const socialLinks = document.querySelectorAll('.social-links a');

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    navLinks.forEach(link => link.classList.toggle('dark-mode'));
    footer.classList.toggle('dark-mode');
    socialLinks.forEach(link => link.classList.toggle('dark-mode'));
});

// Fetch GitHub Projects
const projectsContainer = document.getElementById('projects-container');
const username = 'Jennah198'; 

fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
        data.forEach(repo => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <img src="${repo.owner.avatar_url}" alt="${repo.name}">
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <a href="${repo.html_url}" class="btn" target="_blank">View Project</a>
            `;
            projectsContainer.appendChild(projectCard);
        });
    })
    .catch(error => {
        console.error('Error fetching GitHub projects:', error);
    });
