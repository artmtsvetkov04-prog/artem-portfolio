document.addEventListener('DOMContentLoaded', () => {
    try {
        initSmoothNavigation();
        initHeaderEffects();
        initMobileMenu();
        initScrollAnimations();
        initRotatingText();
        initCurrentYear();
        initEmailButton();
        initTestimonialClick();
        initImageErrorHandling();
    } catch (error) {
        console.error('Ошибка инициализации:', error);
    }
});

function initSmoothNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const header = document.querySelector('header');
            const offset = header ? header.offsetHeight : 0;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });

            closeMobileMenu();
            history.pushState(null, '', href);
        });
    });
}

function initHeaderEffects() {
    const header = document.querySelector('header');
    if (!header) return;

    const update = () => header.classList.toggle('scrolled', window.scrollY > 30);
    update();
    window.addEventListener('scroll', update);
}

function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        document.body.classList.toggle('menu-open', navLinks.classList.contains('show'));
        menuBtn.innerHTML = navLinks.classList.contains('show')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 920) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (!navLinks || !menuBtn) return;
    navLinks.classList.remove('show');
    document.body.classList.remove('menu-open');
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
}

function initRotatingText() {
    const element = document.getElementById('rotating-text');
    if (!element) return;

    const phrases = [
        'Веб-разработчик',
        'Создаю сайты-визитки и лендинги',
        'Делаю логотипы и карточки товаров',
        'Помогаю малому бизнесу выделиться'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
            element.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        } else {
            charIndex++;
            element.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(typeLoop, 1100);
                return;
            }
        }

        setTimeout(typeLoop, isDeleting ? 45 : 90);
    }

    typeLoop();
}

function initCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

function openEmailClient() {
    const recipient = 'artm_ts1@bk.ru';
    const subject = 'Обсуждение проекта';
    const body = 'Здравствуйте, Артём!%0D%0A%0D%0AХочу обсудить проект.%0D%0AНиша:%0D%0AЧто нужно:%0D%0AСрок:%0D%0A%0D%0AС уважением,';
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;
}

function initEmailButton() {
    document.querySelectorAll('.email-btn').forEach(btn => {
        btn.addEventListener('click', openEmailClient);
    });
}

function initTestimonialClick() {
    document.querySelectorAll('[data-action="contact"]').forEach(item => {
        item.addEventListener('click', () => {
            const contact = document.querySelector('#contact');
            if (contact) {
                const header = document.querySelector('header');
                const offset = header ? header.offsetHeight : 0;
                window.scrollTo({
                    top: contact.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initImageErrorHandling() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.cssText = 'width:100%;height:100%;min-height:220px;display:flex;align-items:center;justify-content:center;background:#1f1f1f;color:#00ff9d;border-radius:16px;font-weight:600;text-align:center;padding:20px;';
            fallback.textContent = `Не найден файл: ${this.getAttribute('src')}`;
            this.parentNode.appendChild(fallback);
        });
    });
}

window.PortfolioSite = {
    openEmailClient,
    closeMobileMenu
};
