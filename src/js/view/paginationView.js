import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest(".btn--inline");
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }
    _generateMarkup() {
        const curPage = this._data.page;
        let prev;
        const numsPage = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        //page 1, and there are other pages
        if (curPage === 1 && numsPage > 1) {
            return this._generatePaginationButton(curPage, prev = true);
        }

        //Last page
        if (curPage === numsPage && numsPage > 1) {
            return this._generatePaginationButton(curPage, prev = false);
        }

        //Other page
        if (curPage < numsPage) {
            return this._generatePaginationButton(curPage);
        }

        return ``;
    }

    _generatePaginationButton(curPage, prev) {
        if (prev == false) {
            return `<button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${curPage - 1}</span>
                    </button>`
        } else if (prev == true) {
            return `<button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                        <span>Page ${curPage + 1}</span>
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                    </button>`;
        } else {
            return `<button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${curPage - 1}</span>
                    </button>
                    <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                        <span>Page ${curPage + 1}</span>
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                    </button>`;
        }

    }
}


export default new PaginationView();