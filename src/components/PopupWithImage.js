import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._fullScreenImage = this._popup.querySelector('.popup__fullscreen-image');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }
  open(data) {
    super.open();
    this._fullScreenImage.src = data.link;
    this._fullScreenImage.alt = data.name;
    this._popupCaption.textContent = data.name;
  }
}
