const setSubmitButtonState = (submitButtonSelector, inactiveButtonClass, formElement, isFormValid) => {
  const formButton = formElement.querySelector(submitButtonSelector)
  if (isFormValid) {
    formButton.removeAttribute('disabled');
    formButton.classList.remove(inactiveButtonClass);
  } else {
    formButton.setAttribute('disabled', true);
    formButton.classList.add(inactiveButtonClass);
  }
}

const checkAllInputsValidity = (setupValidation, formElement, inputList) => {
  const isFormValid = inputList.every((inputField) => {
    return inputField.validity.valid;
  });
  setSubmitButtonState(setupValidation.submitButtonSelector, setupValidation.inactiveButtonClass, formElement, isFormValid);
}

const showError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (setupValidation, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, setupValidation.inputErrorClass, setupValidation.errorClass);
  } else {
    hideError(formElement, inputElement, setupValidation.inputErrorClass, setupValidation.errorClass);
  }
};

const setEventListeners = (setupValidation, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(setupValidation.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(setupValidation, formElement, inputElement);
      checkAllInputsValidity(setupValidation, formElement, inputList);
    });

  });
}

const enableValidation = (setupValidation) => {
  const formList = Array.from(document.querySelectorAll(setupValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(setupValidation, formElement);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
