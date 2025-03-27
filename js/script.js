// Navbar scroll effect
    window.addEventListener('scroll', function () {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    fadeElements.forEach(element => {
      observer.observe(element);
    });

    // Pet image hover effects
    const petImages = document.querySelectorAll('.title-image, .cat-image');
    petImages.forEach(img => {
      img.addEventListener('mouseover', () => {
        img.style.transform = img.classList.contains('title-image')
          ? 'rotate(30deg) scale(1.05)'
          : 'rotate(-30deg) scale(1.05)';
      });

      img.addEventListener('mouseout', () => {
        img.style.transform = img.classList.contains('title-image')
          ? 'rotate(25deg)'
          : 'rotate(-25deg)';
      });
    });