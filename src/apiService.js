import config from './config.json';

export default class ApiService {
  constructor() {
    this.requestName = '';
    this.page = 1;
    this.quantityImg = 0;
  }

  fetchImg() {
    this.quantityImg = document.querySelector('.quantity-img').value;
    return fetch(
      `${config.url}?image_type=photo&orientation=horizontal&q=${this.requestName}&page=${this.page}&per_page=${this.quantityImg}&key=${config.key}`,
    ).then(res => res.json());
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page++;
  }

  get name() {
    return this.requestName;
  }

  set name(newName) {
    this.requestName = newName;
  }
}
