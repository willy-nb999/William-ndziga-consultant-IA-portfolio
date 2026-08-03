/* ==========================================================================
   MBOA Industries / AI NATION — William Roger Khaled Portfolio
   Interactive Script & Slide Carousel Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --------------------------------------------------------------------------
    // 1. Navbar Scroll & Blur Effect
    // --------------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --------------------------------------------------------------------------
    // 2. Mobile Menu Toggle
    // --------------------------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            hamburger.classList.toggle('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });
    }

    // --------------------------------------------------------------------------
    // 3. Slide Carousel Engine for Projects Section
    // --------------------------------------------------------------------------
    const slides = document.querySelectorAll('.slide-item');
    const pills = document.querySelectorAll('.slide-selector-pill');
    const counterCurrent = document.getElementById('counterCurrent');
    const progressBarFill = document.getElementById('progressBarFill');
    const btnPrevSlide = document.getElementById('btnPrevSlide');
    const btnNextSlide = document.getElementById('btnNextSlide');
    const slidesViewport = document.getElementById('slidesViewport');

    let currentSlide = 0;
    const totalSlides = slides.length;

    function goToSlide(index) {
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }

        currentSlide = index;

        // Hide all slides and remove active class
        slides.forEach(slide => slide.classList.remove('active'));
        pills.forEach(pill => pill.classList.remove('active'));

        // Show targeted slide and highlight pill
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
        }
        if (pills[currentSlide]) {
            pills[currentSlide].classList.add('active');
        }

        // Update counter text (e.g. 01, 02)
        if (counterCurrent) {
            counterCurrent.textContent = String(currentSlide + 1).padStart(2, '0');
        }

        // Update Progress Bar
        if (progressBarFill) {
            const progressPercent = ((currentSlide + 1) / totalSlides) * 100;
            progressBarFill.style.width = `${progressPercent}%`;
        }
    }

    if (btnPrevSlide) {
        btnPrevSlide.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
    }

    if (btnNextSlide) {
        btnNextSlide.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
    }

    pills.forEach((pill, idx) => {
        pill.addEventListener('click', () => {
            goToSlide(idx);
        });
    });

    // Keyboard Arrow Navigation
    document.addEventListener('keydown', (e) => {
        // Only trigger if projects section is in view or user presses arrow keys
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });

    // Initialize initial slide state
    goToSlide(0);

    // --------------------------------------------------------------------------
    // 4. Reveal Animations & Stats Counter
    // --------------------------------------------------------------------------
    const observerOptions = {
        root: null,
        threshold: 0.12
    };

    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        const statNums = document.querySelectorAll('.stat-number[data-target]');
        
        statNums.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const isPercent = el.textContent.includes('%');
            const isPlus = el.textContent.includes('+');
            let count = 0;
            const duration = 1800; // ms
            const stepTime = 20;
            const increment = target / (duration / stepTime);

            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    count = target;
                    clearInterval(timer);
                }
                let formatted = Math.floor(count).toString();
                if (isPlus) formatted += '+';
                if (isPercent) formatted += '%';
                el.textContent = formatted;
            }, stepTime);
        });

        countersAnimated = true;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.id === 'statsBar' || entry.target.querySelector('#statsBar')) {
                    animateCounters();
                }
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // --------------------------------------------------------------------------
    // 5. Contact Form Submission Handling
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Envoi en cours... <i class="ph ph-spinner spinner"></i>';
            btn.style.opacity = '0.8';

            setTimeout(() => {
                btn.innerHTML = 'Message envoyé avec succès ! <i class="ph-fill ph-check-circle"></i>';
                btn.style.background = 'var(--accent-2)';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = 'var(--accent)';
                    btn.style.opacity = '1';
                }, 4000);
            }, 1200);
        });
    }
});
