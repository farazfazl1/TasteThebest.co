import * as model from './model.js';
import recipeView, { Recipe } from './views/recView.js';
import search, {Search} from './views/search.js';
import result, {Result} from './views/results.js';
import pagination, {Pagination} from './views/pagination.js';
import bookmarksView, {Bookmarks} from './views/bookmarks.js';

if(module.hot){
  module.hot.accept();
}

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const farazPagination = document.querySelector('.faraz_pagination');
const modalContainer = document.querySelector('.main_box_c');
const menuButton = document.querySelector('.recipe__user-generated');



/////////////////////////////////////////////////////////////
//FIRST MESSAGE POP
const first_message_pop = document.querySelector('.first_message_pop');
const first_message_blur = document.querySelector('.first_message_blur');




/////////////////////////////////////////////////////////////
const controlRecepies = async function() {

  try {

    const idHash = window.location.hash.slice(1);
    if(!idHash) return;
    recipeView.loadingSpinner();


    await model.loadRecepie(idHash);
    recipeView.render(model.state.recipe);

    }
    
    catch (error) {
    console.log(error);
    recipeView.handleError(`👨🏻‍🍳 Invalid Recepie. Please try again 💪🏽`)
  }
};
/////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////
const controlSearcher = async function () {
  try {
    result.loadingSpinner()

    const query = search.getQuery();
    if(!query) return; 

    await model.loadingSearchResults(query)

    result.render(model.getSearchPage(1));
    pagination.render(model.state.search)
    openModal(query)

  } catch (error) {
    console.log(error);
  } 
};
/////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////
const buttonPaginationControl = function (goTo) {

  result.render(model.getSearchPage(goTo));
  pagination.render(model.state.search)

};
/////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////
const controlServings = function (newNumServings) {
  
  model.updateServingSize(newNumServings);
  recipeView.render(model.state.recipe)
  
};
/////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////
const controlAddBookmark = function () {

  if(!model.state.recipe.bookmarked) {
    model.saveRecipeBookmark(model.state.recipe);
  }

  else {
    model.deleteBookmark(model.state.recipe.id);
  }
  
  console.log(model.state.recipe);
  //UPDATE ISSUE NEEDS FIXING
  bookmarksView.render(model.state.bookmarks);
}


const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const bringUpMenu = function () {
  farazPagination.classList.remove('hidden');
  modalContainer.classList.remove('hidden');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}
/////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////
const openModal = async function (query) {

  if(!query) return;
  
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  farazPagination.classList.remove('hidden');
  modalContainer.classList.remove('hidden');
}

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  farazPagination.classList.add('hidden');
  modalContainer.classList.add('hidden');

};

overlay.addEventListener('click', closeModal);    ///OVERLAY DISSAPEARS
btnCloseModal.addEventListener('click', closeModal);  //CLOSES RESULTS MODAL NY USER TO SEE RECIPE
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
const init = function () {
  bookmarksView.addHandlerRender(controlBookmark);
  recipeView.renderHandle(controlRecepies);
  recipeView.handleMinusPlusServings(controlServings);
  recipeView.handleBookmark(controlAddBookmark);
  recipeView.handleMenuBack(bringUpMenu);



  search.handleSearchingAdd(controlSearcher, openModal);
  pagination.handlerClick(buttonPaginationControl); 

};

setTimeout(() => {
  console.log(`Hello There`);
  first_message_pop.classList.add('hidden');
  first_message_blur.classList.add('hidden');
}, 4000);

init();


////////////////////////////////////////////////////////////////////////////////////

