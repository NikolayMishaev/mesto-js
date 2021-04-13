export default class UserInfo {
  constructor(dataSelectors) {
    this._name = document.querySelector(dataSelectors.name);
    this._info = document.querySelector(dataSelectors.info);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    }
  }
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.job;
  }
}
