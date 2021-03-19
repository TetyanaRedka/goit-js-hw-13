export default class ActivityBtn {
  constructor({ selector }) {
    this.btn = document.querySelector(selector);
    this.textBtn = document.querySelector('.text-btn');
  }

  btnHidden() {
    this.btn.classList.add('is-hidden');
  }

  btnWait() {
    this.btn.classList.remove('is-hidden');
    this.btn.classList.add('is-waiting');
    this.btn.setAttribute('disabled', 'disabled');
    this.textBtn.textContent = 'waiting';
  }

  btnOk() {
    this.btn.classList.remove('is-waiting');
    this.btn.removeAttribute('disabled', 'disabled');
    this.textBtn.textContent = 'Loading next';
  }

  choiceRules(rules) {
    if (rules) activityBtn.btnOk();
    activityBtn.btnHidden();
  }
}
