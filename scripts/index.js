let popup = document.querySelector('.popup');
let buttonEditProfile = document.querySelector('.profile__edit-button');
let buttonClosePopup = document.querySelector('.popup__close');
let formPopup = document.querySelector('.popup__form');
let profileTitleName = document.querySelector('.profile__title');
let profileSubtitleName = document.querySelector('.profile__subtitle');
let formNameInput = document.querySelector('.popup__input-name');
let formJobInput = document.querySelector('.popup__input-job');
let cardLikeActive = document.querySelectorAll('.card__like');

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitleName.textContent = formNameInput.value;
  profileSubtitleName.textContent = formJobInput.value;
  closePopup();
}

buttonEditProfile.addEventListener('click', function () {
  formNameInput.value = profileTitleName.textContent;
  formJobInput.value = profileSubtitleName.textContent;
  openPopup();
});

buttonClosePopup.addEventListener('click', closePopup);

formPopup.addEventListener('submit', formSubmitHandler);

cardLikeActive.forEach(function(elem) {
  elem.addEventListener('click', function () {
    this.classList.toggle('card__like_active');
  });
});
