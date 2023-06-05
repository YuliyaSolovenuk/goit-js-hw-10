const URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_mSwGUKoXYunBo6hvv1tIqC14vJGSh7zTKqZ9hdbtd0GoqB9ybmD3juk0cDxqbrYZ';

export function fetchBreeds() {
  return fetch(`${URL}breeds?api_key = ${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${URL}images/${breedId}?api_key = ${API_KEY}`).then(
    response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }
  );
}
