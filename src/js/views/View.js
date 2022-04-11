import icons from '../../img/icons.svg';
export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    this._clear();
    this._parenElement.insertAdjacentHTML('afterbegin', this._generateMarkUp());
  }

  _clear() {
    this._parenElement.innerHTML = '';
  }

  spinner() {
    let html = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div> 
      `;
    this._clear();
    this._parenElement.insertAdjacentHTML('afterbegin', html);
  }
  renderError(message = this._errorMessage) {
    const html = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parenElement.insertAdjacentHTML('afterbegin', html);
  }
}
