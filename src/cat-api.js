import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = "live_0WCQEkT06oS6k2FFSpPGQ5VaKTxGK4xElKeIAX9C5X5nSBE34wmQGXhP2TCFoyZ8";
const END_POINT_BREEDS = 'breeds';
const END_POINT_IMAGES = 'images/search';

axios.defaults.headers.common["x-api-key"] = API_KEY;


export function fetchBreeds() {
    return axios.get(`${BASE_URL}/${END_POINT_BREEDS}`);
}

export function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}/${END_POINT_IMAGES}?breed_ids=${breedId}`);
}
