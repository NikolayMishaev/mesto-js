import {
  openPopup,
  popupFullscreen,
  fullScreenImage,
  popupCaption
} from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }
  _setEventListeners() {
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeIcon();
    });
    this._element.querySelector('.card__place').addEventListener('click', () => {
      this._showCardImageFullscreen();
    });
  }
  _handleDeleteCard() {
    this._element.remove();
  }
  _handleLikeIcon() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }
  _showCardImageFullscreen() {
    fullScreenImage.src = this._link;
    fullScreenImage.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(popupFullscreen);
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__place').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
