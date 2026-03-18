document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const backToTopBtn = document.getElementById('backToTop');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    let lastScroll = 0;
    const scrollThreshold = 100;
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                navMenu.classList.remove('active');
            }
        });
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > scrollThreshold) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        if (currentScroll > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        lastScroll = currentScroll;
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    menuToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.timeline-content, .skill-category, .advantage-card, .portfolio-card, .stat-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    const elementsToAnimate = document.querySelectorAll('.timeline-content, .skill-category, .advantage-card, .portfolio-card, .stat-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    const animateStats = () => {
        if (statsAnimated) return;
        
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const targetValue = stat.textContent;
                let currentValue = 0;
                
                if (targetValue.includes('w+')) {
                    const num = parseInt(targetValue);
                    const increment = num / 50;
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= num) {
                            stat.textContent = targetValue;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(currentValue) + 'w+';
                        }
                    }, 40);
                } else if (targetValue.includes('+')) {
                    const num = parseInt(targetValue);
                    const increment = num / 50;
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= num) {
                            stat.textContent = targetValue;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(currentValue) + '+';
                        }
                    }, 40);
                }
            });
        }
    };
    
    window.addEventListener('scroll', animateStats);
    animateStats();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});