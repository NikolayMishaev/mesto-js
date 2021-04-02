import
Card
from './card.js';
import {
  FormValidator,
  FormValidatorEditProfile
} from './FormValidator.js';
import {
  initialCards,
  setupValidation
} from './constants.js';

const popupList = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelectorAll('.popup__close');
const formPopupEditProfile = document.forms['edit-profile'];
const formEditProfileNameInput = formPopupEditProfile.elements.name;
const formEditProfileJobInput = formPopupEditProfile.elements.job;
const formPopupAddCard = document.forms['add-card'];
const formAddCardNameInput = formPopupAddCard.elements.name;
const formAddCardLinkInput = formPopupAddCard.elements.link;
const profileTitleName = document.querySelector('.profile__title');
const profileSubtitleName = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.cards');
export const popupFullscreen = document.querySelector('.popup_type_fullscreen');
export const fullScreenImage = document.querySelector('.popup__fullscreen-image');
export const popupCaption = document.querySelector('.popup__caption');

const closePopupPressKey = (evt) => {
  if (evt.key === 'Escape') {
    const popupCurrentOpen = document.querySelector('.visible-block');
    closePopup(popupCurrentOpen);
  }
}

export const openPopup = popup => {
  popup.classList.add("visible-block");
  document.addEventListener('keydown', closePopupPressKey);
};

const closePopup = (popup) => {
  popup.classList.remove("visible-block");
  document.removeEventListener('keydown', closePopupPressKey);
};

const handleSubmitFormEditProfile = evt => {
  profileTitleName.textContent = formEditProfileNameInput.value;
  profileSubtitleName.textContent = formEditProfileJobInput.value;
  closePopup(popupEditProfile);
};

const handleSubmitFormAddCard = evt => {
  const userAddCard = {};
  userAddCard.name = formAddCardNameInput.value;
  userAddCard.link = formAddCardLinkInput.value;
  const card = new Card(userAddCard, '#card-template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  formPopupAddCard.reset();
  closePopup(popupAddCard);
};

initialCards.forEach(data => {
  const card = new Card(data, '#card-template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
});

const formList = Array.from(document.querySelectorAll(setupValidation.formSelector));
formList.forEach(formElement => {
  const formValidator = formElement.classList.contains('popup__form_type_edit-profile')
  ? new FormValidatorEditProfile(setupValidation, formElement)
  : new FormValidator(setupValidation, formElement);
  formValidator.enableValidation();
});

popupList.forEach(item => {
  item.children[0].addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
});

popupList.forEach(item => {
  item.addEventListener('click', (evt) => {
    closePopup(evt.target);
  });
});

buttonClosePopup.forEach(item => {
  item.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});

buttonEditProfile.addEventListener('click', () => {
  formPopupEditProfile.reset();
  formEditProfileNameInput.value = profileTitleName.textContent;
  formEditProfileJobInput.value = profileSubtitleName.textContent;
  openPopup(popupEditProfile);
});

buttonAddCard.addEventListener('click', () => {
  formPopupAddCard.reset();
  openPopup(popupAddCard);
});

formPopupEditProfile.addEventListener('submit', handleSubmitFormEditProfile);
formPopupAddCard.addEventListener('submit', handleSubmitFormAddCard);
