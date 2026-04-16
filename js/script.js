/* ================================================
   MAZEN ABDELATTY — PORTFOLIO
   JavaScript Interactivity
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── DOM ELEMENTS ───
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const greetingEl = document.getElementById('greeting');
    const typingEl = document.getElementById('typingText');
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const particlesContainer = document.getElementById('particles');
    const allNavLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // ─── 1. TIME-OF-DAY GREETING ───
    function setGreeting() {
        const hour = new Date().getHours();
        let greeting = '';
        if (hour >= 5 && hour < 12) {
            greeting = '☀️ Good Morning';
        } else if (hour >= 12 && hour < 17) {
            greeting = '🌤️ Good Afternoon';
        } else if (hour >= 17 && hour < 21) {
            greeting = '🌅 Good Evening';
        } else {
            greeting = '🌙 Good Night';
        }
        greetingEl.textContent = greeting;
    }
    setGreeting();

    // ─── 2. TYPING ANIMATION ───
    const typingWords = [
        'Software Engineering Student',
        'Web Developer',
        'Problem Solver',
        'Tech Enthusiast',
        'Creative Coder',
        'Cyber Security Enthusiast'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = typingWords[wordIndex];

        if (isDeleting) {
            typingEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % typingWords.length;
            typingSpeed = 400; // Pause before next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // ─── 3. DARK/LIGHT THEME TOGGLE ───
    // Check localStorage for a saved theme preference so it persists across reloads.
    // If none exists, default to 'dark'.
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    const profileImg = document.querySelector('.image-wrapper img');
    const eeProjectImg = document.getElementById('eeProjectImg');
    const ccProjectImg = document.getElementById('ccProjectImg');
    
    // Define paths for images that should swap based on theme
    const darkImage = 'images/mazen.jpeg';
    const lightImage = 'images/Mazen_White.jpeg';
    const eeDarkImage = 'images/EEBlack.png';
    const eeLightImage = 'images/EEWhite.png';
    const ccDarkImage = 'images/CCDark.png';
    const ccLightImage = 'images/CCWhite.png';

    // Apply the saved theme immediately on page load
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    updateThemeImages(savedTheme);

    // Add click event listener to the toggle button
    themeToggle.addEventListener('click', () => {
        // Find out what the current theme is
        const currentTheme = document.documentElement.getAttribute('data-theme');
        // Switch it: if dark, make light; if light, make dark
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply the new theme to the root HTML element
        document.documentElement.setAttribute('data-theme', newTheme);
        // Save the new preference to localStorage
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Update the UI icon and images to match the new theme
        updateThemeIcon(newTheme);
        updateThemeImages(newTheme, true); // true = use animation for images
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    function updateThemeImages(theme, animate = false) {
        const profileSrc = theme === 'dark' ? darkImage : lightImage;
        const eeSrc = theme === 'dark' ? eeDarkImage : eeLightImage;
        const ccSrc = theme === 'dark' ? ccDarkImage : ccLightImage;

        if (animate) {
            if (profileImg) {
                profileImg.style.opacity = '0';
                setTimeout(() => {
                    profileImg.src = profileSrc;
                    profileImg.style.opacity = '1';
                }, 800);
            }
            if (eeProjectImg) {
                eeProjectImg.style.opacity = '0';
                setTimeout(() => {
                    eeProjectImg.src = eeSrc;
                    eeProjectImg.style.opacity = '1';
                }, 800);
            }
            if (ccProjectImg) {
                ccProjectImg.style.opacity = '0';
                setTimeout(() => {
                    ccProjectImg.src = ccSrc;
                    ccProjectImg.style.opacity = '1';
                }, 800);
            }
        } else {
            if (profileImg) profileImg.src = profileSrc;
            if (eeProjectImg) eeProjectImg.src = eeSrc;
            if (ccProjectImg) ccProjectImg.src = ccSrc;
        }
    }

    // ─── 4. NAVBAR SCROLL EFFECTS ───
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Add/remove scrolled class
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = scrollY;

        // Active nav link highlighting
        highlightActiveSection();
    });

    function highlightActiveSection() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ─── 5. MOBILE HAMBURGER MENU ───
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ─── 6. SMOOTH SCROLLING ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ─── 7. SCROLL ANIMATIONS (IntersectionObserver) ───
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars when they come into view
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });

                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => scrollObserver.observe(el));

    // Also observe individual skill cards for their bars
    document.querySelectorAll('.skill-card').forEach(card => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target.querySelector('.skill-progress');
                    if (bar) {
                        setTimeout(() => {
                            bar.style.width = bar.getAttribute('data-width');
                        }, 300);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(card);
    });

    // ─── 8. CONTACT FORM VALIDATION ───
    contactForm.addEventListener('submit', (e) => {
        // Prevent default form submission so the browser doesn't reload the page
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true; // Flag to track overall form validity

        // Clear any existing error messages before starting validation
        clearErrors();

        // Name validation: must not be empty and must be at least 2 characters string
        if (name.value.trim() === '') {
            showError(name, 'nameError', 'Please enter your name');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError(name, 'nameError', 'Name must be at least 2 characters');
            isValid = false;
        }

        // Email validation: must match a standard email regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError(email, 'emailError', 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, 'emailError', 'Please enter a valid email');
            isValid = false;
        }

        // Message validation: must be at least 10 characters
        if (message.value.trim() === '') {
            showError(message, 'messageError', 'Please enter a message');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'messageError', 'Message must be at least 10 characters');
            isValid = false;
        }

        // If the form is completely valid, send it via FormSubmit
        if (isValid) {
            // Update button to show a loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-circle-notch fa-spin" style="margin-left: 8px;"></i>';
            submitBtn.disabled = true;

            fetch("https://formsubmit.co/ajax/mazen_osama334@hotmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name.value.trim(),
                    email: email.value.trim(),
                    message: message.value.trim()
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast(); // Show our animated success message
                    contactForm.reset(); // Clear all form inputs
                } else {
                    alert("Submission failed. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                alert("Something went wrong. Please check your connection and try again.");
            })
            .finally(() => {
                // Restore button state
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            });
        }
    });

    function showError(input, errorId, message) {
        input.classList.add('error');
        document.getElementById(errorId).textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.classList.remove('error');
        });
        document.querySelectorAll('.error-msg').forEach(msg => {
            msg.textContent = '';
        });
    }

    // Clear error on input
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            const errorMsg = input.parentElement.querySelector('.error-msg');
            if (errorMsg) errorMsg.textContent = '';
        });
    });

    // ─── 9. TOAST NOTIFICATION ───
    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ─── 10. SKILLS FILTERING ───
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // 1. Fade out all cards first
            skillCards.forEach(card => {
                card.classList.add('filtering-out');
            });

            // 2. After a shorter fade out, switch display and staggered fade in
            setTimeout(() => {
                let showingCount = 0;
                
                skillCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || filter === category) {
                        card.classList.remove('hidden');
                        
                        // Use requestAnimationFrame for smoother timing
                        requestAnimationFrame(() => {
                            setTimeout(() => {
                                card.classList.remove('filtering-out');
                            }, showingCount * 40); // Snappy 40ms stagger
                            showingCount++;
                        });
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }, 200); // Super fast hide phase (200ms)
        });
    });

    // ─── 11. VISIT TIMER LOGIC ───
    const timerDisplay = document.getElementById('timerDisplay');
    let secondsSpent = 0;

    function updateTimer() {
        secondsSpent++;
        const minutes = Math.floor(secondsSpent / 60);
        const seconds = secondsSpent % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    setInterval(updateTimer, 1000);

    // ─── 11. GOLD PARTICLES IN HERO ───
    function createParticles() {
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = Math.random() * 6 + 4 + 's';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

});
