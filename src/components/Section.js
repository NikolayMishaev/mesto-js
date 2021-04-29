export default class Section {
  constructor({
    api,
    renderer
  }, containerSelector, showErrorMessage) {
    this._api = api;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
    this._showErrorMessage = showErrorMessage;
  }

  _getItems() {
    this._api.getInitialCards()
      .then(data => {
        if (data) {
          this.renderItems(data.reverse());
        }
      })
      .catch(err => {
        this._showErrorMessage(err);
      })
  }

  renderItems(data) {
    data ? data.forEach(item => this._renderer(item)) : this._getItems()
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
