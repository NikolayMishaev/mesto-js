import './index.css';
import {
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
  formAddCard,
  popupCardDelete,
  buttonEditAvatar,
  popupEditAvatar,
  formUpdateAvatar,
  sumbitbuttonEditProfile,
  sumbitbuttonAddCard,
  sumbitbuttonUpdateAvatar,
  popupWithErrorMessage,
  containerErrorMessage
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithFormDeleteCard from '../components/PopupWithFormDeleteCard';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '96364424-6290-422a-9d50-b20388f62f83',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(userData);

const popupWithImage = new PopupWithImage(popupFullschreen);
popupWithImage.setEventListeners();

const popupWithCardDelete = new PopupWithFormDeleteCard({
  popupSelector: popupCardDelete,
  handleFormSubmit: ({
    element,
    id
  }) => {
    api.deleteCard(id)
      .then(() => {
        element.remove();
      })
      .catch(err => {
        showErrorMessage(err);
      })
      .finally(() => {
        popupWithCardDelete.close();
      })
  }
});
popupWithCardDelete.setEventListeners();

const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (data) => {
    sumbitbuttonEditProfile.textContent = 'Сохранение...';

    api.updateDataUser(data)
      .then(data => {
        userInfo.setUserInfo(data);
      })
      .catch(err => {
        showErrorMessage(err);
      })
      .finally(() => {
        sumbitbuttonEditProfile.textContent = 'Сохранение';
        popupWithFormEditProfile.close();
      })
  }
})
popupWithFormEditProfile.setEventListeners();

const popupWithFormAddCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (data) => {
    sumbitbuttonAddCard.textContent = 'Сохранение...';
    api.addNewCard(data)
      .then(data => {
        renderCards([data]);
      })
      .catch(err => {
        showErrorMessage(err);
      })
      .finally(() => {
        sumbitbuttonAddCard.textContent = 'Сохранение';
        popupWithFormAddCard.close();
      })

  }
})
popupWithFormAddCard.setEventListeners();

const popupWithFormUpdateAvatar = new PopupWithForm({
  popupSelector: popupEditAvatar,
  handleFormSubmit: (link) => {
    sumbitbuttonUpdateAvatar.textContent = 'Сохранение...';
    api.updateUserAvatar({
        avatar: link.link
      })
      .then(data => {
        userInfo.setUserAvatar({
          link: data.avatar
        });
      })
      .catch(err => {
        showErrorMessage(err);
      })
      .finally(() => {
        sumbitbuttonUpdateAvatar.textContent = 'Сохранение';
        popupWithFormUpdateAvatar.close();
      })
  }
})
popupWithFormUpdateAvatar.setEventListeners();

const formEditProfileValidator = new FormValidator(setupValidation, formEditProfile);
const formAddCardValidator = new FormValidator(setupValidation, formAddCard);
const formUpdateAvatarValidator = new FormValidator(setupValidation, formUpdateAvatar);
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
formUpdateAvatarValidator.enableValidation();

api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
      _id: data._id
    });
    userInfo.setUserAvatar({
      link: data.avatar
    })
  })
  .then(() => {
    api.getInitialCards()
      .then(data => {
        renderCards(data);
      })
      .catch(err => {
        showErrorMessage(err);
      })
  })
  .catch(err => {
    showErrorMessage(err);
  })

const showErrorMessage = (err) => {
  popupWithErrorMessage.classList.add("visible-block");
  containerErrorMessage.textContent = err;
  setTimeout(() => {
    popupWithErrorMessage.classList.remove("visible-block");
  }, 3000);
}

const renderCards = data => {
  const cardList = new Section({
      items: data,
      renderer: (item) => {
        const card = new Card(item, cardTemplate, {
          handleCardClick: (data) => {
            popupWithImage.open(data);
          },
          handleCardLike: (method, id, likeCounter) => {
            api.likeCard(method, id)
              .then(data => {
                likeCounter.textContent = data.likes.length;
              })  .catch(err => {
                showErrorMessage(err);
              })
          }
        }, popupWithCardDelete, userInfo.getUserInfo()._id);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      },
    },
    cardContainer
  );
  cardList.renderItems();
};

buttonEditProfile.addEventListener('click', () => {
  formEditProfileNameInput.value = userInfo.getUserInfo().name;
  formEditProfileJobInput.value = userInfo.getUserInfo().info;
  popupWithFormEditProfile.open();
});

buttonAddCard.addEventListener('click', () => {
  popupWithFormAddCard.open();
});

buttonEditAvatar.addEventListener('click', () => {
  popupWithFormUpdateAvatar.open();
});
