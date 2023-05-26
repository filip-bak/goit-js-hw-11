import { getData, apiData, getTotalPages } from './axios';
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

export function infiniteScrollHandler(e) {
  const searchQueryValue = document.querySelector('.search-bar').value;
  const endOfThePage =
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

  const totalPages = getTotalPages(apiData.totalHits, apiData.itemsPerPage);

  if (endOfThePage) {
    showLoader();

    apiData.currentPage++;

    apiData.itemsPerPage = apiPerPageValidation(
      apiData.totalHits,
      apiData.itemsPerPage
    );

    // Validation
    const endOfPages = endOfPagesValidation(totalPages);

    if (endOfPages) {
      return;
    }

    blockCardsOnRenderNewPage(e.target.links);

    // Dev
    // devConsoleLog(totalPages);

    // Data
    const pictures = getData({
      name: searchQueryValue,
      page: apiData.currentPage,
      per_page: apiData.itemsPerPage,
    });

    // Render
    renderPage({ data: pictures });
  }
}

export function preventDefaultHandler(e) {
  e.preventDefault();
}
