// async function getImage(searchQuery) {
//   const searchParams = {
//     key: '14498242-ce1d690e276d857725a7a7b28',
//     image_type: 'photo',
//     q: `${searchQuery}`,
//     orientation: 'horizontal',
//     safesearch: 'true',
//     per_page: 40,
//   };
//   const response = await axios.get(`${BASE_URL}?${searchParams}`);
//   console.log(response);
// }

// getImage();
// URLsearch();
const axios = require('axios').default;

export default class ImgApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async getImage() {
        const BASE_URL = 'https://pixabay.com/api/';
        const KEY = '14498242-ce1d690e276d857725a7a7b28';
        const PARAMS = `image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

        try {
            const response = await axios.get(
                `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&${PARAMS}&page=${this.page}`
            );
            this.incrementPage();
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        return (this.searchQuery = newQuery);
    }
}
