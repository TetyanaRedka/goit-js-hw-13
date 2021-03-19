import config from './config.json';

export default class ApiService {
  constructor() {
    this.requestName = '';
    this.page = 1;
    this.quantityImg = 0;
    this.lastPage = false;
  }

  async fetchImg() {
    this.quantityImg = document.querySelector('.quantity-img').value;
    const fetchData = await fetch(
      `${config.url}?image_type=photo&orientation=horizontal&q=${this.requestName}&page=${this.page}&per_page=${this.quantityImg}&key=${config.key}`,
    );
    const res = await fetchData.json();
    this.lastPage = res.totalHits <= this.page * this.quantityImg;
    return res;
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
