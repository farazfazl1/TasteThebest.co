import icons from 'url:../../img/icons.svg';


export default class View {

    _data;

    render(data) {
        if(!data || (Array.isArray(data) && data.length === 0)) {
            return this.handleError();
        }

        this._data = data;
        const html = this._generateHtml();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', html)

    }

    renderHandle(handler) {
        window.addEventListener('hashchange', handler);
        window.addEventListener('load', handler);
    }


    _clear() {
        this._parentElement.innerHTML = '';
    }



    loadingSpinner() {
        const html = `
        <div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div>;`

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', html);

    };

    handleError(message = this._errorMessage) {
        const html = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>`

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', html)
    }
}