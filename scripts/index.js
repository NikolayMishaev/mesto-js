const popupList = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupFullscreen = document.querySelector('.popup_type_fullscreen');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelectorAll('.popup__close');
const formPopupEditProfile = document.forms['edit-profile'];
const inputFieldsPopupEditProfile = formPopupEditProfile.querySelectorAll('.popup__input');
const formEditProfileNameInput = formPopupEditProfile.elements.name;
const formEditProfileJobInput = formPopupEditProfile.elements.job;
const editButton = formPopupEditProfile.querySelector('.popup__button-submit');
const formEditProfileInputError = formPopupEditProfile.querySelector('.popup__input-error');
const formPopupAddCard = document.forms['add-card'];
const inputFieldsPopupAddCard = formPopupAddCard.querySelectorAll('.popup__input');
const formAddCardNameInput = formPopupAddCard.elements.name;
const formAddCardLinkInput = formPopupAddCard.elements.link;
const addButton = formPopupAddCard.querySelector('.popup__button-submit');
const formAddCardInputError = formPopupAddCard.querySelector('.popup__input-error');
const profileTitleName = document.querySelector('.profile__title');
const profileSubtitleName = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.cards');
const fullScreenImage = document.querySelector('.popup__fullscreen-image');
const fullScreenCaption = document.querySelector('.popup__caption');

const closePopupPressKey = (evt) => {
  if (evt.key === 'Escape') {
    const popupCurrentOpen = document.querySelector('.visible-block');
    closePopup(popupCurrentOpen);
  }
}

const openPopup = popup => {
  popup.classList.add("visible-block");
  popupCurrentOpen = popup;
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
  const userAddCard = {
    name: '',
    link: ''
  };
  userAddCard.name = formAddCardNameInput.value;
  userAddCard.link = formAddCardLinkInput.value;
  renderCards(userAddCard);
  formPopupAddCard.reset();
  closePopup(popupAddCard);
};

const showCardImageFullscreen = (data) => {
  fullScreenImage.src = data.link;
  fullScreenImage.alt = data.name;
  fullScreenCaption.textContent = data.name;
  openPopup(popupFullscreen);
};

const getCardElement = (data) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementCardPlace = cardElement.querySelector('.card__place');
  cardElement.querySelector('.card__title').textContent = data.name;
  cardElementCardPlace.style.backgroundImage = `url(${data.link})`;
  cardElement.querySelector('.card__delete').addEventListener('click', handleDeleteCard);
  cardElement.querySelector('.card__like').addEventListener('click', handleLikeIcon);
  cardElementCardPlace.addEventListener('click', () => {
    showCardImageFullscreen(data);
  });
  return cardElement;
};

const handleDeleteCard = (evt) => {
  evt.target.parentElement.remove();
};

const handleLikeIcon = (evt) => {
  evt.target.classList.toggle('card__like_active');
};

const renderCards = (data) => {
  cardsContainer.prepend(getCardElement(data));
};

const clearInputsError = (inputFields, formName, inputErrorClass, errorClass) => {
  inputFields.forEach((item) => {
    hideError(formName, item, inputErrorClass, errorClass);
  })
}

initialCards.forEach(data => {
  renderCards(data);
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
  formEditProfileNameInput.value = profileTitleName.textContent;
  formEditProfileJobInput.value = profileSubtitleName.textContent;
  clearInputsError(inputFieldsPopupEditProfile, formPopupEditProfile, `${inputFieldsPopupEditProfile[0].classList[0]}_type_error`, `${formEditProfileInputError.classList[0]}_active`);
  setSubmitButtonState(`.${editButton.classList[0]}`, `${editButton.classList[0]}_disabled`, formPopupEditProfile, true);
  openPopup(popupEditProfile);
});

buttonAddCard.addEventListener('click', () => {
  formPopupAddCard.reset();
  openPopup(popupAddCard);
});


formPopupEditProfile.addEventListener('submit', handleSubmitFormEditProfile);
formPopupAddCard.addEventListener('submit', handleSubmitFormAddCard);
formPopupAddCard.addEventListener('reset', () => {
  setSubmitButtonState(`.${addButton.classList[0]}`, `${addButton.classList[0]}_disabled`, formPopupAddCard, false);
  clearInputsError(inputFieldsPopupAddCard, formPopupAddCard, `${inputFieldsPopupAddCard[0].classList[0]}_type_error`, `${formAddCardInputError.classList[0]}_active`);
});
