const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupFullscreen = document.querySelector('.popup_type_fullscreen');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelectorAll('.popup__close');
const formPopupEditProfile = document.querySelector('.popup__form_type_edit-profile');
const formEditProfileNameInput = document.querySelector('.popup__input_type_edit-name');
const formEditProfileJobInput = document.querySelector('.popup__input_type_edit-job');
const formPopupAddCard = document.querySelector('.popup__form_type_add-card');
const formAddCardNameInput = document.querySelector('.popup__input_type_card-name');
const formAddCardLinkInput = document.querySelector('.popup__input_type_card-link');
const profileTitleName = document.querySelector('.profile__title');
const profileSubtitleName = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.cards');
const fullScreenImage = document.querySelector('.popup__fullscreen-image');
const fullScreenCaption = document.querySelector('.popup__caption');

const openPopup = popup => {
  popup.classList.add("visible-block");
};

const closePopup = (popup) => {
  popup.classList.remove("visible-block");
};

const handleSubmitFormEditProfile = evt => {
  evt.preventDefault();
  profileTitleName.textContent = formEditProfileNameInput.value;
  profileSubtitleName.textContent = formEditProfileJobInput.value;
  closePopup(popupEditProfile);
};

const handleSubmitFormAddCard = evt => {
  evt.preventDefault();
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
  cardElement.querySelector('.card__title').textContent = data.name;
  cardElement.querySelector('.card__place').style.backgroundImage = `url(${data.link})`;
  cardElement.querySelector('.card__delete').addEventListener('click', handleDeleteCard);
  cardElement.querySelector('.card__like').addEventListener('click', handleLikeIcon);
  cardElement.querySelector('.card__place').addEventListener('click', () => {
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

initialCards.forEach(data => {
  renderCards(data);
});

buttonClosePopup.forEach(item => {
  item.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});

buttonEditProfile.addEventListener('click', () => {
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
