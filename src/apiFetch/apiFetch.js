import axios from 'axios';
import { SEARCH_PARAMS, BASE_URL } from '../const/const';

export let pageCounter = 1;

export async function getImage(searchQuery) {
    try {
        SEARCH_PARAMS.append('q', searchQuery);
        SEARCH_PARAMS.append('page', pageCounter);

        const response = await axios.get(`${BASE_URL}?${SEARCH_PARAMS}`);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export function resetPageCounter() {
    pageCounter = 1;
}

export function incrementPageCounter() {
    pageCounter += 1;
}
