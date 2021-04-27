export default class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(res => {
        return this._checkStatus(res)
      });
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(res => {
        return this._checkStatus(res)
      });
  }
  updateDataUser(data) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(res => {
        return this._checkStatus(res)
      });
  }
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(res => {
        return this._checkStatus(res)
      });
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => {
        return this._checkStatus(res)
      });
  }
  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(res => {
        return this._checkStatus(res)
      });
  }
  likeCard(method, id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: method,
        headers: this._headers
      })
      .then(res => {
        return this._checkStatus(res)
      });
  }
}
