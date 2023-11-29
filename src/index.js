import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    select: document.querySelector('.breed-select'), 
    loader: document.querySelector('.loader'),
    catInfo: document.querySelector('.cat-info'),
    errorCat: document.querySelector('.error'),
};

const IS_HIDDEN = 'is-hidden';

refs.select.classList.add(IS_HIDDEN); 
refs.catInfo.classList.add(IS_HIDDEN);
refs.errorCat.classList.add(IS_HIDDEN);
refs.loadar.classList.add(IS_HIDDEN);

refs.select.addEventListener('change', selectChangeHandler);

showFetchedBreeds();

function selectChangeHandler(e) {
    const selectedCatIndex = e.currentTarget.selectedIndex;
    const selectedId = e.currentTarget[selectedCatIndex].value;

    
    refs.loader.classList.remove(IS_HIDDEN);
    refs.catInfo.classList.add(IS_HIDDEN);
    refs.catInfo.innerHTML = '';

    showFetchedCatBreed(selectedId);
}

function showFetchedBreeds() {
    fetchBreeds()
        .then(breeds => {
            refs.select.insertAdjacentHTML(
                'beforeend',
                createMarkup(breeds.data)
            );

            new SlimSelect({
                select: '#single',
                settings: {
                    placeholderText: 'Select the desired cat'
                },
            });

            refs.loader.classList.add(IS_HIDDEN);
            refs.select.classList.remove(IS_HIDDEN);
        })
        .catch(() => {
            refs.loadar.classList.add(IS_HIDDEN);
            refs.select.classList.add(IS_HIDDEN); 
            Notiflix.Notify.failure(
                'Oops! Something went wrong! Try reloading the page!'
              );
        });
}

function showFetchedCatBreed(selectedId) {
    fetchCatByBreed(selectedId)
        .then(cat => {
            refs.loader.classList.add(IS_HIDDEN);
            refs.catInfo.classList.remove(IS_HIDDEN);
            refs.catInfo.innerHTML = createCatMarkup(cat.data[0]);
        })
        .catch(() => {
            refs.select.classList.add(IS_HIDDEN);
            refs.loadar.classList.add(IS_HIDDEN);
            Notiflix.Notify.failure(
                'Oops! Something went wrong! Try reloading the page!'
              );
        });
}

function createCatMarkup({ breeds, url }) {
    const { name, description, temperament } = breeds[0];
    return `
      <img src="${url}" alt="${name}" height="300" class="cat-img">
      <h2 ${name}</h2>
      <p <span>Description:</span> ${description}</p>
      <p c<span>Temperament:</span> ${temperament}</p>
  `;
}


function createMarkup(breeds) {
    return (`<option data-placeholder="true"></option>` +
        breeds.map(breed => createOptionMarkup(breed)).join(''));
}

function createOptionMarkup({ id, name }) {
    return `<option value="${id}">${name}</option>`;
}






















































































































































































































