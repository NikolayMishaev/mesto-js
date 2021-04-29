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
    if (data.name) {
      this._name.textContent = data.name;
    }
    if (data.about) {
      this._info.textContent = data.about;
    }
    if (data._id) {
      this._id = data._id;
    }


  }
  setUserAvatar({
    link
  }) {
    if (link) {
      this._avatar.style.backgroundImage = `url(${link})`;
    }
  }
}
