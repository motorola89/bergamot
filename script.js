// Мобильное меню
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');
navToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});
// Закрытие меню по клику на ссылку (моб.)
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('active'));
});
// Фильтрация меню
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
function animateMenuItems(items) {
  items.forEach((item, idx) => {
    item.classList.remove('menu-animate');
    // Сброс анимации
    void item.offsetWidth;
    item.style.animationDelay = (0.05 + idx * 0.1) + 's';
    item.classList.add('menu-animate');
    item.addEventListener('animationend', function handler() {
      item.classList.remove('menu-animate');
      item.style.animationDelay = '';
      item.removeEventListener('animationend', handler);
    });
  });
}
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    menuItems.forEach(item => {
      const show = (filter === 'all' || item.dataset.category === filter);
      item.style.display = show ? '' : 'none';
    });
    // Анимируем только видимые
    animateMenuItems(Array.from(menuItems).filter(item => item.style.display !== 'none'));
  });
});
// Анимация при первой загрузке
window.addEventListener('DOMContentLoaded', () => {
  animateMenuItems(Array.from(menuItems));
});
// Галерея-слайдер
const slider = document.getElementById('gallerySlider');
const slides = slider.querySelectorAll('.slide');
let currentSlide = 0;
let prevSlide = 0;
let direction = 1; // 1 — вправо, -1 — влево
function showSlide(idx, dir = 1) {
  slides[prevSlide].classList.remove('prev');
  slides[prevSlide].classList.remove('active');
  slides[prevSlide].classList.remove('prev-left');
  slides[prevSlide].classList.remove('prev-right');
  slides[currentSlide].classList.remove('active');
  slides[currentSlide].classList.remove('prev');
  slides[currentSlide].classList.remove('prev-left');
  slides[currentSlide].classList.remove('prev-right');
  prevSlide = currentSlide;
  currentSlide = (idx + slides.length) % slides.length;
  if (dir === -1) {
    slides[prevSlide].classList.add('prev-left');
  } else {
    slides[prevSlide].classList.add('prev-right');
  }
  slides[currentSlide].classList.add('active');
}
document.getElementById('prevSlide').onclick = () => {
  showSlide(currentSlide - 1, -1);
};
document.getElementById('nextSlide').onclick = () => {
  showSlide(currentSlide + 1, 1);
};
// Показываем первый слайд при загрузке
slides.forEach(slide => {slide.classList.remove('active'); slide.classList.remove('prev'); slide.classList.remove('prev-left'); slide.classList.remove('prev-right');});
slides[0].classList.add('active');
// Плавный скролл для якорей
for (const link of document.querySelectorAll('a[href^="#"]')) {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
// Cookie-баннер
const cookieBanner = document.getElementById('cookieBanner');
const cookieOk = document.getElementById('cookieOk');
if (!localStorage.getItem('cookieAccepted')) {
  cookieBanner.classList.remove('hide');
}
cookieOk.onclick = () => {
  cookieBanner.classList.add('hide');
  localStorage.setItem('cookieAccepted', '1');
};
// Кнопка "Наверх"
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    toTop.style.display = 'inline-block';
  } else {
    toTop.style.display = 'none';
  }
});
toTop.onclick = (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
// Обработка форм (заглушка)
document.getElementById('bookingForm').onsubmit = function(e) {
  e.preventDefault();
  alert('Спасибо за бронирование! Мы свяжемся с вами.');
  this.reset();
};
const contactsForm = document.getElementById('contactsForm');
if (contactsForm) {
  contactsForm.onsubmit = function(e) {
    e.preventDefault();
    const name = this.elements['name'].value.trim();
    const phone = this.elements['phone'].value.trim();
    const message = this.elements['message'].value.trim();
    let error = '';
    if (name.length < 2) error += 'Введите корректное имя (минимум 2 символа)\n';
    if (!/^\d{6,}$/.test(phone.replace(/\D/g, ''))) error += 'Введите корректный телефон (только цифры, минимум 6)\n';
    if (message.length < 5) error += 'Введите сообщение (минимум 5 символов)\n';
    if (error) {
      alert(error);
      return;
    }
    alert('Спасибо за обращение! Мы свяжемся с вами.');
    this.reset();
  };
}
document.getElementById('subscribeForm').onsubmit = function(e) {
  e.preventDefault();
  alert('Спасибо за подписку!');
  this.reset();
}; 