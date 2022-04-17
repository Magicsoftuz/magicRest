import View from './View.js';
import icons from '../../img/icons.svg';
class BookmarkView extends View {
  _parenElement = document.querySelector('.bookmarks__list');
  _errorMessage = ' No bookmarks yet. Find a nice recipe and bookmark it :)';

  _generateMarkUp() {
    const datas = this._data.map(data => {
      return this._renderHTML(data);
    });

    return datas.join('');
  }
  addHandlerLocal(handle) {
    window.addEventListener('load', handle);
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
export default new BookmarkView();
