import View from './view.js';
import icons from 'url:../../img/icons.svg';

class Results extends View {
  _parentElement = document.querySelector('.modal');
  _errorMessage = 'No recipes found! Please try a different recipe 👨🏻‍🍳';

  _generateHtml() {
    return this._data.map(this._generateHtmlPreview).join('');
  }

  _generateHtmlPreview(r) {
    /////////// button
    return `
        <li class="preview" >
        <button class="pre_button"><a class="preview__link" href="#${r.id}">
            <figure class="preview__fig">
                <img src="${r.image}" alt="Test" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${r.title}</h4>
                <p class="preview__publisher">${r.publisher}</p>
            </div>
        </button></a>
        </li>
        `;
  }
}

export default new Results();
