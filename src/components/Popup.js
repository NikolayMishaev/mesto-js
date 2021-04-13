export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._boundhandleClosePopup = this._handleClosePopup.bind(this);
    this._boundhandleEscClose = this._handleEscClose.bind(this)
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(this._popup);
    }
  }
  _handleClosePopup(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.close(this._popup);
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._boundhandleClosePopup);
    document.addEventListener('keydown', this._boundhandleEscClose);
  }
  open() {
    this._popup.classList.add("visible-block");
  }
  close() {
    this._popup.classList.remove("visible-block");
    document.removeEventListener('keydown', this._boundhandleEscClose);
    this._popup.removeEventListener('click', this._boundhandleClosePopup);
  }
}
