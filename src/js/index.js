'use strict';

import 'simplelightbox/dist/simple-lightbox.min.css';

import {
  renderGalleryHandler,
  infiniteScrollHandler,
} from './helpers/handlers';

export let galleryEl;

window.addEventListener('load', () => {
  const searchFormEl = document.querySelector('#search-form');
  galleryEl = document.querySelector('.gallery');

  // add end arrow button to go to the start of the page

  searchFormEl.addEventListener('submit', renderGalleryHandler);
  window.addEventListener('scroll', infiniteScrollHandler);
});
