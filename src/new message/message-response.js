import ImgApiService from '../apiFetch/apiFetch';

const imgApiService = new ImgApiService();
console.log(imgApiService);

export default function onSuccessGet(response) {
    if (response.data.hits.length === 0) {
        return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
    } else if (imgApiService.page === 1) {
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    } else if (response.data.hits.length < 40) {
        return Notify.info(
            `We're sorry, but you've reached the end of search results.`
        );
    }
}
