import { getData, apiData } from './axios';
import { apiValidation, showLoader } from './utils';
import { renderPage } from './ui';

export function renderGalleryHandler(e) {
  e.preventDefault();

  apiData.itemsPerPage = 20;

  const pictures = getData({
    name: this.searchQuery.value,
    page: 1,
    per_page: apiData.itemsPerPage,
  });

  renderPage({
    data: pictures,
    resetPage: true,
    validation: true,
    newLightbox: true,
  });
}

export function infiniteScrollHandler() {
  const searchQueryValue = document.querySelector('.search-bar').value;
  const endOfThePage =
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

  if (endOfThePage) {
    showLoader();
    apiData.currentPage++;

    apiData.itemsPerPage = apiValidation(
      apiData.totalPages,
      apiData.itemsPerPage
    );

    const pictures = getData({
      name: searchQueryValue,
      page: apiData.currentPage,
      per_page: apiData.itemsPerPage,
    });
    renderPage({ data: pictures });
  }
}

export function preventDefaultHandler(e) {
  e.preventDefault();
}
