import axios from 'axios';
import { Notify } from 'notiflix';

let searchFormEl;
let searchButtonEl;
let galleryEl;

API_KEY = '36341566-f92ccb073025197e607fc0609';
axios.defaults.baseURL = `https://pixabay.com/api/?key=${API_KEY}`;

function renderPictures(e) {
  e.preventDefault();
  // render page 1 from api
  const pictures = getPictures(this.searchQuery.value);

  pictures.then(picture => {
    console.log(picture);
  });
}

function refactoredHits(data) {
  const refactoredData = data.map(image => {
    return {
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
      likes: image.likes,
      views: image.views,
      comments: image.comments,
      downloads: image.downloads,
    };
  });
  return refactoredData;
}
async function getPictures(name) {
  try {
    const response = await axios.get('', {
      params: {
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    });
    const { hits } = response.data;

    if (!hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    response.data.hits = refactoredHits(hits);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('load', () => {
  searchFormEl = document.querySelector('#search-form');
  searchButtonEl = document.querySelector('.search-button');
  galleryEl = document.querySelector('.gallery');

  searchFormEl.addEventListener('submit', renderPictures);
});
