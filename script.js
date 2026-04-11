document.addEventListener('DOMContentLoaded', () => {
  initSmoothNavigation();
  initHeaderEffects();
  initMobileMenu();
  initScrollAnimations();
  initRotatingText();
  initCurrentYear();
  initEmailButton();
  initTestimonialClick();
  initImageErrorHandling();
  initTiltCards();
  initProductSliders();
  initFAQ();
  initParallax();
  initFilters();
  initServicePickers();
  initMailForms();
});
function initSmoothNavigation(){document.querySelectorAll('a[href^="#"]').forEach(anchor=>{anchor.addEventListener('click',function(e){const href=this.getAttribute('href');if(!href||href==='#')return;const target=document.querySelector(href);if(!target)return;e.preventDefault();const header=document.querySelector('header');const offset=header?header.offsetHeight:0;window.scrollTo({top:target.offsetTop-offset,behavior:'smooth'});closeMobileMenu();history.pushState(null,'',href);});});}
function initHeaderEffects(){const header=document.querySelector('header');if(!header)return;const update=()=>header.classList.toggle('scrolled',window.scrollY>20);update();window.addEventListener('scroll',update);}
function initMobileMenu(){const menuBtn=document.querySelector('.mobile-menu-btn');const navLinks=document.querySelector('.nav-links');if(!menuBtn||!navLinks)return;menuBtn.addEventListener('click',()=>{navLinks.classList.toggle('show');document.body.classList.toggle('menu-open',navLinks.classList.contains('show'));menuBtn.innerHTML=navLinks.classList.contains('show')?'<i class="fas fa-times"></i>':'<i class="fas fa-bars"></i>';});navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMobileMenu));window.addEventListener('resize',()=>{if(window.innerWidth>920)closeMobileMenu();});}
function closeMobileMenu(){const navLinks=document.querySelector('.nav-links');const menuBtn=document.querySelector('.mobile-menu-btn');if(!navLinks||!menuBtn)return;navLinks.classList.remove('show');document.body.classList.remove('menu-open');menuBtn.innerHTML='<i class="fas fa-bars"></i>';}
function initScrollAnimations(){const elements=document.querySelectorAll('.fade-in');if(!elements.length)return;const observer=new IntersectionObserver((entries)=>{entries.forEach((entry,index)=>{if(entry.isIntersecting){entry.target.style.transitionDelay=`${Math.min(index*0.05,0.25)}s`;entry.target.classList.add('visible');}});},{threshold:0.12});elements.forEach(el=>observer.observe(el));}
function initRotatingText(){const element=document.getElementById('rotating-text');if(!element)return;const phrases=['веб-разработчик','делаю сайты-визитки и лендинги','создаю логотипы для брендов','оформляю карточки товаров для WB / Ozon'];let phraseIndex=0;let charIndex=0;let isDeleting=false;function loop(){const current=phrases[phraseIndex];if(isDeleting){charIndex--;element.textContent=current.slice(0,charIndex);if(charIndex===0){isDeleting=false;phraseIndex=(phraseIndex+1)%phrases.length;}}else{charIndex++;element.textContent=current.slice(0,charIndex);if(charIndex===current.length){isDeleting=true;setTimeout(loop,1200);return;}}setTimeout(loop,isDeleting?45:82);}loop();}
function initCurrentYear(){const yearEl=document.getElementById('current-year');if(yearEl)yearEl.textContent=new Date().getFullYear();}
function openEmailClient(){const recipient='artm_ts1@bk.ru';const subject='Обсуждение проекта';const body='Здравствуйте, Артём!%0D%0A%0D%0AХочу обсудить проект.%0D%0AНиша:%0D%0AЧто нужно:%0D%0AСрок:%0D%0A%0D%0AС уважением,';window.location.href=`mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;}
function initEmailButton(){document.querySelectorAll('.email-btn').forEach(btn=>btn.addEventListener('click',openEmailClient));}
function initTestimonialClick(){document.querySelectorAll('[data-action="contact"]').forEach(item=>{item.addEventListener('click',()=>{const contact=document.querySelector('#contact');if(!contact)return;const header=document.querySelector('header');const offset=header?header.offsetHeight:0;window.scrollTo({top:contact.offsetTop-offset,behavior:'smooth'});});});}
function initImageErrorHandling(){document.querySelectorAll('img').forEach(img=>{img.addEventListener('error',function(){this.style.display='none';const fallback=document.createElement('div');fallback.style.cssText='width:100%;height:100%;min-height:220px;display:flex;align-items:center;justify-content:center;background:#121a28;color:#bfe9ff;border:1px dashed rgba(255,255,255,.12);border-radius:20px;text-align:center;padding:20px;';fallback.textContent=`Не найден файл: ${this.getAttribute('src')}`;this.parentNode.appendChild(fallback);});});}
function initTiltCards(){const cards=document.querySelectorAll('.direction-card, .showcase-card, .pricing-card, .service-card');cards.forEach(card=>{card.addEventListener('mousemove',(e)=>{if(window.innerWidth<921)return;const rect=card.getBoundingClientRect();const x=e.clientX-rect.left;const y=e.clientY-rect.top;const rotateY=((x/rect.width)-0.5)*8;const rotateX=((y/rect.height)-0.5)*-8;card.style.transform=`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;});card.addEventListener('mouseleave',()=>{card.style.transform='';});});}
window.PortfolioSite={openEmailClient,closeMobileMenu};

function initProductSliders(){
  document.querySelectorAll('[data-slider]').forEach(slider=>{
    const images=[...slider.querySelectorAll('.slider-track img')];
    const prev=slider.querySelector('.slider-arrow.prev');
    const next=slider.querySelector('.slider-arrow.next');
    const dotsWrap=slider.querySelector('.slider-dots');
    if(!images.length)return;
    let index=0;
    const setSlide=(newIndex)=>{
      index=(newIndex+images.length)%images.length;
      images.forEach((img,i)=>img.classList.toggle('active',i===index));
      [...dotsWrap.children].forEach((dot,i)=>dot.classList.toggle('active',i===index));
    };
    images.forEach((_,i)=>{
      const dot=document.createElement('button');
      dot.className='slider-dot'+(i===0?' active':'');
      dot.setAttribute('aria-label',`Перейти к слайду ${i+1}`);
      dot.addEventListener('click',()=>setSlide(i));
      dotsWrap.appendChild(dot);
    });
    if(images.length===1){
      if(prev)prev.style.display='none';
      if(next)next.style.display='none';
      return;
    }
    prev?.addEventListener('click',()=>setSlide(index-1));
    next?.addEventListener('click',()=>setSlide(index+1));
  });
}


function initFAQ(){
  document.querySelectorAll('.faq-question').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem=>{
        if(openItem !== item) openItem.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
    });
  });
}


function initParallax(){
  if(window.innerWidth < 921) return;
  document.querySelectorAll('[data-parallax-wrap]').forEach(wrap=>{
    wrap.addEventListener('mousemove', e=>{
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      wrap.querySelectorAll('.parallax-layer').forEach(layer=>{
        const strength = Number(layer.dataset.parallax || 12);
        layer.style.transform = `translate(${x*strength}px, ${y*strength}px)`;
      });
    });
    wrap.addEventListener('mouseleave', ()=>{
      wrap.querySelectorAll('.parallax-layer').forEach(layer=>layer.style.transform='');
    });
  });
}

function initFilters(){
  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const group = btn.dataset.filterGroup;
      const value = btn.dataset.filter;
      document.querySelectorAll(`.filter-btn[data-filter-group="${group}"]`).forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll(`[data-group="${group}"]`).forEach(card=>{
        const category = card.dataset.category;
        const visible = value === 'all' || category === value;
        card.classList.toggle('hidden-by-filter', !visible);
      });
    });
  });
}


function initServicePickers(){
  document.querySelectorAll('[data-service-picker]').forEach(picker=>{
    const hidden = picker.querySelector('input[type="hidden"]');
    const buttons = picker.querySelectorAll('.service-option');
    buttons.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        buttons.forEach(item=>item.classList.remove('is-active'));
        btn.classList.add('is-active');
        if(hidden) hidden.value = btn.dataset.value || btn.textContent.trim();
      });
    });
  });
}

function initMailForms(){
  document.querySelectorAll('[data-mail-form]').forEach(form=>{
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const service = (data.get('service') || '').toString().trim();
      const niche = (data.get('niche') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      const tgText = `Новая заявка с сайта%0A%0AИмя: ${name || '-'}%0AЧто нужно: ${service || '-'}%0AСсылка / ниша: ${niche || '-'}%0A%0AСообщение:%0A${message || '-'}`;
      const plainText = `Новая заявка с сайта

Имя: ${name || '-'}
Что нужно: ${service || '-'}
Ссылка / ниша: ${niche || '-'}

Сообщение:
${message || '-'}`;

      try{
        if(navigator.clipboard && window.isSecureContext){
          await navigator.clipboard.writeText(plainText);
        }
      }catch(err){}

      const deepLink = `tg://resolve?domain=ARTEM_TS1&text=${tgText}`;
      const fallback = `https://t.me/ARTEM_TS1`;

      const notice = document.createElement('div');
      notice.className = 'form-notice';
      notice.textContent = 'Текст заявки скопирован. Сейчас откроется Telegram — просто вставь сообщение и отправь.';
      form.appendChild(notice);

      setTimeout(()=>{ notice.remove(); }, 5000);

      // try Telegram app first
      window.location.href = deepLink;
      setTimeout(()=>{ window.open(fallback, '_blank'); }, 700);
    });
  });
}
