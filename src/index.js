import './styles.css';
import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

import ApiService from './apiService';
import ActivityBtn from './activityBtn';
import imageForm from './template/galery.hbs';

// +- настроить промежуточный класс кнопке далее, сделать неактивной
// доп добавить изменение общего стиля фона изменение
// добавить сабмит

// DOM - элементы

const searchForm = document.querySelector('#search-form');
const mainNode = document.querySelector('.container');
const submitBtn = document.querySelector('.submit');

// переменные
const apiService = new ApiService();
const activityBtn = new ActivityBtn({
  selector: '.next',
});

let addScroll = 0;

// слушатели

// searchForm.addEventListener('input', debounce(getImage, 1000)) // вариант 1
searchForm.addEventListener('click', getImage); // вариант 2
activityBtn.btn.addEventListener('click', getImageNew);
document.addEventListener('click', openImg);

// функции вызова картинок

async function getImage(ev) {
  ev.preventDefault(); //вариант 2

  if (!ev.currentTarget.elements.query.value) {
    mainNode.innerHTML = '';
    activityBtn.btnHidden();
    return;
  }
  apiService.name = ev.currentTarget.elements.query.value; // вариант 2
  // apiService.name = ev.target.value; // вариант 1
  apiService.resetPage();
  activityBtn.btnWait();
  const res = await apiService.fetchImg();
  mainNode.innerHTML = imageForm(res.hits);

  if (!res.hits.length) {
    activityBtn.btnHidden();
    return;
  }
  if (res.totalHits <= apiService.page * apiService.quantityImg) {
    activityBtn.btnHidden();
    return;
  }
  activityBtn.btnOk();
}

async function getImageNew() {
  apiService.incrementPage();
  activityBtn.btnWait();
  const res = await apiService.fetchImg();
  mainNode.insertAdjacentHTML('beforeend', imageForm(res.hits));
  addScroll = addScroll + (340 / 3) * apiService.quantityImg;
  scrollTo();
  if (res.totalHits <= apiService.page * apiService.quantityImg) {
    activityBtn.btnHidden();
    return;
  }
  activityBtn.btnOk();
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
    top: addScroll,
    left: 0,
    behavior: 'smooth',
  });
}
