import './index.css';
import {
  initialCards,
  setupValidation,
  buttonEditProfile,
  buttonAddCard,
  formEditProfileNameInput,
  formEditProfileJobInput
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';

const userInfo = new UserInfo({
  name: '.profile__title',
  info: '.profile__subtitle'
});

const handleCardClick = () => {
  return new PopupWithImage('.popup_type_fullscreen');
}

const renderCards = data => {
  const cardList = new Section({
      items: data,
      renderer: (item) => {
        const card = new Card(item, '#card-template', handleCardClick);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      },
    },
    '.cards'
  );
  cardList.renderItems();
};

renderCards(initialCards);

const formList = Array.from(document.querySelectorAll(setupValidation.formSelector));
formList.forEach(formElement => {
  const formValidator = new FormValidator(setupValidation, formElement);
  formValidator.enableValidation();
});

buttonEditProfile.addEventListener('click', () => {
  formEditProfileNameInput.value = userInfo.getUserInfo().name;
  formEditProfileJobInput.value = userInfo.getUserInfo().info;
  new PopupWithForm({
    popupSelector: '.popup_type_edit-profile',
    handleFormSubmit: (data) => {
      userInfo.setUserInfo({
        name: data[0],
        info: data[1]
      })
    }
  }).open();
});

buttonAddCard.addEventListener('click', () => {
  new PopupWithForm({
    popupSelector: '.popup_type_add-card',
    handleFormSubmit: (data) => {
      renderCards([{
        name: data[0],
        link: data[1]
      }])
    }
  }).open();
});
