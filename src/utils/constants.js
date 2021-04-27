export const setupValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const userData = {
  name: '.profile__title',
  info: '.profile__subtitle',
  avatar: '.profile__avatar'
};

const formPopupEditProfile = document.forms['edit-profile'];
const formPopupAddCard = document.forms['add-card'];
const formPopupUpdateAvatar = document.forms['update-avatar'];
export const sumbitbuttonEditProfile = formPopupEditProfile.querySelector('.popup__button-submit');
export const sumbitbuttonAddCard = formPopupAddCard.querySelector('.popup__button-submit');
export const sumbitbuttonUpdateAvatar = formPopupUpdateAvatar.querySelector('.popup__button-submit');
export const formEditProfileNameInput = formPopupEditProfile.elements.name;
export const formEditProfileJobInput = formPopupEditProfile.elements.about;
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const buttonEditAvatar = document.querySelector('.profile__avatar');
export const popupFullschreen = '.popup_type_fullscreen';
export const popupCardDelete = '.popup_type_delete-card';
export const cardTemplate = '#card-template';
export const cardContainer = '.cards';
export const popupEditProfile = '.popup_type_edit-profile';
export const popupAddCard = '.popup_type_add-card';
export const popupEditAvatar = '.popup_type_update-avatar';
export const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
export const formAddCard = document.querySelector('.popup__form_type_add-card');
export const formUpdateAvatar = document.querySelector('.popup__form_type_update-avatar');
export const popupWithErrorMessage = document.querySelector('.popup_type_error-message');
export const containerErrorMessage = popupWithErrorMessage.querySelector('.popup__title_type_error-message');
