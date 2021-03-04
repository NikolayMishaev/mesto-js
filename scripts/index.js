const popupContainer = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup__container_popup_edit-profile');
const popupAddCard = document.querySelector('.popup__container_popup_add-card');
const popupFullscreen = document.querySelector('.popup__fullscreen');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelectorAll('.popup__close');
const formPopupEditProfile = document.querySelector('.popup__form_form_edit-profile');
const formEditProfileNameInput = document.querySelector('.popup__input-first_input_edit-name');
const formEditProfileJobInput = document.querySelector('.popup__input-second_input_edit-job');
const formPopupAddCard = document.querySelector('.popup__form_form_add-card');
const formAddCardNameInput = document.querySelector('.popup__input-first_input_card-name');
const formAddCardLinkInput = document.querySelector('.popup__input-second_input_card-link');
const profileTitleName = document.querySelector('.profile__title');
const profileSubtitleName = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.cards');
const fullScreenImage = document.querySelector('.popup__fullscreen-image');
const fullScreenCaption = document.querySelector('.popup__caption');
const initialCards = [{
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

const openPopup = popup => {
  popup.classList.add("visible-block");
  popupContainer.classList.add("visible-block");
};

const closePopup = (popup) => {
  popup.classList.remove("visible-block");
  popupContainer.classList.remove("visible-block");
};

const formEditProfileSubmitHandler = evt => {
  evt.preventDefault();
  profileTitleName.textContent = formEditProfileNameInput.value;
  profileSubtitleName.textContent = formEditProfileJobInput.value;
  closePopup(popupEditProfile);
};

const formAddCardSubmitHandler = evt => {
  evt.preventDefault();
  addCard(formAddCardNameInput.value, formAddCardLinkInput.value);
  cardsContainer.prepend(cardsContainer.lastElementChild);
  formAddCardNameInput.value = '';
  formAddCardLinkInput.value = '';
  closePopup(popupAddCard);
};

const CardImageFullscreen = item => {
  fullScreenImage.src = item.getAttribute('style').slice(22, -1);
  fullScreenImage.alt = item.nextElementSibling.textContent;
  fullScreenCaption.textContent = item.nextElementSibling.textContent;
  popupContainer.classList.add("popup_theme_dark");
  openPopup(popupFullscreen);
};

const addCard = (name, link) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__place').setAttribute('style', `background-image: url(${link})`);
  cardElement.querySelector('.card__delete').addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  });
  cardElement.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__place').addEventListener('click', (evt) => {
    CardImageFullscreen(evt.target);
  });
  cardsContainer.append(cardElement);
};

initialCards.forEach(item => {
  addCard(item.name, item.link);
});

buttonClosePopup.forEach(item => {
  item.addEventListener('click', (evt) => {
    closePopup(evt.target.parentElement);
  });
});

buttonEditProfile.addEventListener('click', () => {
  popupContainer.classList.remove("popup_theme_dark");
  formEditProfileNameInput.value = profileTitleName.textContent;
  formEditProfileJobInput.value = profileSubtitleName.textContent;
  openPopup(popupEditProfile);
});

buttonAddCard.addEventListener('click', () => {
  popupContainer.classList.remove("popup_theme_dark");
  formAddCardNameInput.value = '';
  formAddCardLinkInput.value = '';
  openPopup(popupAddCard);
});

formPopupEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formPopupAddCard.addEventListener('submit', formAddCardSubmitHandler);
