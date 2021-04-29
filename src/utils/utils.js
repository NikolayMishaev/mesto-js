import {
popupWithErrorMessage,
containerErrorMessage
} from '../utils/constants.js';

export const renderLoading = (submitButton, status) => {
  submitButton.textContent = status;
}

export const showErrorMessage = (err) => {
  popupWithErrorMessage.classList.add("visible-block");
  containerErrorMessage.textContent = err;
  setTimeout(() => {
    popupWithErrorMessage.classList.remove("visible-block");
  }, 3000);
}
