document.addEventListener('DOMContentLoaded', function() {
    initializeModules();
});

function initializeModules() {
    try {
        initSmoothNavigation();
        initHeaderEffects();
        initMobileMenu();
        initScrollAnimations();
        initRotatingText();
        initImageErrorHandling();
        initInteractiveElements();
        initCurrentYear();
        initEmailButton();
        initTestimonialClick();
    } catch (error) {
        console.error('Ошибка инициализации:', error);
    }
}

// Плавная навигация
function initSmoothNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Эффекты шапки
function initHeaderEffects() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Мобильное меню
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        menuBtn.innerHTML = navLinks.classList.contains('show')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
        document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('show');
            navLinks.style.display = 'flex';
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        } else {
            navLinks.style.display = navLinks.classList.contains('show') ? 'flex' : 'none';
        }
    });
}

// Анимация появления при скролле
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => observer.observe(el));
}

// Ротирующийся текст
function initRotatingText() {
    const element = document.getElementById('rotating-text');
    if (!element) return;

    const phrases = [
        'Веб-разработчик',
        'Создаю цифровые активы',
        'Повышаю конверсию',
        'Для бизнеса и профессионалов'
    ];

    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const current = phrases[index];
        if (isDeleting) {
            element.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                index = (index + 1) % phrases.length;
            }
        } else {
            element.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
            }
        }
        setTimeout(type, isDeleting ? 50 : 150);
    }
    type();
}

// Обработка ошибок изображений
function initImageErrorHandling() {
    document.querySelectorAll('.portfolio-img img').forEach(img => {
        img.onerror = function() {
            this.style.display = 'none';
            this.parentNode.innerHTML += `
                <div style="width:100%;height:100%;background:#2a2a2a;display:flex;align-items:center;justify-content:center;color:var(--accent);">
                    <i class="fas fa-image" style="font-size:2rem;"></i>
                </div>
            `;
        };
    });
}

// Интерактивные элементы
function initInteractiveElements() {
    document.querySelectorAll('.skill-item, .pricing-card, .testimonial-item').forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Обновление года
function initCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// Функция для почты
function openEmailClient() {
    const recipient = 'artm_ts1@bk.ru';
    const subject = 'Предложение по проекту';
    const body = 'Здравствуйте, Артём!%0D%0A%0D%0AХочу обсудить с вами проект...%0D%0A%0D%0AС уважением, [Ваше имя]';
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;
}

function initEmailButton() {
    const emailBtn = document.querySelector('.email-btn');
    if (emailBtn) {
        emailBtn.addEventListener('click', openEmailClient);
    }
}

// Клик по отзывам-заглушкам
function initTestimonialClick() {
    document.querySelectorAll('.testimonial-item[data-action="contact"]').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Экспорт для отладки
window.Portfolio = {
    reinit: initializeModules,
    openEmailClient
};