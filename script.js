// ===== MODERN FUTURISTIC JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Force dark mode on initial load for better visibility
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
    }
    
    console.log('Theme loaded:', currentTheme);
    console.log('Body classes:', body.className);
    
    // Theme toggle handler
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        
        // Save theme preference
        const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION =====
    const dockLinks = document.querySelectorAll('.dock-item[href^="#"]');
    
    dockLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip empty hrefs
            if (targetId === '#' || !targetId) return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active dock item
                updateActiveDockItem(this);
            }
        });
    });
    
    // ===== UPDATE ACTIVE DOCK ITEM ON SCROLL =====
    function updateActiveDockItem(activeLink = null) {
        const dockItems = document.querySelectorAll('.dock-item[href^="#"]:not([href="#"])');
        dockItems.forEach(link => link.classList.remove('active'));
        
        if (activeLink) {
            activeLink.classList.add('active');
        } else {
            // Auto-detect section on scroll
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + 200;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    const activeLink = document.querySelector(`.dock-item[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }
    }
    
    // Update active dock item on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateActiveDockItem();
        }, 100);
    });
    
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
        
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
            carouselItems.forEach((item, index) => {
                // Remove all position classes efficiently
                item.className = item.className.replace(/\b(active|prev|next)\b/g, '').trim() + ' carousel-item';
                
                if (index === currentSlide) {
                    item.classList.add('active');
                } else if (index === (currentSlide - 1 + carouselItems.length) % carouselItems.length) {
                    item.classList.add('prev');
                } else if (index === (currentSlide + 1) % carouselItems.length) {
                    item.classList.add('next');
                }
            });
            
            // Update indicators efficiently
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
            
            // Update counter
            if (currentProjectSpan) {
                currentProjectSpan.textContent = String(currentSlide + 1).padStart(2, '0');
            }
        });
        
        // Shorter timeout for better responsiveness
        setTimeout(() => {
            isAnimating = false;
        }, 300);
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
    
    // Auto-rotate carousel with performance optimization
    let autoRotateInterval;
    
    function startAutoRotation() {
        if (autoRotateInterval) clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(nextSlide, 8000);
    }
    
    // Only enable auto-rotation if page is visible (performance optimization)
    if (typeof document.visibilityState !== 'undefined') {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                startAutoRotation();
            } else {
                clearInterval(autoRotateInterval);
            }
        });
    }
    
    // Start auto-rotation
    startAutoRotation();
    
    // Pause auto-rotate on hover (desktop only)
    if (carousel && window.innerWidth > 768) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoRotateInterval);
        }, { passive: true });
        
        carousel.addEventListener('mouseleave', () => {
            startAutoRotation();
        }, { passive: true });
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
    
    // Debug: Log carousel items count
    console.log(`📊 Carousel initialized with ${carouselItems.length} projects`);
    console.log('🎯 Projects:', Array.from(carouselItems).map((item, i) => ({
        index: i,
        title: item.querySelector('.project-title')?.textContent || 'Unknown'
    })));
    
    // ===== 3D CARD MOUSE TRACKING EFFECT (Aceternity Style) =====
    const projectCards3D = document.querySelectorAll('.project-card-3d');
    
    // Only add 3D effects on desktop for better performance
    if (window.innerWidth > 768) {
        projectCards3D.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg tilt
                const rotateY = ((x - centerX) / centerX) * 10;
                
                this.style.transform = `
                    translateY(-10px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }
    
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
            
            // More sensitive swipe detection for better mobile UX
            if (timeDiff < 600 && Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 20) {
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
    
    // ===== ACHIEVEMENTS DROPDOWN =====
    const achievementsDropdown = document.querySelector('.achievements-dropdown');
    const achievementsTrigger = document.querySelector('.achievements-trigger');
    
    if (achievementsTrigger) {
        // Toggle dropdown on click for mobile
        achievementsTrigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                achievementsDropdown.classList.toggle('active');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!achievementsDropdown.contains(e.target)) {
                achievementsDropdown.classList.remove('active');
            }
        });
    }
    
    // Initialize 3D Carousel
    init3DCarousel();
    
    console.log('🚀 Futuristic portfolio loaded successfully!');
});

// ===== 3D CAROUSEL =====
function init3DCarousel() {
    console.log('🎠 Initializing 3D Carousel...');
    
    const projects = [
        {
            title: 'Brain Hub',
            description: 'AI-powered brain training platform with interactive learning modules and progress tracking.',
            icon: '🧠',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            tags: ['JavaScript', 'AI/ML', 'WebGL'],
            link: 'https://saksham-brain-hub.vercel.app/',
            badge: '⭐ Featured'
        },
        {
            title: 'Lexiscan',
            description: 'Award-winning document scanning tool with powerful OCR capabilities and intelligent processing.',
            icon: '📄',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            tags: ['React', 'OCR', 'AI Processing'],
            link: 'https://lexiscandone.vercel.app/',
            badge: '🏆 Hackathon Winner'
        },
        {
            title: 'Palm Reader',
            description: 'Interactive palm reading application using computer vision and AI for mystical insights.',
            icon: '✋',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            tags: ['Python', 'OpenCV', 'ML'],
            link: 'https://palmreader.vercel.app/',
            badge: '🆕 New'
        },
        {
            title: 'Med Aid AI',
            description: 'AI-powered medical diagnosis and health assistance platform with intelligent recommendations.',
            icon: '⚕️',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            tags: ['TensorFlow', 'NLP', 'Healthcare'],
            link: 'https://medaiid.vercel.app/',
            badge: '💊 Healthcare'
        },
        {
            title: 'Law Mind',
            description: 'Intelligent legal assistant platform providing case analysis, legal research, and document automation.',
            icon: '⚖️',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            tags: ['AI/ML', 'Legal Tech', 'NLP'],
            link: 'https://law-mind.vercel.app/',
            badge: '⚖️ Legal AI'
        }
    ];

    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.getElementById('indicators');
    
    console.log('🔍 Carousel elements:', { carousel, prevBtn, nextBtn, indicators });
    
    if (!carousel || !prevBtn || !nextBtn || !indicators) {
        console.error('❌ Missing carousel elements!');
        return;
    }
    
    console.log('✅ All carousel elements found, creating cards...');

    let currentIndex = 0;
    let isAnimating = false;

    // Create project cards
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'carousel-card';
        card.innerHTML = `
            <div class="card-background-gradient">
                <div class="card-content">
                    <div class="card-badge">${project.badge}</div>
                    <div class="card-icon" style="background: ${project.gradient}">
                        <span>${project.icon}</span>
                    </div>
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-description">${project.description}</p>
                    <div class="card-tags">
                        ${project.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="card-link">
                        View Project
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 10L10 6M10 6H6M10 6V10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </a>
                </div>
            </div>
        `;
        carousel.appendChild(card);

        // Create indicator
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator';
        indicator.setAttribute('aria-label', `Go to project ${index + 1}`);
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
    });
    
    console.log(`✅ Created ${projects.length} project cards`);

    const cards = carousel.querySelectorAll('.carousel-card');
    const indicatorDots = indicators.querySelectorAll('.carousel-indicator');
    
    console.log(`📊 Cards in DOM: ${cards.length}, Indicators: ${indicatorDots.length}`);

    function updateCarousel() {
        const angle = 360 / cards.length;
        const radius = 450;

        cards.forEach((card, index) => {
            const cardAngle = (angle * index) - (angle * currentIndex);
            const theta = (cardAngle * Math.PI) / 180;
            
            const x = radius * Math.sin(theta);
            const z = radius * Math.cos(theta) - radius;
            
            const scale = 1 + (z / radius) * 0.3;
            const opacity = z > -radius * 0.5 ? 1 : 0.3;
            
            card.style.transform = `
                rotateY(${-cardAngle}deg) 
                translateZ(${radius}px)
            `;
            card.style.opacity = opacity;
            card.style.zIndex = Math.round(scale * 100);

            if (index === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        indicatorDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;
        currentIndex = index;
        updateCarousel();
        setTimeout(() => { isAnimating = false; }, 1000);
    }

    function nextSlide() {
        goToSlide((currentIndex + 1) % cards.length);
    }

    function prevSlide() {
        goToSlide((currentIndex - 1 + cards.length) % cards.length);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-rotate
    let autoRotate = setInterval(nextSlide, 5000);

    carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(nextSlide, 5000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    updateCarousel();
}

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