document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            // Toggle hamburger icon animation
            const spans = hamburger.querySelectorAll('span');
            if(mobileMenu.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's the stats bar, trigger counter animation
                if(entry.target.classList.contains('stats-bar')) {
                    animateCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Number Counter Animation for Stats
    let countersAnimated = false;
    function animateCounters() {
        if(countersAnimated) return;
        
        const countElements = document.querySelectorAll('.stat-num[data-target]');
        
        countElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if(current < target) {
                    el.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    el.innerText = target + (el.innerText.includes('%') ? '%' : '');
                }
            };
            
            updateCounter();
        });
        
        countersAnimated = true;
    }
});
