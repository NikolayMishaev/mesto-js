export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._boundhandleClosePopup = this._handleClosePopup.bind(this);
  }
  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close(this._popup);
    }
  }
  _handleClosePopup(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.close(this._popup);
    }
  }

  _setEventListeners() {
    this._popup.addEventListener('click', this._boundhandleClosePopup);
  }
  open() {
    this._popup.classList.add("visible-block");
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._setEventListeners();
  }
  close() {
    this._popup.classList.remove("visible-block");
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._boundhandleClosePopup);
  }
}
