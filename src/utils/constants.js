export const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
  info: '.profile__subtitle'
};

const formPopupEditProfile = document.forms['edit-profile'];
export const formEditProfileNameInput = formPopupEditProfile.elements.name;
export const formEditProfileJobInput = formPopupEditProfile.elements.job;
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const popupFullschreen = '.popup_type_fullscreen';
export const cardTemplate = '#card-template';
export const cardContainer = '.cards';
export const popupEditProfile = '.popup_type_edit-profile';
export const popupAddCard = '.popup_type_add-card';
export const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
export const formAddCard = document.querySelector('.popup__form_type_add-card');
