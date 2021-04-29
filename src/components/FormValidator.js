export default class FormValidator {
  constructor(setupValidation, formElement) {
    this._formSelector = setupValidation.formSelector;
    this._inputSelector = setupValidation.inputSelector;
    this._submitButtonSelector = setupValidation.submitButtonSelector;
    this._inactiveButtonClass = setupValidation.inactiveButtonClass;
    this._inputErrorClass = setupValidation.inputErrorClass;
    this._errorClass = setupValidation.errorClass;
    this._formElement = formElement;
  }
  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  _showError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }
  _setSubmitButtonState(isFormValid) {
    const formButton = this._formElement.querySelector(this._submitButtonSelector);
    if (isFormValid) {
      formButton.removeAttribute('disabled');
      formButton.classList.remove(this._inactiveButtonClass);
    } else {
      formButton.setAttribute('disabled', true);
      formButton.classList.add(this._inactiveButtonClass);
    }
  }
  _checkAllInputsValidity(inputList) {
    const isFormValid = inputList.every((inputField) => {
      return inputField.validity.valid;
    });
    this._setSubmitButtonState(isFormValid);
  }
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._checkAllInputsValidity(this._inputList);
      });

    });
  }
  enableValidation() {
    console.log(`произошло включение валидации, для ${this._formElement.getAttribute('name')} очистка полей при этом не сработала`);
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this._formElement.addEventListener('reset', () => {
      console.log('произошло событие reset, сработала очистка полей');
      if (this._formElement.classList.contains('popup__form_type_edit-profile')) {
        this._setSubmitButtonState(true);
      } else {
        this._setSubmitButtonState(false);
      }

      this._inputList.forEach((inputElement) => {
        console.log('Данный функционал не работает при включении валидации. Он навешен на событие "reset" формы и отрабатывает только при наступлении события "reset" формы. Если его удалить, то при reset ошибки останутся видимыми');
        this._hideError(inputElement);
      });
    });
  }
}
