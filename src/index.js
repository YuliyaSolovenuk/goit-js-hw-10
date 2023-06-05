import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const breedSelectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

Notiflix.Notify.init({
  width: '400px',
  position: 'left-top',
});

breedSelectEl.addEventListener('change', onChange);

loaderEl.classList.remove('is-hidden');
fetchBreeds()
  .then(res => {
    renderMarkupSelectionList(res);
    loaderEl.classList.add('is-hidden');
    breedSelectEl.classList.remove('is-hidden');
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    //errorEl.classList.remove('is-hidden');
    breedSelectEl.classList.add('is-hidden');
    loaderEl.classList.add('is-hidden');
  });

function onChange(event) {
  const breedIndex = breedSelectEl.selectedIndex;
  const selectOptions = breedSelectEl.options[breedIndex];
  const selectedValue = selectOptions.value;

  catInfoEl.innerHTML = '';
  loaderEl.classList.remove('is-hidden');

  fetchCatByBreed(selectedValue)
    .then(cat => {
      catInfoEl.classList.add('is-hidden');
      loaderEl.classList.remove('is-hidden');
      renderMarkupCatInfo(cat);
      loaderEl.classList.add('is-hidden');
      catInfoEl.classList.remove('is-hidden');
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      //errorEl.classList.remove('is-hidden');
      breedSelectEl.classList.add('is-hidden');
      loaderEl.classList.add('is-hidden');
    });
}

function renderMarkupSelectionList(breeds) {
  const markupSelectionList = breeds
    .map(breed => {
      return `
    <option value=${breed.reference_image_id}>${breed.name}</option>
    `;
    })
    .join('');

  breedSelectEl.innerHTML = markupSelectionList;
}

function renderMarkupCatInfo(cat) {
  catInfoEl.innerHTML = `<div><img src="${cat.url}" alt="${cat.breeds[0].name} width="500"></div><div class="info-wrapper"><h2>${cat.breeds[0].name}</h2><p>${cat.breeds[0].description}</p><p><b>Temperament:</b> ${cat.breeds[0].temperament}</p></div>`;
}
