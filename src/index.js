import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs/get_refs';
import {
    getImage,
    resetPageCounter,
    incrementPageCounter,
} from './apiFetch/apiFetch';
import { renderMarkup, createMarkup, clearMarkup } from './markup/markup';
import { message } from './new message/message-response';
import LoadMoreBtn from './load-more-btn/load.more.btn';

//Vars
var lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 0.25,
});

let searchQuery = '';
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

//Listeners
refs.searchForm.addEventListener('submit', onSubmitClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

//Functions
function onSubmitClick(evt) {
    evt.preventDefault();
    searchQuery = getValueFromInput(evt);
    if (!searchQuery) return;

    loadMoreBtn.hide();
    clearMarkup(refs.gallery);
    resetPageCounter();
    renderMarkupToDom(searchQuery);
}

function onLoadMoreBtnClick() {
    renderMarkupToDom(searchQuery);
}

async function renderMarkupToDom(searchQuery) {
    try {
        loadMoreBtn.disabled();
        const response = await getImage(searchQuery);

        message(response);
        incrementPageCounter();
        renderMarkup(refs.gallery, createMarkup(response));
        lightboxRefresh();
        loadMoreBtn.enable();
    } catch (error) {
        Notify.failure(`Error! ${error.message}`);
    }
}

function getValueFromInput(evt) {
    return evt.currentTarget.elements.searchQuery.value.trim('');
}

function lightboxRefresh() {
    lightbox.refresh();
}
