// Мобильное меню
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}
// Закрытие меню по клику на ссылку (моб.)
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('active'));
});
// Модальное окно бронирования
const bookTableBtn = document.getElementById('bookTableBtn');
const bookingPopup = document.getElementById('bookingPopup');
const closeBookingPopup = document.getElementById('closeBookingPopup');
const popupBookingForm = document.getElementById('popupBookingForm');

if (bookTableBtn && bookingPopup && closeBookingPopup && popupBookingForm) {
  bookTableBtn.addEventListener('click', () => {
    bookingPopup.classList.add('show');
    document.body.style.overflow = 'hidden';
  });

  closeBookingPopup.addEventListener('click', () => {
    bookingPopup.classList.remove('show');
    document.body.style.overflow = '';
  });

  bookingPopup.addEventListener('click', (e) => {
    if (e.target === bookingPopup) {
      bookingPopup.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  popupBookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const date = this.elements['date'].value;
    const time = this.elements['time'].value;
    const guests = this.elements['guests'].value;
    
    // Проверка даты (не может быть в прошлом)
    const selectedDate = new Date(date + 'T' + time);
    const now = new Date();
    if (selectedDate < now) {
      alert('Нельзя забронировать столик на прошедшее время');
      return;
    }
    
    // Проверка времени работы по дням недели
    const dayOfWeek = selectedDate.getDay(); // 0 = воскресенье, 1 = понедельник, ..., 6 = суббота
    const hour = parseInt(time.split(':')[0]);
    const minute = parseInt(time.split(':')[1]);
    const timeInMinutes = hour * 60 + minute;
    
    let isOpen = false;
    let closingTime = '';
    
    if (dayOfWeek >= 1 && dayOfWeek <= 4) { // Понедельник-Четверг
      isOpen = timeInMinutes >= 600 && timeInMinutes <= 1320; // 10:00-22:00
      closingTime = '22:00';
    } else if (dayOfWeek === 5 || dayOfWeek === 6) { // Пятница-Суббота
      isOpen = timeInMinutes >= 600 && timeInMinutes <= 1380; // 10:00-23:00
      closingTime = '23:00';
    } else if (dayOfWeek === 0) { // Воскресенье
      isOpen = timeInMinutes >= 600 && timeInMinutes <= 1320; // 10:00-22:00
      closingTime = '22:00';
    }
    
    if (!isOpen) {
      alert(`Ресторан работает с 10:00 до ${closingTime}. Выберите другое время.`);
      return;
    }
    
    // Проверка количества гостей
    if (guests < 1 || guests > 100) {
      alert('Количество гостей должно быть от 1 до 100');
      return;
    }
    
    alert('Спасибо за бронирование! Мы свяжемся с вами.');
    this.reset();
    bookingPopup.classList.remove('show');
    document.body.style.overflow = '';
  });
}
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
  
  // Устанавливаем минимальную дату для полей бронирования
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.min = today;
  });
});
// Галерея-слайдер
const slider = document.getElementById('gallerySlider');
const slides = slider ? slider.querySelectorAll('.slide') : [];
let currentSlide = 0;
let prevSlide = 0;
let direction = 1; // 1 — вправо, -1 — влево

if (slider && slides.length > 0) {
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
  
  const prevSlideBtn = document.getElementById('prevSlide');
  const nextSlideBtn = document.getElementById('nextSlide');
  
  if (prevSlideBtn) prevSlideBtn.onclick = () => showSlide(currentSlide - 1, -1);
  if (nextSlideBtn) nextSlideBtn.onclick = () => showSlide(currentSlide + 1, 1);
  
  // Показываем первый слайд при загрузке
  slides.forEach(slide => {slide.classList.remove('active'); slide.classList.remove('prev'); slide.classList.remove('prev-left'); slide.classList.remove('prev-right');});
  slides[0].classList.add('active');
}
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
// Обработка форм (заглушка)
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.onsubmit = function(e) {
    e.preventDefault();
    const date = this.elements['date'].value;
    const time = this.elements['time'].value;
    const guests = this.elements['guests'].value;
    
    // Проверка даты (не может быть в прошлом)
    const selectedDate = new Date(date + 'T' + time);
    const now = new Date();
    if (selectedDate < now) {
      alert('Нельзя забронировать столик на прошедшее время');
      return;
    }
    
    // Проверка времени работы по дням недели
    const dayOfWeek = selectedDate.getDay(); // 0 = воскресенье, 1 = понедельник, ..., 6 = суббота
    const hour = parseInt(time.split(':')[0]);
    const minute = parseInt(time.split(':')[1]);
    const timeInMinutes = hour * 60 + minute;
    
    let isOpen = false;
    let closingTime = '';
    
    if (dayOfWeek >= 1 && dayOfWeek <= 4) { // Понедельник-Четверг
      isOpen = timeInMinutes >= 600 && timeInMinutes <= 1320; // 10:00-22:00
      closingTime = '22:00';
    } else if (dayOfWeek === 5 || dayOfWeek === 6) { // Пятница-Суббота
      isOpen = timeInMinutes >= 600 && timeInMinutes <= 1380; // 10:00-23:00
      closingTime = '23:00';
    } else if (dayOfWeek === 0) { // Воскресенье
      isOpen = timeInMinutes >= 600 && timeInMinutes <= 1320; // 10:00-22:00
      closingTime = '22:00';
    }
    
    if (!isOpen) {
      alert(`Ресторан работает с 10:00 до ${closingTime}. Выберите другое время.`);
      return;
    }
    
    // Проверка количества гостей
    if (guests < 1 || guests > 100) {
      alert('Количество гостей должно быть от 1 до 100');
      return;
    }
    
    alert('Спасибо за бронирование! Мы свяжемся с вами.');
    this.reset();
  };
}

const contactsForm = document.getElementById('contactsForm');
if (contactsForm) {
  contactsForm.onsubmit = function(e) {
    e.preventDefault();
    const name = this.elements['name'].value.trim();
    const phone = this.elements['phone'].value.trim();
    const message = this.elements['message'].value.trim();
    let error = '';
    
    if (name.length < 2) error += 'Введите корректное имя (минимум 2 символа)\n';
    
    // Улучшенная валидация телефона (разрешает +7, 8, пробелы, скобки, дефисы)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      error += 'Введите корректный номер телефона (минимум 10 цифр)\n';
    }
    
    if (message.length < 5) error += 'Введите сообщение (минимум 5 символов)\n';
    
    if (error) {
      alert(error);
      return;
    }
    alert('Спасибо за обращение! Мы свяжемся с вами.');
    this.reset();
  };
}

// Кнопка "Наверх"
const toTop = document.getElementById('toTop');
if (toTop) {
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
} 