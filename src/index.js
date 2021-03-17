import './styles.css';
import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

import ApiService from './apiService';
import imageForm from './template/galery.hbs';

// +- настроить промежуточный класс кнопке далее, сделать неактивной. вынести на отдельную страницу
// +- настроить иконки
// поменять на асинки
// доп добавить изменение общего стиля фона изменение

// DOM - элементы

const searchForm = document.querySelector('#search-form');
const mainNode = document.querySelector('.container');
const loadMoreBtn = document.querySelector('.next');
const textBtn = document.querySelector('.text-btn');
// класс
const apiService = new ApiService();
// переменные
let adderssScroll = 0;

// слушатели

searchForm.addEventListener('input', debounce(getImage, 1000));
loadMoreBtn.addEventListener('click', getImageNew);
document.addEventListener('click', openImg);

// функции вызова картинок

function getImage(ev) {
  if (!ev.target.value) {
    mainNode.innerHTML = '';
    btnHidden();
    return;
  }
  apiService.name = ev.target.value;
  apiService.resetPage();
  btnWait();
  apiService.fetchImg().then(res => {
    if (!res.hits.length) {
      btnHidden();
      mainNode.innerHTML = imageForm(res.hits);
      return;
    }
    mainNode.innerHTML = imageForm(res.hits);
    btnOk();
  });
}

function getImageNew() {
  apiService.incrementPage();
  btnWait();
  apiService.fetchImg().then(res => {
    mainNode.insertAdjacentHTML('beforeend', imageForm(res.hits));
    adderssScroll = adderssScroll + (340 / 3) * apiService.quantityImg;
    scrollTo();
    btnOk();
  });
}

//функция открытия картинки

function openImg(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;
  const parentHref = e.target.parentNode.getAttribute('href');
  basicLightbox
    .create(`<img width="1400" height="900" src=${parentHref}>`)
    .show();
}

//функция скроллинга

function scrollTo() {
  window.scrollTo({
    top: adderssScroll,
    left: 0,
    behavior: 'smooth',
  });
}

// функции активации кнопок

function btnHidden() {
  loadMoreBtn.classList.add('is-hidden');
}

function btnWait() {
  loadMoreBtn.classList.remove('is-hidden');
  loadMoreBtn.classList.add('is-waiting');
  textBtn.textContent = 'waiting';
}

function btnOk() {
  loadMoreBtn.classList.remove('is-waiting');
  textBtn.textContent = 'Loading next';
}
