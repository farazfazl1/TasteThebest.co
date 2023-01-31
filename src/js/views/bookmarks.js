import View from './view.js';
import icons from 'url:../../img/icons.svg';

class Bookmarks extends View{

///////////////////////////////////////////////////////////////////////////////

    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No Bookmarks yet. Find a nice recipe and save it 👨🏻‍🍳';

///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////

    addHandlerRender(h) {
        window.addEventListener('load', h);
    }
///////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////

    _generateHtml() {
        return this._data.map(this._generateHtmlPreview).join('')
    }

    _generateHtmlPreview(r) {
        return `
        <li class="preview">
            <a class="preview__link" href="#${r.id}">
            <figure class="preview__fig">
                <img src="${r.image}" alt="Test" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${r.title}</h4>
                <p class="preview__publisher">${r.publisher}</p>
            </div>
            </a>
        </li>
        `
    }

///////////////////////////////////////////////////////////////////////////////

}
export default new Bookmarks();