// ===== MODERN FUTURISTIC JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION =====
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
    
    // ===== UPDATE ACTIVE NAV LINK ON SCROLL =====
    function updateActiveNavLink(activeLink = null) {
        navLinks.forEach(link => link.classList.remove('active'));
        
        if (activeLink) {
            activeLink.classList.add('active');
        } else {
            const sections = document.querySelectorAll('section');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                const id = section.getAttribute('id');
                
                if (scrollPos >= top && scrollPos <= bottom) {
                    const correspondingLink = document.querySelector(`a[href="#${id}"]`);
                    if (correspondingLink) {
                        correspondingLink.classList.add('active');
                    }
                }
            });
        }
    }
    
    // ===== NAVBAR BACKGROUND ON SCROLL =====
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        }
        
        updateActiveNavLink();
    });
    
    // ===== MOBILE MENU TOGGLE =====
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate skill progress bars
                if (entry.target.classList.contains('skills-section')) {
                    animateSkillBars();
                }
                
                // Animate stats
                if (entry.target.classList.contains('about-section')) {
                    animateStats();
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // ===== ANIMATE SKILL BARS =====
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            if (level) {
                setTimeout(() => {
                    bar.style.width = level + '%';
                }, Math.random() * 500);
            }
        });
    }
    
    // ===== ANIMATE STATS COUNTER =====
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue);
            
            if (!isNaN(numericValue)) {
                let currentValue = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                        stat.textContent = finalValue; // Restore original format (e.g., "15+", "100%")
                    } else {
                        stat.textContent = Math.floor(currentValue);
                    }
                }, 50);
            }
        });
    }
    
    // ===== TYPING ANIMATION FOR HERO =====
    const heroTitle = document.querySelector('.title-name');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #6366f1';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    // ===== PARALLAX EFFECT FOR HERO BACKGROUND =====
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translate3d(0, ${parallax}px, 0)`;
        }
    });
    
    // ===== FLOATING ANIMATION FOR CODE CARD =====
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        let mouseX = 0;
        let mouseY = 0;
        let cardX = 0;
        let cardY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = (e.clientX - window.innerWidth / 2) / 50;
            mouseY = (e.clientY - window.innerHeight / 2) / 50;
        });
        
        function animateCard() {
            cardX += (mouseX - cardX) * 0.1;
            cardY += (mouseY - cardY) * 0.1;
            
            floatingCard.style.transform = `translate3d(${cardX}px, ${cardY}px, 0) rotateX(${cardY * 0.5}deg) rotateY(${cardX * 0.5}deg)`;
            
            requestAnimationFrame(animateCard);
        }
        
        animateCard();
    }
    
    // ===== FORM HANDLING =====
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span><i class="btn-icon">⏳</i>';
            submitBtn.disabled = true;
            
            // The form will be handled by Formspree
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span><i class="btn-icon">✅</i>';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1000);
        });
    }
    
    // ===== 3D CAROUSEL FUNCTIONALITY =====
    const carousel = document.getElementById('projectCarousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentProjectSpan = document.querySelector('.current-project');
    
    let currentSlide = 0;
    let isAnimating = false;
    
    function updateCarousel() {
        if (isAnimating) return;
        isAnimating = true;
        
        carouselItems.forEach((item, index) => {
            // Remove all position classes
            item.classList.remove('active', 'prev', 'next');
            
            if (index === currentSlide) {
                item.classList.add('active');
            } else if (index === (currentSlide - 1 + carouselItems.length) % carouselItems.length) {
                item.classList.add('prev');
            } else if (index === (currentSlide + 1) % carouselItems.length) {
                item.classList.add('next');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update counter
        currentProjectSpan.textContent = String(currentSlide + 1).padStart(2, '0');
        
        // Faster animation completion for mobile
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselItems.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    // Event listeners for carousel
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-rotate carousel (longer interval for better mobile experience)
    let autoRotateInterval = setInterval(nextSlide, 7000);
    
    // Pause auto-rotate on hover (desktop only)
    if (carousel && window.innerWidth > 768) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoRotateInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoRotateInterval = setInterval(nextSlide, 7000);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(nextSlide, 5000);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(nextSlide, 5000);
        }
    });
    
    // Initialize carousel
    updateCarousel();
    
    // ===== 3D CARD FLIP EFFECT =====
    const projectCards3D = document.querySelectorAll('.project-card-3d');
    
    projectCards3D.forEach(card => {
        card.addEventListener('dblclick', function() {
            this.classList.toggle('flipped');
        });
        
        // Subtle hover effect for 3D cards
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'rotateY(10deg) rotateX(5deg) translateZ(20px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)';
            }
        });
    });
    
    // Enhanced Touch/Swipe support for mobile
    let startX = null;
    let startY = null;
    let startTime = null;
    
    if (carousel) {
        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
            
            // Prevent auto-rotation during touch interaction
            clearInterval(autoRotateInterval);
        }, { passive: true });
        
        carousel.addEventListener('touchend', function(e) {
            if (!startX || !startY || !startTime) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const endTime = Date.now();
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            const timeDiff = endTime - startTime;
            
            // Only trigger if it's a quick swipe (less than 500ms) and sufficient distance
            if (timeDiff < 500 && Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
                if (diffX > 0) {
                    nextSlide(); // Swipe left - next slide
                } else {
                    prevSlide(); // Swipe right - previous slide
                }
            }
            
            // Restart auto-rotation
            setTimeout(() => {
                autoRotateInterval = setInterval(nextSlide, 7000);
            }, 1000);
            
            startX = null;
            startY = null;
            startTime = null;
        }, { passive: true });
        
        // Prevent scroll during horizontal swipes
        carousel.addEventListener('touchmove', function(e) {
            if (startX && Math.abs(startX - e.touches[0].clientX) > 10) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    // ===== TECH ORBIT INTERACTION =====
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-50%) scale(1.2)';
            this.style.background = 'linear-gradient(45deg, #6366f1, #8b5cf6)';
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(-50%) scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.zIndex = '1';
        });
    });
    
    // ===== SMOOTH REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll('.text-card, .contact-card, .skill-category');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        revealObserver.observe(element);
    });
    
    // ===== CONTACT CARDS HOVER EFFECT =====
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // ===== BUTTON RIPPLE EFFECT =====
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    let ticking = false;
    
    function updateOnScroll() {
        // Throttle scroll events
        if (!ticking) {
            requestAnimationFrame(() => {
                // Your scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll, { passive: true });
    
    // ===== PRELOAD CRITICAL ANIMATIONS =====
    // Warm up the GPU for smoother animations
    const warmUpElement = document.createElement('div');
    warmUpElement.style.cssText = `
        position: fixed;
        top: -100px;
        left: -100px;
        width: 1px;
        height: 1px;
        transform: translateZ(0);
        opacity: 0;
        pointer-events: none;
    `;
    document.body.appendChild(warmUpElement);
    
    setTimeout(() => {
        document.body.removeChild(warmUpElement);
    }, 100);
    
    console.log('🚀 Futuristic portfolio loaded successfully!');
});

// ===== CSS FOR RIPPLE EFFECT =====
const rippleStyles = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleAnimation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Inject ripple styles
const style = document.createElement('style');
style.textContent = rippleStyles;
document.head.appendChild(style);