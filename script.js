// ============================================
// ПОРТФОЛИО АРТЁМА ЦВЕТКОВА - ОСНОВНОЙ СКРИПТ
// ============================================

// Основная функция инициализации при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Загрузка портфолио...');
    
    // Инициализация всех модулей
    initializeModules();
    
    console.log('Портфолио успешно загружено!');
});

// ============================================
// МОДУЛЬ 1: ЗВЕЗДНЫЙ ФОН
// ============================================
function initStarfield() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) {
        console.warn('Контейнер для звездного фона не найден');
        return;
    }
    
    const starCount = 150;
    
    // Очищаем контейнер на случай перезагрузки
    starsContainer.innerHTML = '';
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Случайные параметры для звезд
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 5;
        const opacity = 0.2 + Math.random() * 0.8;
        
        // Устанавливаем стили одним вызовом для производительности
        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}vw;
            top: ${y}vh;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${opacity};
            animation-name: twinkle;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            position: absolute;
            background-color: white;
            border-radius: 50%;
            pointer-events: none;
        `;
        
        starsContainer.appendChild(star);
    }
    
    // Добавляем CSS для анимации, если его еще нет
    if (!document.querySelector('#star-animation-style')) {
        const style = document.createElement('style');
        style.id = 'star-animation-style';
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log(`Создано ${starCount} звезд`);
}

// ============================================
// МОДУЛЬ 2: АНИМАЦИЯ ПЕЧАТАЮЩЕГОСЯ ТЕКСТА
// ============================================
function initTypewriter() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) {
        console.warn('Элемент для печатающегося текста не найден');
        return;
    }
    
    const texts = [
        "современные сайты",
        "адаптивные интерфейсы",
        "лендинги для бизнеса",
        "удобные веб-приложения"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let erasingSpeed = 50;
    let pauseBetween = 1500;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex <= currentText.length) {
            // Печатаем
            typedTextElement.textContent = currentText.substring(0, charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && charIndex >= 0) {
            // Стираем
            typedTextElement.textContent = currentText.substring(0, charIndex);
            charIndex--;
            setTimeout(type, erasingSpeed);
        } else {
            // Меняем направление или переходим к следующему тексту
            isDeleting = !isDeleting;
            if (!isDeleting) {
                textIndex = (textIndex + 1) % texts.length;
            }
            setTimeout(type, pauseBetween);
        }
    }
    
    // Начинаем анимацию с небольшой задержкой
    setTimeout(type, 1000);
    
    console.log('Анимация печатающегося текста запущена');
}

// ============================================
// МОДУЛЬ 3: ПЛАВНАЯ НАВИГАЦИЯ
// ============================================
function initSmoothNavigation() {
    // Плавная навигация по якорным ссылкам
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Пропускаем пустые якоря
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Рассчитываем позицию с учетом фиксированной шапки
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Плавный скролл
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Обновляем URL без перезагрузки (опционально)
                history.pushState(null, null, targetId);
            }
        });
    });
    
    console.log('Плавная навигация инициализирована');
}

// ============================================
// МОДУЛЬ 4: АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ
// ============================================
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length === 0) return;
    
    // Функция проверки видимости элементов
    function checkVisibility() {
        const windowHeight = window.innerHeight;
        const triggerOffset = 100; // Запас в пикселях
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - triggerOffset) {
                element.classList.add('visible');
            }
        });
    }
    
    // Запускаем проверку сразу и при скролле
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    console.log(`Отслеживается ${fadeElements.length} элементов для анимации`);
}

// ============================================
// МОДУЛЬ 5: ШАПКА ПРИ СКРОЛЛЕ
// ============================================
function initHeaderEffects() {
    const header = document.querySelector('header');
    if (!header) return;
    
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Проверяем начальное состояние
    updateHeader();
    
    // Оптимизируем вызов при скролле
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Используем debounce для оптимизации производительности
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(updateHeader, 10);
    });
    
    console.log('Эффекты шапки активированы');
}

// ============================================
// МОДУЛЬ 6: МОБИЛЬНОЕ МЕНЮ (ИСПРАВЛЕННАЯ ВЕРСИЯ)
// ============================================
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    function toggleMenu() {
        navLinks.classList.toggle('show');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.className = navLinks.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
        }
        
        // Блокируем скролл при открытом меню
        document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : '';
    }
    
    menuBtn.addEventListener('click', toggleMenu);
    
    // Закрываем меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        });
    });
    
    // Закрываем меню при клике вне его
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('show') && 
            !navLinks.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            navLinks.classList.remove('show');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        }
    });
    
    // Адаптация при изменении размера окна
    function handleResize() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('show');
            navLinks.style.display = 'flex';
            const icon = menuBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        } else {
            navLinks.style.display = navLinks.classList.contains('show') ? 'flex' : 'none';
        }
    }
    
    // Инициализация
    handleResize();
    window.addEventListener('resize', handleResize);
    
    console.log('Мобильное меню инициализировано');
}

// ============================================
// МОДУЛЬ 7: ОБРАБОТКА ОШИБОК ИЗОБРАЖЕНИЙ
// ============================================
function initImageErrorHandling() {
    const portfolioImages = document.querySelectorAll('.portfolio-img img');
    if (portfolioImages.length === 0) return;
    
    // SVG-заглушка для изображений
    const fallbackSVG = encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
            <rect width="800" height="450" fill="#0a0a14"/>
            <rect x="20" y="20" width="760" height="410" fill="rgba(0,243,255,0.1)" stroke="#00f3ff" stroke-width="2"/>
            <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="24" fill="#00f3ff" 
                  text-anchor="middle" font-weight="bold">Превью сайта</text>
            <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="18" fill="#aaa" 
                  text-anchor="middle">Изображение загружается...</text>
        </svg>
    `);
    
    portfolioImages.forEach(img => {
        // Обработка ошибок загрузки
        img.onerror = function() {
            console.warn(`Не удалось загрузить изображение: ${this.src}`);
            
            // Устанавливаем SVG-заглушку
            this.src = `data:image/svg+xml;utf8,${fallbackSVG}`;
            this.alt = 'Изображение недоступно';
            
            // Добавляем стили для заглушки
            this.style.backgroundColor = '#0a0a14';
            this.style.border = '2px solid rgba(0, 243, 255, 0.2)';
        };
        
        // Логируем успешную загрузку
        img.onload = function() {
            console.log(`Изображение загружено: ${this.src.split('/').pop()}`);
        };
        
        // Предзагрузка для улучшения UX
        if (img.dataset.src && !img.src) {
            img.src = img.dataset.src;
        }
    });
    
    console.log(`Отслеживается ${portfolioImages.length} изображений портфолио`);
}

// ============================================
// МОДУЛЬ 8: ИНТЕРАКТИВНЫЕ КНОПКИ И ЭФФЕКТЫ
// ============================================
function initInteractiveElements() {
    // Эффекты для кнопок портфолио
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Эффекты для кнопок "Открыть сайт"
    const openButtons = document.querySelectorAll('.btn-open');
    openButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Эффекты для иконок соцсетей
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });
    
    console.log('Интерактивные элементы активированы');
}

// ============================================
// МОДУЛЬ 9: ТАЙМЕР РАБОТЫ НАД САЙТОМ
// ============================================
function initExperienceTimer() {
    const experienceElement = document.getElementById('experience-timer');
    if (!experienceElement) return;
    
    // Дата начала карьеры (можешь изменить)
    const startDate = new Date('2023-01-01');
    const currentDate = new Date();
    
    // Рассчитываем разницу в месяцах
    const monthsDiff = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + 
                      (currentDate.getMonth() - startDate.getMonth());
    
    // Форматируем результат
    let experienceText;
    if (monthsDiff < 12) {
        experienceText = `${monthsDiff} месяцев`;
    } else {
        const years = Math.floor(monthsDiff / 12);
        const months = monthsDiff % 12;
        experienceText = `${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}`;
        if (months > 0) {
            experienceText += ` ${months} ${months === 1 ? 'месяц' : months < 5 ? 'месяца' : 'месяцев'}`;
        }
    }
    
    experienceElement.textContent = experienceText;
}

// ============================================
// МОДУЛЬ 10: ОПТИМИЗАЦИЯ ПРОИЗВОДИТЕЛЬНОСТИ
// ============================================
function initPerformanceOptimization() {
    // Отложенная загрузка невидимых изображений
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Фолбэк для старых браузеров
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // Дебаунс для событий resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Обновляем только необходимые элементы при ресайзе
            if (window.innerWidth <= 768) {
                const navLinks = document.querySelector('.nav-links');
                if (navLinks) navLinks.style.display = 'none';
            }
        }, 250);
    });
}

// ============================================
// МОДУЛЬ 11: АВТОМАТИЧЕСКОЕ ОБНОВЛЕНИЕ ГОДА В ФУТЕРЕ
// ============================================
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// ГЛАВНАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ (ИСПРАВЛЕННАЯ)
// ============================================
function initializeModules() {
    try {
        // Запускаем все модули в оптимальном порядке
        initStarfield();
        initSmoothNavigation();
        initHeaderEffects();
        initMobileMenu();
        initScrollAnimations();
        initTypewriter();
        initImageErrorHandling();
        initInteractiveElements();
        initExperienceTimer();
        initPerformanceOptimization();
        initCurrentYear();
        
        // Дополнительная инициализация после загрузки
        setTimeout(() => {
            // Проверяем все ли изображения загрузились
            const images = document.querySelectorAll('img');
            let loadedCount = 0;
            
            images.forEach(img => {
                if (img.complete) loadedCount++;
            });
            
            console.log(`Загружено ${loadedCount} из ${images.length} изображений`);
        }, 2000);
        
    } catch (error) {
        console.error('Ошибка при инициализации портфолио:', error);
        
        // Аварийный режим: гарантируем хотя бы базовую функциональность
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.onclick = null; // Отключаем preventDefault для навигации
        });
    }
}

// ============================================
// ГОЛОБАЛЬНЫЙ ЭКСПОРТ ДЛЯ ОТЛАДКИ
// ============================================
// Делаем основные функции доступными в консоли для отладки
if (typeof window !== 'undefined') {
    window.Portfolio = {
        reinit: initializeModules,
        reloadStars: initStarfield,
        restartTypewriter: initTypewriter
    };
// ============================================
// МОДУЛЬ 12: КНОПКА ПОЧТЫ С ВЫБОРОМ КЛИЕНТА
// ============================================
function initEmailButton() {
    const emailBtn = document.querySelector('.email-btn');
    if (emailBtn) {
        emailBtn.addEventListener('click', openEmailClient);
    }
}

function openEmailClient() {
    // Основные данные
    const recipient = 'artm_ts1@bk.ru';
    const subject = 'Предложение по проекту';
    const body = 'Здравствуйте, Артём!\n\nХочу обсудить с вами проект...\n\nС уважением, [Ваше имя]';
    
    // Ссылки для разных почтовых клиентов
    const mailServices = {
        'mailru': `https://e.mail.ru/compose/?to=${recipient}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        'gmail': `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        'yandex': `https://mail.yandex.ru/compose?to=${recipient}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        'outlook': `https://outlook.live.com/mail/0/deeplink/compose?to=${recipient}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        'default': `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    };
    
    // Создаем модальное окно с выбором почтового клиента
    const modal = document.createElement('div');
    modal.id = 'email-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: var(--dark-bg);
        border: 2px solid var(--neon-blue);
        border-radius: 20px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 0 30px rgba(0, 243, 255, 0.3);
    `;
    
    modalContent.innerHTML = `
        <h3 style="color: var(--neon-blue); margin-bottom: 20px; font-size: 1.5rem;">
            <i class="fas fa-envelope"></i> Выберите почтовый сервис
        </h3>
        <p style="color: #ccc; margin-bottom: 25px; font-size: 1.1rem;">
            Выберите почтовый сервис, которым пользуетесь:
        </p>
        <div style="display: flex; flex-direction: column; gap: 15px;">
            <button class="email-service-btn" data-service="mailru" style="background: linear-gradient(45deg, #005ff9, #1a73e8);">
                <i class="fab fa-mailchimp"></i> Mail.ru
            </button>
            <button class="email-service-btn" data-service="gmail" style="background: linear-gradient(45deg, #EA4335, #FBBC05);">
                <i class="fab fa-google"></i> Gmail
            </button>
            <button class="email-service-btn" data-service="yandex" style="background: linear-gradient(45deg, #FF0000, #FC3F1D);">
                <i class="fab fa-yandex"></i> Яндекс.Почта
            </button>
            <button class="email-service-btn" data-service="outlook" style="background: linear-gradient(45deg, #0078D4, #005A9E);">
                <i class="fab fa-microsoft"></i> Outlook
            </button>
            <button class="email-service-btn" data-service="default" style="background: linear-gradient(45deg, #666, #888);">
                <i class="fas fa-desktop"></i> Системный почтовый клиент
            </button>
        </div>
        <button id="cancel-email" style="
            margin-top: 25px;
            background: transparent;
            color: #aaa;
            border: 1px solid #666;
            padding: 10px 25px;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 1rem;
        ">
            Отмена
        </button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Добавляем стили для кнопок выбора сервиса
    const style = document.createElement('style');
    style.textContent = `
        .email-service-btn {
            padding: 15px 20px;
            border: none;
            border-radius: 50px;
            color: white;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .email-service-btn:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }
        
        .email-service-btn i {
            font-size: 1.2rem;
        }
        
        #cancel-email:hover {
            border-color: var(--neon-blue);
            color: var(--neon-blue);
        }
    `;
    document.head.appendChild(style);
    
    // Обработчики для кнопок выбора сервиса
    modalContent.querySelectorAll('.email-service-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const service = this.dataset.service;
            window.open(mailServices[service], '_blank');
            document.body.removeChild(modal);
        });
    });
    
    // Кнопка отмены
    modalContent.querySelector('#cancel-email').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Закрытие по клику вне модального окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Обновите функцию initializeModules в script.js:
// Добавьте initEmailButton() в список инициализации:

function initializeModules() {
    try {
        // ... существующие вызовы ...
        initStarfield();
        initSmoothNavigation();
        initHeaderEffects();
        initMobileMenu();
        initScrollAnimations();
        initTypewriter();
        initImageErrorHandling();
        initInteractiveElements();
        initExperienceTimer();
        initPerformanceOptimization();
        initCurrentYear();
        initEmailButton(); // <-- ДОБАВЬТЕ ЭТУ СТРОЧКУ
        
        // ... остальной код ...
    } catch (error) {
        console.error('Ошибка при инициализации портфолио:', error);
    }
}
}