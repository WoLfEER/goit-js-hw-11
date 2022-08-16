import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { pageCounter } from '../const/const';
import { FAILURE_MSG } from '../const/const';
import LoadMoreBtn from '../load-more-btn/load.more.btn';

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

export function message(response) {
    const { totalHits, hits } = response.data;

    if (hits.length === 0) {
        loadMoreBtn.enable();
        return Notify.failure(FAILURE_MSG);
    }

    if (pageCounter === 1) {
        return Notify.success(`Hooray! We found ${totalHits} images.`);
    }
}
