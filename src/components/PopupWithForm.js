import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._boundhandleSubmit = this._handleSubmit.bind(this);
  }
  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    const inputsValues = this._inputList.map(input=> {
      return input.value;
    })
    return inputsValues;
  }
  _handleSubmit () {
    this._handleFormSubmit(this._getInputValues());
    this.close(this._popup);
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form = this._popup.querySelector('.popup__form')
    this._form.addEventListener('submit', this._boundhandleSubmit);
  }
  close() {
    super.close();
    this._form.removeEventListener('submit', this._boundhandleSubmit);
    this._form.reset();
  }
}
