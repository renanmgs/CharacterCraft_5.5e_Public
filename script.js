// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Slider
    initializeSlider();
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Background Change on Scroll
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(26, 26, 26, 0.98)';
            } else {
                nav.style.background = 'rgba(26, 26, 26, 0.95)';
            }
        });
    }
    
    // Animate Elements on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .download-card, .contribution-item, .privacy-section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Download Button Analytics (if you want to track downloads)
    const downloadButtons = document.querySelectorAll('a[download]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fileName = this.getAttribute('href');
            console.log(`Download initiated: ${fileName}`);
            
            // Add a visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.pointerEvents = 'auto';
                }, 2000);
            }, 1000);
        });
    });
    
    // Parallax Effect for Hero Section
    const heroImage = document.querySelector('.hero-image i');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroImage.style.transform = `translateY(${parallax}px) rotate(${scrolled * 0.05}deg)`;
        });
    }
    
    // Dynamic Badge Colors
    const badges = document.querySelectorAll('.badge');
    const badgeColors = [
        'rgba(218, 165, 32, 0.1)',
        'rgba(220, 20, 60, 0.1)',
        'rgba(139, 69, 19, 0.1)',
        'rgba(255, 107, 107, 0.1)'
    ];
    
    badges.forEach((badge, index) => {
        if (badgeColors[index]) {
            badge.style.backgroundColor = badgeColors[index];
        }
    });
    
    // Add Typing Effect to Hero Title
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle && window.innerWidth > 768) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--secondary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 500);
    }
    
    // Add Loading States for External Links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (!this.classList.contains('btn')) return;
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-external-link-alt fa-spin"></i> Opening...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 2000);
        });
    });
    
    // Add Hover Sound Effect (Optional - requires audio files)
    const interactiveElements = document.querySelectorAll('.btn, .feature-card, .download-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Add a subtle scale effect
            this.style.transform = this.style.transform.replace(/scale\([^)]*\)/g, '') + ' scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(/scale\([^)]*\)/g, '');
        });
    });
    
    // Copy to Clipboard Functionality (for code snippets if any)
    const codeBlocks = document.querySelectorAll('code, .file-name');
    codeBlocks.forEach(code => {
        code.addEventListener('click', function() {
            navigator.clipboard.writeText(this.textContent).then(() => {
                // Show temporary tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Copied!';
                tooltip.style.cssText = `
                    position: absolute;
                    background: var(--accent-color);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    z-index: 1000;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                tooltip.style.top = (rect.top - 30) + 'px';
                tooltip.style.left = rect.left + 'px';
                
                document.body.appendChild(tooltip);
                
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 1500);
            });
        });
    });
    
    // Initialize tooltips for better UX
    const elementsWithTooltips = document.querySelectorAll('[title]');
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.textContent = this.getAttribute('title');
            tooltip.className = 'custom-tooltip';
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
                max-width: 200px;
                word-wrap: break-word;
            `;
            
            document.body.appendChild(tooltip);
            
            const updatePosition = (e) => {
                tooltip.style.left = (e.pageX + 10) + 'px';
                tooltip.style.top = (e.pageY - 30) + 'px';
            };
            
            updatePosition(e);
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            this.addEventListener('mousemove', updatePosition);
            this.addEventListener('mouseleave', function() {
                if (tooltip.parentNode) {
                    document.body.removeChild(tooltip);
                }
            });
        });
    });
});

// Hero Slider Functionality
function initializeSlider() {
    const slidesContainer = document.getElementById('slides');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    let slides = [];
    let autoSlideInterval;
    
    // Load slides from assets/slides directory
    async function loadSlides() {
        const slideImages = [
            'assets/slides/slide-1.png',
            'assets/slides/slide-2.png',
            'assets/slides/slide-3.png',
            'assets/slides/slide-4.png',
            'assets/slides/slide-5.png'
        ];
        
        const validSlides = [];
        
        for (let i = 0; i < slideImages.length; i++) {
            try {
                const img = new Image();
                img.src = slideImages[i];
                
                await new Promise((resolve, reject) => {
                    img.onload = () => resolve();
                    img.onerror = () => reject();
                    setTimeout(() => reject(), 1000); // Timeout after 1 second
                });
                
                validSlides.push({
                    src: slideImages[i],
                    alt: `Character Craft Screenshot ${i + 1}`
                });
            } catch (error) {
                // Image doesn't exist or failed to load
                console.log(`Slide ${slideImages[i]} not found`);
            }
        }
        
        return validSlides;
    }
    
    // Create slide elements
    function createSlides(slideData) {
        if (slideData.length === 0) {
            // Keep fallback slide if no screenshots found
            return;
        }
        
        // Clear existing slides except fallback
        slidesContainer.innerHTML = '';
        
        slideData.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'slide';
            slideDiv.innerHTML = `
                <img src="${slide.src}" alt="${slide.alt}" class="slide-image">
            `;
            slidesContainer.appendChild(slideDiv);
        });
        
        slides = document.querySelectorAll('.slide');
        createDots();
        setupEventListeners();
        startAutoSlide();
    }
    
    // Create dots for navigation
    function createDots() {
        dotsContainer.innerHTML = '';
        
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Setup event listeners
    function setupEventListeners() {
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                previousSlide();
                startAutoSlide();
            });
            
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }
        
        // Pause auto-slide on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoSlide);
            sliderContainer.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        slidesContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        slidesContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                stopAutoSlide();
                if (diff > 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }
                startAutoSlide();
            }
        }
    }
    
    // Slide navigation functions
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    function previousSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    function updateSlider() {
        if (slides.length === 0) return;
        
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
        if (slides.length <= 1) return;
        
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 4000); // Change slide every 4 seconds
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Initialize slider
    loadSlides().then(createSlides);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance Optimization
const debouncedScroll = debounce(() => {
    // Any scroll-heavy operations can be placed here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add CSS for dynamic elements
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }
    
    .loading {
        animation: pulse 1.5s infinite;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .custom-tooltip {
        font-family: var(--font-body);
    }
`;
document.head.appendChild(style);