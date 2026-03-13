
document.addEventListener('DOMContentLoaded', () => {


  const html       = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');

  const savedTheme = localStorage.getItem('vds-theme') || 'light';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('vds-theme', next);
  });

  function applyTheme(theme) {
    html.dataset.theme = theme;
    themeIcon.className = theme === 'dark'
      ? 'bi bi-sun-fill'
      : 'bi bi-moon-stars-fill';
  }


  /* ============ NAVBAR SCROLL ============ */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });


  /* ============ HAMBURGER MENU ============ */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  /* ============ HERO CAROUSEL ============ */
  const slides    = document.querySelectorAll('.hero-slide');
  const dots      = document.querySelectorAll('.dot');
  let current     = 0;
  let autoTimer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5500);
  }

  document.getElementById('slidePrev').addEventListener('click', () => {
    goTo(current - 1);
    startAuto();
  });

  document.getElementById('slideNext').addEventListener('click', () => {
    goTo(current + 1);
    startAuto();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
      startAuto();
    });
  });

  startAuto();


  /* ============ STATS COUNTER ============ */
  const statNums = document.querySelectorAll('.stat-num');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      let start    = 0;
      const step   = Math.ceil(target / 60);

      const tick = () => {
        start = Math.min(start + step, target);
        el.textContent = start.toLocaleString('pt-BR') + suffix;
        if (start < target) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => countObserver.observe(el));


  /* ============ SCROLL REVEAL (AOS simples) ============ */
  const aosItems = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('aos-visible');
        }, i * 100);
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  aosItems.forEach(el => aosObserver.observe(el));


  /* ============ CART ============ */
  let cart = JSON.parse(localStorage.getItem('vds-cart') || '[]');
  updateCartUI();

  window.addToCart = function(name, price) {
    cart.push({ id: Date.now(), name, price });
    localStorage.setItem('vds-cart', JSON.stringify(cart));
    updateCartUI();
    showToast(`${name} adicionado ao carrinho!`);
    bumpBadge();
  };

  window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('vds-cart', JSON.stringify(cart));
    updateCartUI();
  };

  window.closeCart = function() {
    document.getElementById('cartModal').classList.remove('open');
    document.body.style.overflow = '';
  };

  document.getElementById('cartBtn').addEventListener('click', () => {
    document.getElementById('cartModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  document.getElementById('cartModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('cartModal')) closeCart();
  });

  function updateCartUI() {
    const badge    = document.getElementById('cartBadge');
    const items    = document.getElementById('cartItems');
    const totalEl  = document.getElementById('cartTotal');
    const totalVal = document.getElementById('totalValue');

    badge.textContent = cart.length;

    if (cart.length === 0) {
      items.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
      totalEl.style.display = 'none';
    } else {
      items.innerHTML = cart.map(item => `
        <div class="cart-item">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price">R$ ${item.price.toLocaleString('pt-BR')}</span>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      `).join('');

      const total = cart.reduce((acc, i) => acc + i.price, 0);
      totalVal.textContent = `R$ ${total.toLocaleString('pt-BR')}`;
      totalEl.style.display = 'flex';
    }
  }

  function bumpBadge() {
    const badge = document.getElementById('cartBadge');
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
  }


  /* ============ TOAST ============ */
  let toastTimer;

  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }


  /* ============ FORM ============ */
  const form = document.getElementById('orcamentoForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simples validação visual
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
        valid = false;
        field.addEventListener('input', () => {
          field.style.borderColor = '';
          field.style.boxShadow = '';
        }, { once: true });
      }
    });

    if (!valid) return;

    // Simula envio
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.innerHTML = '<span>Enviar orçamento</span><i class="bi bi-send"></i>';
      btn.disabled = false;
      document.getElementById('formSuccess').classList.add('show');
      showToast('Orçamento enviado com sucesso!');
      setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
    }, 1500);
  });

  /* ============ SMOOTH SCROLL to sections ============ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});