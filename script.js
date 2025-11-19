function trackAnalyticsEvent(eventName, params = {}) {
    if (typeof gtag === 'function' && window.GA_MEASUREMENT_ID) {
        gtag('event', eventName, params);
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Slider
    initializeSlider();
    
    // Load Latest Update
    loadLatestUpdate();

    // Initialize Featured Characters carousel
    initializeCharacterCarousel();
    
    // Show Web App button on desktop
    const webAppBtn = document.getElementById('web-app-btn');
    if (webAppBtn && !isMobileDevice()) {
        webAppBtn.style.display = 'inline-flex';
    }

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
            const analyticsLabel = this.dataset.analyticsLabel || fileName;
            const fileExtension = fileName ? fileName.split('.').pop().toLowerCase() : '';
            const linkUrl = this.href;
            trackAnalyticsEvent('file_download', {
                file_name: fileName,
                file_extension: fileExtension,
                link_label: analyticsLabel,
                link_url: linkUrl
            });
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

    const documentationLinks = document.querySelectorAll('a[href="documentation.html"]');
    documentationLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkLocation = this.dataset.analyticsLocation || 'unknown';
            trackAnalyticsEvent('documentation_link_click', {
                link_location: linkLocation,
                link_text: this.textContent.trim(),
                link_url: this.href
            });
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
            'assets/slides/slide-1.jpg',
            'assets/slides/slide-2.jpg',
            'assets/slides/slide-3.jpg',
            'assets/slides/slide-4.jpg',
            'assets/slides/slide-5.jpg',
            'assets/slides/slide-6.jpg',
            'assets/slides/slide-7.jpg',
            'assets/slides/slide-8.jpg',
            'assets/slides/slide-9.jpg'
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
        updateSlider(); // ✅ Chama updateSlider imediatamente para mostrar o primeiro slide
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
                //stopAutoSlide();
                previousSlide();
                //startAutoSlide();
            });
            
            nextBtn.addEventListener('click', () => {
                //stopAutoSlide();
                nextSlide();
                //startAutoSlide();
            });
        }
        
        // Add click listeners to slides for navigation
        slides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                if (index !== currentSlide) {
                    stopAutoSlide();
                    goToSlide(index);
                    startAutoSlide();
                }
            });
        });
        
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
        
        // Update slide states - no transform needed on container
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                slide.classList.add('prev');
            } else if (index === (currentSlide + 1) % slides.length) {
                slide.classList.add('next');
            }
        });
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
        if (slides.length <= 1) return;
        
        // ✅ Adiciona um delay inicial menor para o primeiro avanço automático
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

// Latest Update Loader
async function loadLatestUpdate() {
    try {
        const response = await fetch('news_template.json');
        const newsData = await response.json();
        
        // Get English content
        const enContent = newsData.en;
        
        // Update image
        const updateImage = document.getElementById('updateImage');
        if (updateImage && enContent.image) {
            updateImage.src = enContent.image;
            updateImage.style.display = 'block';
        }
        
        // Update title
        const updateTitle = document.getElementById('updateTitle');
        if (updateTitle) {
            updateTitle.textContent = enContent.title;
        }
        
        // Format and update date
        const updateDate = document.getElementById('updateDate');
        if (updateDate && newsData.date) {
            const date = new Date(newsData.date);
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                timeZone: 'UTC'
            };
            updateDate.textContent = `Released: ${date.toLocaleDateString('en-US', options)}`;
        }
        

        
        // Update content text
        const updateText = document.getElementById('updateText');
        if (updateText && enContent.text) {
            // Convert text to HTML with proper formatting
            const formattedText = formatUpdateText(enContent.text);
            updateText.innerHTML = formattedText;
        }
        
    } catch (error) {
        console.error('Failed to load latest update:', error);
        
        // Fallback content
        const updateTitle = document.getElementById('updateTitle');
        const updateText = document.getElementById('updateText');
        
        if (updateTitle) {
            updateTitle.textContent = 'Character Craft 5.5e - Latest Updates';
        }
        
        if (updateText) {
            updateText.innerHTML = `
                <p>Stay up to date with the latest Character Craft 5.5e improvements and features!</p>
                <p>Download the app from your preferred store to get the newest version.</p>
            `;
        }
    }
}

const CHARACTER_MANIFEST_PATH = 'assets/characters/characters.json';
const CHARACTER_FALLBACK_ENTRIES = ['assets/characters/Canam_Human_Barbarian.json'];

const characterCarouselState = {
    entries: [],
    currentIndex: 0
};

// Featured Character Loader
async function initializeCharacterCarousel() {
    const card = document.getElementById('characterCard');
    if (!card) return;

    characterCarouselState.entries = await fetchCharacterEntries();
    characterCarouselState.currentIndex = 0;

    setupCharacterNavigation();
    updateCharacterNavigationState();

    if (characterCarouselState.entries.length === 0) {
        showCharacterLoadFallback();
        return;
    }

    await renderCharacterByIndex(characterCarouselState.currentIndex);
}

async function fetchCharacterEntries() {
    try {
        const response = await fetch(CHARACTER_MANIFEST_PATH, { cache: 'no-cache' });
        if (!response.ok) {
            throw new Error(`Manifest request failed with status ${response.status}`);
        }

        const manifest = await response.json();
        const entries = Array.isArray(manifest)
            ? manifest
            : Array.isArray(manifest?.characters)
                ? manifest.characters
                : [];

        const normalizedEntries = entries
            .map(normalizeCharacterEntry)
            .filter(Boolean);

        if (normalizedEntries.length > 0) {
            return normalizedEntries;
        }

        console.warn('Character manifest is empty. Falling back to default character.');
    } catch (error) {
        console.warn('Unable to load character manifest. Using fallback character list.', error);
    }

    return CHARACTER_FALLBACK_ENTRIES
        .map(normalizeCharacterEntry)
        .filter(Boolean);
}

function normalizeCharacterEntry(entry) {
    if (!entry) return null;

    if (typeof entry === 'string') {
        return { file: buildCharacterPath(entry.trim()) };
    }

    if (typeof entry === 'object') {
        const filePath = buildCharacterPath(entry.file || entry.path || entry.source || entry.href);
        if (!filePath) return null;

        return {
            file: filePath,
            label: entry.label || entry.name || entry.title || null,
            imageOverride: entry.image || entry.portrait || null
        };
    }

    return null;
}

function buildCharacterPath(file) {
    if (!file || typeof file !== 'string') return null;

    const trimmed = file.trim();
    if (!trimmed) return null;

    const normalized = trimmed
        .replace(/\\/g, '/')
        .replace(/^\.\/+/, '');

    if (!normalized) return null;

    if (/^https?:/i.test(normalized)) {
        return normalized;
    }

    if (normalized.startsWith('assets/')) {
        return normalized;
    }

    if (normalized.startsWith('../')) {
        return normalized;
    }

    return `assets/characters/${normalized}`;
}

function setupCharacterNavigation() {
    const prevBtn = document.getElementById('characterPrevBtn');
    const nextBtn = document.getElementById('characterNextBtn');

    if (!prevBtn || !nextBtn) {
        return;
    }

    if (!prevBtn.dataset.initialized) {
        prevBtn.addEventListener('click', () => {
            if (characterCarouselState.entries.length <= 1) return;
            characterCarouselState.currentIndex = (characterCarouselState.currentIndex - 1 + characterCarouselState.entries.length) % characterCarouselState.entries.length;
            renderCharacterByIndex(characterCarouselState.currentIndex);
        });
        prevBtn.dataset.initialized = 'true';
    }

    if (!nextBtn.dataset.initialized) {
        nextBtn.addEventListener('click', () => {
            if (characterCarouselState.entries.length <= 1) return;
            characterCarouselState.currentIndex = (characterCarouselState.currentIndex + 1) % characterCarouselState.entries.length;
            renderCharacterByIndex(characterCarouselState.currentIndex);
        });
        nextBtn.dataset.initialized = 'true';
    }
}

function updateCharacterNavigationState() {
    const navigation = document.getElementById('characterNavigation');
    const prevBtn = document.getElementById('characterPrevBtn');
    const nextBtn = document.getElementById('characterNextBtn');

    if (!navigation || !prevBtn || !nextBtn) return;

    const total = characterCarouselState.entries.length;

    if (total <= 1) {
        navigation.classList.add('character-navigation-single');
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        navigation.setAttribute('aria-hidden', 'true');
    } else {
        navigation.classList.remove('character-navigation-single');
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        navigation.removeAttribute('aria-hidden');
    }

    updateCharacterCounter(characterCarouselState.currentIndex);
}

function updateCharacterCounter(index) {
    const counterEl = document.getElementById('characterCounter');
    if (!counterEl) return;

    const total = characterCarouselState.entries.length;
    counterEl.textContent = total > 0 ? `${index + 1} / ${total}` : '0 / 0';
}

async function renderCharacterByIndex(index) {
    const entry = characterCarouselState.entries[index];
    if (!entry) {
        showCharacterLoadFallback();
        return;
    }

    characterCarouselState.currentIndex = index;

    const nameEl = document.getElementById('characterName');
    if (nameEl) {
        nameEl.textContent = 'Loading character...';
    }

    try {
        const response = await fetch(entry.file, { cache: 'no-cache' });
        if (!response.ok) {
            throw new Error(`Failed to fetch character data from ${entry.file}`);
        }

        const characterData = await response.json();
        populateCharacterCard(characterData, entry);
        updateCharacterCounter(index);
    } catch (error) {
        console.error('Failed to load featured character:', error);
        showCharacterLoadFallback();
    }
}

function populateCharacterCard(characterData, entry) {
    const nameEl = document.getElementById('characterName');
    if (nameEl) {
        nameEl.textContent = resolveCharacterName(characterData, entry);
    }

    const classes = getCharacterClasses(characterData);
    const totalLevel = getTotalCharacterLevel(classes);

    const levelEl = document.getElementById('characterLevel');
    if (levelEl) {
        levelEl.textContent = totalLevel > 0 ? totalLevel : '--';
    }

    const classEl = document.getElementById('characterClasses');
    if (classEl) {
        classEl.textContent = formatCharacterClasses(classes);
    }

    const speciesEl = document.getElementById('characterSpecies');
    if (speciesEl) {
        speciesEl.textContent = characterData.species?.name || 'Unknown';
    }

    const backgroundEl = document.getElementById('characterBackground');
    if (backgroundEl) {
        backgroundEl.textContent = characterData.background?.name || 'Unknown';
    }

    const downloadLink = document.getElementById('characterDownloadLink');
    if (downloadLink) {
        downloadLink.href = entry.file;
        const fileName = entry.file.split('/').pop();
        if (fileName) {
            downloadLink.setAttribute('download', fileName);
        }
        downloadLink.dataset.analyticsLabel = `featured_character_demo_json:${fileName || entry.file}`;
        downloadLink.innerHTML = '<i class="fas fa-download"></i> Download Character JSON';
        downloadLink.style.pointerEvents = 'auto';
    }

    const imageEl = document.getElementById('characterImage');
    const fallbackEl = imageEl ? imageEl.nextElementSibling : null;
    const imageSource = entry.imageOverride || characterData.image;
    if (imageEl) {
        if (imageSource) {
            imageEl.src = imageSource;
            imageEl.style.display = 'block';
            if (fallbackEl) {
                fallbackEl.style.display = 'none';
            }
        } else {
            imageEl.style.display = 'none';
            if (fallbackEl) {
                fallbackEl.style.display = 'flex';
            }
        }
    }

    setTextWithFallback('characterBackgroundDescription', characterData.background?.description, 'Background details unavailable.');
    setTextWithFallback('characterBio', characterData.bio, 'No biography provided.');

    renderAttributes(characterData.attributes);
    renderList('characterEquipment', mapItemNames(characterData.equipment), 8, 'No equipment listed.');
    renderList('characterFeatures', mapItemNames(characterData.featuresAndTraits), 8, 'No features available.');
    renderList('characterFeats', mapItemNames(characterData.feats), 6, 'No feats recorded.');
}

function resolveCharacterName(characterData, entry) {
    if (entry?.label) {
        return entry.label;
    }
    if (characterData?.name) {
        return characterData.name;
    }
    return 'Unnamed Adventurer';
}

function getCharacterClasses(characterData) {
    if (!characterData) return [];

    if (Array.isArray(characterData.class) && characterData.class.length > 0) {
        return characterData.class;
    }

    if (Array.isArray(characterData.charClass) && characterData.charClass.length > 0) {
        return characterData.charClass;
    }

    return [];
}

function getTotalCharacterLevel(classes) {
    if (!Array.isArray(classes)) return 0;

    return classes.reduce((total, cls) => {
        const levelValue = cls?.level ?? cls?.Level ?? cls?.lvl ?? cls?.Lvl ?? cls?.levels;
        return total + extractLevelValue(levelValue);
    }, 0);
}

function extractLevelValue(levelValue) {
    if (typeof levelValue === 'number' && Number.isFinite(levelValue)) {
        return levelValue;
    }

    if (typeof levelValue === 'string') {
        const parsed = parseInt(levelValue, 10);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    return 0;
}

function formatCharacterClasses(classes) {
    if (!Array.isArray(classes) || classes.length === 0) {
        return '--';
    }

    return classes.map(cls => {
        const className = cls?.name || 'Unknown';
        const levelValue = extractLevelValue(cls?.level ?? cls?.Level ?? cls?.lvl ?? cls?.Lvl ?? cls?.levels);
        const levelText = levelValue > 0 ? ` (Lv. ${levelValue})` : '';
        return `${className}${levelText}`;
    }).join(', ');
}

function showCharacterLoadFallback() {
    const nameEl = document.getElementById('characterName');
    if (nameEl) {
        nameEl.textContent = 'Example character unavailable at the moment';
    }

    const levelEl = document.getElementById('characterLevel');
    if (levelEl) {
        levelEl.textContent = '--';
    }

    const classEl = document.getElementById('characterClasses');
    if (classEl) {
        classEl.textContent = '--';
    }

    const speciesEl = document.getElementById('characterSpecies');
    if (speciesEl) {
        speciesEl.textContent = 'Unknown';
    }

    const backgroundEl = document.getElementById('characterBackground');
    if (backgroundEl) {
        backgroundEl.textContent = 'Unknown';
    }

    setTextWithFallback('characterBackgroundDescription', '', 'Background details unavailable.');
    setTextWithFallback('characterBio', '', 'No biography provided.');

    renderAttributes(null);
    renderList('characterEquipment', null, 0, 'No equipment listed.');
    renderList('characterFeatures', null, 0, 'No features available.');
    renderList('characterFeats', null, 0, 'No feats recorded.');

    const downloadLink = document.getElementById('characterDownloadLink');
    if (downloadLink) {
        downloadLink.href = '#';
        downloadLink.removeAttribute('download');
        downloadLink.dataset.analyticsLabel = 'featured_character_demo_json:none';
    }
}

function setTextWithFallback(elementId, value, fallback) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const content = typeof value === 'string' && value.trim().length > 0
        ? truncateText(value.replace(/\t/g, ' ').replace(/\s+/g, ' ').trim(), 500)
        : fallback;

    element.textContent = content;
}

function renderAttributes(attributes) {
    const list = document.getElementById('characterAttributes');
    if (!list) return;

    list.innerHTML = '';
    if (!attributes || Object.keys(attributes).length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Attributes unavailable';
        list.appendChild(li);
        return;
    }

    Object.entries(attributes).forEach(([key, value]) => {
        const li = document.createElement('li');
        const label = document.createElement('strong');
        label.textContent = key;
        const stat = document.createElement('span');
        stat.textContent = value;
        li.appendChild(label);
        li.appendChild(stat);
        list.appendChild(li);
    });
}

function renderList(elementId, items, limit, emptyMessage) {
    const list = document.getElementById(elementId);
    if (!list) return;

    list.innerHTML = '';

    if (!items || items.length === 0) {
        const li = document.createElement('li');
        li.textContent = emptyMessage;
        list.appendChild(li);
        return;
    }

    const maxItems = typeof limit === 'number' ? limit : items.length;
    items.slice(0, maxItems).forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });

    if (items.length > maxItems) {
        const li = document.createElement('li');
        li.textContent = `+${items.length - maxItems} more`;
        list.appendChild(li);
    }
}

function mapItemNames(collection) {
    if (!Array.isArray(collection)) return [];
    return collection
        .map(item => {
            if (!item) return null;
            if (typeof item === 'string') return item;
            return item.name || item.title || null;
        })
        .filter(Boolean);
}

function truncateText(text, maxLength) {
    if (!text || text.length <= maxLength) return text;
    return `${text.substring(0, maxLength - 1).trim()}…`;
}

// Format update text for better HTML display
function formatUpdateText(text) {
    // Split by double line breaks to create paragraphs
    const paragraphs = text.split('\n\n');
    let formattedHTML = '';
    
    paragraphs.forEach(paragraph => {
        paragraph = paragraph.trim();
        if (!paragraph) return;
        
        // Convert single line breaks to <br>
        paragraph = paragraph.replace(/\n/g, '<br>');
        
        // Make headers bold
        if (paragraph.startsWith('🚀') || paragraph.startsWith('⚔️') || paragraph.startsWith('📜') || paragraph.includes('What\'s New') || paragraph.includes('NEW:')) {
            formattedHTML += `<h4>${paragraph}</h4>`;
        }
        // Handle bullet points
        else if (paragraph.includes('\n•') || paragraph.startsWith('•')) {
            const lines = paragraph.split('<br>');
            let listHTML = '<ul>';
            lines.forEach(line => {
                line = line.trim();
                if (line.startsWith('•')) {
                    listHTML += `<li>${line.substring(1).trim()}</li>`;
                } else if (line) {
                    if (listHTML === '<ul>') {
                        listHTML = `<p>${line}</p><ul>`;
                    }
                }
            });
            listHTML += '</ul>';
            formattedHTML += listHTML;
        }
        // Regular paragraphs
        else {
            formattedHTML += `<p>${paragraph}</p>`;
        }
    });
    
    return formattedHTML;
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

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}