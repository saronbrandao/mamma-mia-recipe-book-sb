import View from './view';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  curPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    this.curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);
    //the scenarios are:
    //page 1, and there are other pages
    if (this.curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('t', 'f');
    }

    //last page
    if (this.curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('f', 't');
    }
    //other page
    if (this.curPage < numPages) {
      return this._generateMarkupButton('t', 't');
    }
    //page 1, and there are no other pages
    return '';
  }

  _generateMarkupButton(n, p) {
    const nextMarkupButton = `<button data-goto="${
      this.curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${this.curPage + 1}</span>
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </button>`;
    const prevMarkupButton = `<button data-goto="${
      this.curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this.curPage - 1}</span>
      </button>`;
    if (n === 't' && p === 'f') {
      return nextMarkupButton;
    }
    if (n === 'f' && p === 't') {
      console.log(prevMarkupButton);
      return prevMarkupButton;
    }
    if (n === 't' || p === 't') {
      return `${prevMarkupButton}${nextMarkupButton}`;
    }
  }
}

export default new PaginationView();
