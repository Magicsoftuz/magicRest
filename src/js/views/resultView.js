import View from './View.js';
import icons from '../../img/icons.svg';
class resultView extends View {
  _parenElement = document.querySelector('.results');
  _errorMessage = 'Try again! This recipe is not found in our database. Sorry';

  _generateMarkUp() {
    const datas = this._data.map(data => {
      return this._renderHTML(data);
    });

    return datas.join('');
  }
  _renderHTML(data) {
    return `
          <li class="preview">
            <a class="preview__link" href="#${data.id}">
              <figure class="preview__fig">
                <img src="${data.image}" alt="${data.image}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${data.title}...</h4>
                <p class="preview__publisher">${data.publisher}</p>
                
              </div>
            </a>
          </li>
    `;
  }
}
export default new resultView();
