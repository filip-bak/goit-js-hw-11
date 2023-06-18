'use strict';

import 'simplelightbox/dist/simple-lightbox.min.css';
import { elementsToRender, totalPages } from './helpers/handlers';
import { endOfPagesValidation } from './helpers/utils';
import { apiData } from './helpers/axios';

import {
  renderGalleryHandler,
  infiniteScrollHandler,
} from './helpers/handlers';

export let galleryEl;

const InfiniteScroll = require('infinite-scroll');
export let infScroll = new InfiniteScroll('.gallery', {
  path: '.gallery',
  append: elementsToRender,
  history: false,
  scrollThreshold: 100,
});

window.addEventListener('load', () => {
  const searchFormEl = document.querySelector('#search-form');
  galleryEl = document.querySelector('.gallery');

  searchFormEl.addEventListener('submit', renderGalleryHandler);

  infScroll.on('load', infiniteScrollHandler);

  infScroll.on('scrollThreshold', () => {
    endOfPagesValidation(totalPages, infScroll);
    infScroll.pageIndex = apiData.currentPage;
    infScroll.loadCount = apiData.currentPage - 1;
  });
});
