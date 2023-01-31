import View from './view.js';
import icons from 'url:../../img/icons.svg';


class Pagination extends View {
///////////////////////////////////////////////////////////////////////////////

    _parentElement = document.querySelector('.pagination');

///////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////

    handlerClick(h) {
        this._parentElement.addEventListener('click', function (e) {
            const button = e.target.closest('.btn--inline');
            
            if(!button) return;

            const goToPage = +button.dataset.goto;
            h(goToPage);
        })
    }

///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////

    _generateHtml() {
        const numberOfPages = Math.ceil(this._data.results.length / this._data.searchPageResult);

        if (this._data.page === 1 && numberOfPages > 1) {
            return `
            <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${this._data.page + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }

        if(this._data.page === numberOfPages && numberOfPages > 1) { 
            return `
            <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${this._data.page - 1}</span>
            </button>
            `;
        }

        if(this._data.page < numberOfPages) {
            return `
            <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${this._data.page - 1}</span>
            </button>
            <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${this._data.page + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        }
        return ``;
    }

///////////////////////////////////////////////////////////////////////////////

}

export default new Pagination();