import {MAIN_URL} from './config.js';
import { getJson } from './views/helpers.js';



export const state = {
    recipe: {},
    search: {
        querySt: '',
        results: [],
        searchPageResult: 5,
        page: 1,
    },
    
    bookmarks: [],
};


export const loadRecepie = async function (idHash) {

    try {
        const data = await getJson(`${MAIN_URL}/${idHash}`);
        
        
        const {recipe} = data.data
        
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher ,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };

        if(state.bookmarks.some(b => b.id === idHash)) {
            state.recipe.bookmarked = true;
        }
        else{
            state.recipe.bookmarked = false;
        }

    } catch (error) {
        console.error(`💥💥💥💥 ${error} 💥💥💥💥`);
    }
};


export const loadingSearchResults = async function (querySt) {
    try {
        state.search.querySt = querySt;

        const data = await getJson(`${MAIN_URL}/?search=${querySt}`)

        state.search.results = data.data.recipes.filter(rec => rec.publisher != 'All Recipes')
        .map(rec => {
            return {
            id: rec.id,
            title: rec.title,
            publisher: rec.publisher,
            image: rec.image_url,
            };
        });

        

    } catch (error) {
        console.log(`💥💥💥💥 ${error} 💥💥💥💥`);
        throw error;
    }
};


export const getSearchPage = function (page = state.search.page) {

    state.search.page = page;
    
    const start = (page - 1) * state.search.searchPageResult;
    const end = (page * state.search.searchPageResult);

    return state.search.results.slice(start, end)
};

export const updateServingSize = function (num) {
    
    state.recipe.ingredients.forEach(element => {
        element.quantity = element.quantity * num / state.recipe.servings;
            //Formula for servings
    });

    state.recipe.servings = num;
};


const saveBookmarkAtLocalStorage = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
} 


export const saveRecipeBookmark = function (recipe) {
    state.bookmarks.push(recipe);

    if(recipe.id === state.recipe.id){
        state.recipe.bookmarked = true;
            //setting new property on bookmark when added to
    }

    saveBookmarkAtLocalStorage();
};

export const deleteBookmark = function (idHash) {

    const index = state.bookmarks.findIndex(e => e.id === idHash);
    state.bookmarks.splice(index, 1);

    if(idHash === state.recipe.id){
        state.recipe.bookmarked = false;
            //Setting to not bookmarke
    }

    saveBookmarkAtLocalStorage();
};

const init = function () {
    const storage = localStorage.getItem('bookmarks');

    if (storage) {
        state.bookmarks = JSON.parse(storage)
    }
}

init();
console.log(state.bookmarks);
