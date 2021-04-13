export default class Card {
  constructor(data, cardSelector, {
    handleCardClick
  }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._elementCardLike.addEventListener('click', () => {
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
    this._handleCardClick({
      name: this._name,
      link: this._link
    });
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__place').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._name;
    this._elementCardLike = this._element.querySelector('.card__like');

    this._setEventListeners();

    return this._element;
  }
}
