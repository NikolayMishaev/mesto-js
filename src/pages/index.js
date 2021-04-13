import './index.css';
import {
  initialCards,
  setupValidation,
  buttonEditProfile,
  buttonAddCard,
  formEditProfileNameInput,
  formEditProfileJobInput,
  userData,
  popupFullschreen,
  cardTemplate,
  cardContainer,
  popupEditProfile,
  popupAddCard,
  formEditProfile,
  formAddCard
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';

const userInfo = new UserInfo(userData);

const popupWithImage = new PopupWithImage(popupFullschreen);

const PopupWithFormEditProfile = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data)
  }
})

const PopupWithFormAddCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (data) => {
    renderCards([data])
  }
})

const renderCards = data => {
  const cardList = new Section({
      items: data,
      renderer: (item) => {
        const card = new Card(item, cardTemplate, {
          handleCardClick: (data) => {
            popupWithImage.open(data);
            popupWithImage.setEventListeners();
          }
        });
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      },
    },
    cardContainer
  );
  cardList.renderItems();
};

renderCards(initialCards);

const formEditProfileValidator = new FormValidator(setupValidation, formEditProfile);
const formAddCardValidator = new FormValidator(setupValidation, formAddCard);
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

buttonEditProfile.addEventListener('click', () => {
  formEditProfileNameInput.value = userInfo.getUserInfo().name;
  formEditProfileJobInput.value = userInfo.getUserInfo().info;
  PopupWithFormEditProfile.open();
  PopupWithFormEditProfile.setEventListeners();
});

buttonAddCard.addEventListener('click', () => {
  PopupWithFormAddCard.open();
  PopupWithFormAddCard.setEventListeners();
});
