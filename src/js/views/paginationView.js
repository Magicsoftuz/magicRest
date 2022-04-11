import View from './View.js';
import icons from '../../img/icons.svg';
class PaginationView extends View {
  _parenElement = document.querySelector('.pagination');

  addHandlerPagination(handle) {
    this._parenElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.getAttribute('id');

      handle(goToPage);
    });
  }
  _generateMarkUp() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there others have
    if (currentPage === 1 && numPages > 1) {
      return `
      <button id="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }
    //Last Page
    if (numPages === currentPage && numPages > 1) {
      return `
          <button id="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
      `;
    }
    // Other page
    if (currentPage < numPages) {
      return `
      <button id="${currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      <button id="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }

    // only 1 page

    return '';
  }
}
export default new PaginationView();
