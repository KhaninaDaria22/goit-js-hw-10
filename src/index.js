import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catsInfoDiv: document.querySelector('.cat-info'),
  infoLoader: document.querySelector('.loader'),
  eror: document.querySelector('.error'),
};
const IS_HIDDEN = 'is-hidden';

Notify.init({
  position: 'center-top',
  distance: '45px',
  timeout: 2000,
  cssAnimationStyle: 'zoom',
  fontFamily: 'Arial, sans-serif',
});

refs.breedSelect.classList.add(IS_HIDDEN);
refs.catsInfoDiv.classList.add(IS_HIDDEN);
refs.eror.classList.add(IS_HIDDEN);

refs.breedSelect.addEventListener('change', handleSelectedCatInfoChange);

processFetchedBreeds();

function handleSelectedCatInfoChange(event) {
  const selectedCatIndex = event.currentTarget.selectedIndex;
  const selectedId = event.currentTarget[selectedCatIndex].value;

  refs.infoLoader.classList.remove(IS_HIDDEN);
  refs.eror.classList.add(IS_HIDDEN);
  refs.catsInfoDiv.classList.add(IS_HIDDEN);
  refs.catsInfoDiv.innerHTML = '';

  processFetchedCatByBreed(selectedId);
}

function processFetchedBreeds() {
  fetchBreeds()
    .then(breeds => {
      refs.breedSelect.insertAdjacentHTML(
        'beforeend',
        createOptionsCatMarkup(breeds.data)
      );

      new SlimSelect({
        select: '#single',
        settings: {
          placeholderText: 'Choose your favorite cat',
        },
      });

      refs.infoLoader.classList.add(IS_HIDDEN);
      refs.breedSelect.classList.remove(IS_HIDDEN);
    })
    .catch(() => {
      refs.infoLoader.classList.add(IS_HIDDEN);
      Notify.warning('Oops! Something went wrong! Try reloading the page!');
    });
}

function processFetchedCatByBreed(selectedId) {
  fetchCatByBreed(selectedId)
    .then(cat => {
      refs.infoLoader.classList.add(IS_HIDDEN);
      refs.catsInfoDiv.classList.remove(IS_HIDDEN);
      refs.catsInfoDiv.innerHTML = createCatInfoMarkup(cat.data[0]);
    })
    .catch(() => {
      refs.catsInfoDiv.classList.add(IS_HIDDEN);
      Notify.warning('Oops! Something went wrong! Try reloading the page!');
    });
}

function createCatInfoMarkup({ breeds, url }) {
    const { name, description, temperament } = breeds[0];
    return `
        <img src="${url}" alt="${name}" height=400 class="cat-img">
        <h2 class="cat-name">${name}</h2>
        <p class="cat-description"><span>Description:</span> ${description}</p>
        <p class="cat-temperament"><span>Temperament:</span> ${temperament}</p>
    `;
  }
  function createOptionsCatMarkup(breeds) {
    return (
      placeholderText + breeds.map(breed => createOptionCatMarkup(breed)).join('')
    );
  }
  
  function createOptionCatMarkup({ id, name }) {
    return `<option value="${id}">${name}</option>`;
  }
  
  function placeholderText() {
    return `<option data-placeholder="true"></option>`;
  }





















































































































































































































