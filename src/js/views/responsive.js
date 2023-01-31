/* Responsive js */

let searchForm = document.querySelector('form.search');
let homeMessage = document.querySelector('.recipe > .message');
let tagBody = document.querySelector('body');

if (homeMessage) {
  tagBody.classList.remove('home');
} else {
  tagBody.classList.add('home');
}
