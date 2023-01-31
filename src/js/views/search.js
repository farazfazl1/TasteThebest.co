class Search {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const q = this._parentElement.querySelector('.search__field').value;
    this._clearInputField();
    return q;
  }

  handleSearchingAdd(handler, openModal) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      let tagBody = document.querySelector('body');
      handler();
      openModal();

      if (document.querySelector('.recipe > .message')) {
        tagBody.classList.remove('home');
      } else {
        tagBody.classList.add('home');
      }
    });
  }

  _clearInputField() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new Search();
