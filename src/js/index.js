import 'simplelightbox/dist/simple-lightbox.min.css';

import {
  renderGalleryHandler,
  infiniteScrollHandler,
} from './helpers/handlers';

export let galleryEl;

window.addEventListener('load', () => {
  const searchFormEl = document.querySelector('#search-form');
  galleryEl = document.querySelector('.gallery');

  // loader from notiflix
  // change stucture of files
  // throttle the scroll eventListener
  // wait until img loads (setTimeout())

  searchFormEl.addEventListener('submit', renderGalleryHandler);
  window.addEventListener('scroll', infiniteScrollHandler);
});
