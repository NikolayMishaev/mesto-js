let buttonEditProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let buttonClosePopup = document.querySelector('.popup__close');
let formPopup = document.querySelector('.popup__form');
let profileTitleName = document.querySelector('.profile__title');
let profileSubtitleName = document.querySelector('.profile__subtitle');
let formNameInput = document.querySelector('.popup__input-name');
let formJobInput = document.querySelector('.popup__input-job');
let cardLikeActive = document.querySelectorAll('.card__like');

cardLikeActive.forEach(function(elem) {
  elem.addEventListener('click', function () {
    this.classList.toggle('card__like_active');
  });
});

buttonEditProfile.addEventListener('click', function () {
  popup.classList.toggle("popup_opened");
  formNameInput.value = profileTitleName.textContent;
  formJobInput.value = profileSubtitleName.textContent;
});

buttonClosePopup.addEventListener('click', function () {
  popup.classList.toggle("popup_opened");
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitleName.textContent = formNameInput.value;
  profileSubtitleName.textContent = formJobInput.value;
  popup.classList.toggle("popup_opened");
}

formPopup.addEventListener('submit', formSubmitHandler);
