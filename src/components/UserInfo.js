export default class UserInfo {
  constructor(dataSelectors) {
    this._name = document.querySelector(dataSelectors.name);
    this._info = document.querySelector(dataSelectors.info);
    this._avatar = document.querySelector(dataSelectors.avatar);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
      _id: this._id
    }
  }
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    this._id = data._id;
  }
  setUserAvatar({
    link
  }) {
    this._avatar.style.backgroundImage = `url(${link})`;
  }
}
