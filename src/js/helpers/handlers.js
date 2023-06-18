import { getData, apiData, getTotalPages } from './axios';

import { infScroll } from '..';
export let elementsToRender;
export let totalPages;
import {
  apiPerPageValidation,
  endOfPagesValidation,
  blockCardsOnRenderNewPage,
  showLoader,
  devConsoleLog,
} from './utils';
import { renderPage } from './ui';

export function renderGalleryHandler(e) {
  e.preventDefault();

  infScroll.options.scrollThreshold = 100;

  apiData.currentPage = 1;
  apiData.itemsPerPage = 20;

  // Data
  const pictures = getData({
    name: this.searchQuery.value,
    page: apiData.currentPage,
    per_page: apiData.itemsPerPage,
  });

  // Render
  renderPage({
    data: pictures,
    resetPage: true,
    validation: true,
    newLightbox: true,
  });
}

export function infiniteScrollHandler() {
  const searchQueryValue = document.querySelector('.search-bar').value;

  totalPages = getTotalPages(apiData.totalHits, apiData.itemsPerPage);

  apiData.currentPage++;

  apiData.itemsPerPage = apiPerPageValidation(
    apiData.totalHits,
    apiData.itemsPerPage
  );

  const pictures = getData({
    name: searchQueryValue,
    page: apiData.currentPage,
    per_page: apiData.itemsPerPage,
  });

  // Dev
  // devConsoleLog(totalPages);

  // Render
  elementsToRender = renderPage({ data: pictures });
}

export function preventDefaultHandler(e) {
  e.preventDefault();
}
