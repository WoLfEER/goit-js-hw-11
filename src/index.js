import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImgApiService from './apiFetch/apiFetch';
import { refs } from './refs/get_refs';
import { createMarkup, clearMarkup } from './markup/markup';
import LoadMoreBtn from './load-more-btn/load.more.btn';
import { messageWithResponse } from './new message/message-response';

// lightbox init
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

console.log(lightbox);

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const imgApiService = new ImgApiService();

// listeners
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchAndToggle);

// functions
function onSearch(e) {
    e.preventDefault();

    imgApiService.query = e.target.elements.searchQuery.value;

    if (!imgApiService.query) {
        return;
    }
    //   const searchQuery = e.currentTarget.elements.query.value;

    loadMoreBtn.show();
    imgApiService.resetPage();
    clearMarkup();
    fetchAndToggle();
}

function appendToMarkup(response) {
    refs.gallery.insertAdjacentHTML('beforeend', createMarkup(response));
}

function fetchAndToggle() {
    loadMoreBtn.disabled();
    imgApiService.getImage().then(hits => appendToMarkup(hits));
    setTimeout(() => {
        loadMoreBtn.enable();
    }, 400);
}

messageWithResponse(response);
