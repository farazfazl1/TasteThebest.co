import View from './view.js';
import icons from 'url:../../img/icons.svg';
import Fraction from 'fractional';

class Recipe extends View {
  _parentElement = document.querySelector('.recipe');

  handleMinusPlusServings(h) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--upd-servings');

      if (!button) return;
      const updatePN = +button.dataset.updTo;

      if (updatePN > 0) {
        h(updatePN);
      }
    });
  }

  handleBookmark(h) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--bookmark');

      if (!button) return;

      h();
    });
  }

  handleMenuBack(h) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.recipe__user-generated');

      if (!button) return;

      h();
    });
  }

  _generateHtml() {
    let tagBody = document.querySelector('body');

    if (document.querySelector('.recipe > .message')) {
      tagBody.classList.remove('home');
    } else {
      tagBody.classList.add('home');
    }

    return `
        <figure class="recipe__fig">
            <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
            <h1 class="recipe__title">
                <span>${this._data.title}</span>
            </h1>
            </figure>
    
            <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  this._data.cookingTime
                }</span>
                <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  this._data.servings
                }</span>
                <span class="recipe__info-text">servings</span>
    
                <div class="recipe__info-buttons">
                <button class="btn--tiny btn--upd-servings" data-upd-to ="${
                  this._data.servings - 1
                }">
                    <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                </button>
                <button class="btn--tiny btn--upd-servings" data-upd-to ="${
                  this._data.servings + 1
                }">
                    <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                </button>
                </div>
            </div>
    
            <button class="btn--round recipe__user-generated">
                <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9I
                    jBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAzMCAzMCIKc3R5bGU9ImZpbGw6I0ZGRkZGRj
                    siPgo8cGF0aCBkPSJNIDMgNyBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgMyA5IEwgMjcgOSBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgMj
                    cgNyBMIDMgNyB6IE0gMyAxNCBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgMyAxNiBMIDI3IDE2IEEgMS4wMDAxIDEuMDAwMSAwIDEgMCAy
                    NyAxNCBMIDMgMTQgeiBNIDMgMjEgQSAxLjAwMDEgMS4wMDAxIDAgMSAwIDMgMjMgTCAyNyAyMyBBIDEuMDAwMSAxLjAwMDEgMCAxID
                    AgMjcgMjEgTCAzIDIxIHoiPjwvcGF0aD4KPC9zdmc+"/>
            </button>
            <button class="btn--round btn--bookmark">
                <svg class="">
                <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
                </svg>
            </button>
            </div>
    
            <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${this._data.ingredients
              .map(ing => {
                return `
                <li class="recipe__ingredient">
                <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${
                  ing.quantity
                    ? new Fraction.Fraction(ing.quantity).toString()
                    : ''
                }</div>
                <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit}</span>
                    ${ing.description}
                </div>
                </li>
                `;
              })
              .join('')}
            </ul>
            </div>
    
            <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${
                  this._data.publisher
                }</span>. Please check out
                directions at their website.
            </p>
            <a
                class="btn--small recipe__btn"
                href="${this._data.sourceUrl}"
                target="_blank"
            >
                <span>Directions</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </a>
            </div>`;
  }

  handleError(message) {
    const html = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  successMessage(message) {
    const html = `
        <div class="message">
        <div>
            <svg>
            <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
        </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}

export default new Recipe();
