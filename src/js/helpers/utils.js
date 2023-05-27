import { Notify } from 'notiflix';
Notify.init({
  pauseOnHover: false,
  timeout: 4500,
});
import { apiData } from './axios';

export {
  createElement,
  createImg,
  apiPerPageValidation,
  searchQueryValidaton,
  endOfHitsValidation,
  endOfPagesValidation,
  capitalizeFirstLetter,
  blockCardsOnRenderNewPage,
  showLoader,
  hideLoader,
  devConsoleLog,
};

// RENDER
function createElement({ type, innerText, classes, href, clickHandler } = {}) {
  const elem = document.createElement(type);
  if (classes) elem.classList.add(...classes);
  if (innerText) elem.textContent = innerText;
  if (href) elem.href = href;
  if (clickHandler) elem.addEventListener('click', clickHandler);
  return elem;
}
function createImg({ src, alt, lazyLoading = true } = {}) {
  const imgEl = document.createElement('img');
  if (src) imgEl.src = src;
  if (alt) imgEl.alt = alt;
  if (lazyLoading) imgEl.setAttribute('loading', 'lazy');
  return imgEl;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// LOADER
function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('show');
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('show');
}

// VALIDATION
function searchQueryValidaton(numberOfHits, totalHits) {
  if (!numberOfHits) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notify.success(`Hooray! We found ${totalHits} images.`);
}
function endOfPagesValidation(totalPages) {
  if (apiData.currentPage > totalPages) {
    apiData.currentPage = totalPages + 1;
    setTimeout(() => {
      endOfHitsValidation();
      hideLoader();
    }, 500);
  }
  return apiData.currentPage > totalPages;
}

function endOfHitsValidation() {
  Notify.info("We're sorry, but you've reached the end of search results.");
}

function apiPerPageValidation(totalHits, itemsPerPage) {
  // if there is uneven total numbers of hits then render them 20 per page
  const amount = totalHits % itemsPerPage;
  if (amount) {
    return 20;
  } else {
    return 40;
  }
}

function blockCardsOnRenderNewPage(links) {
  const lastLinks = [...links].slice(-16);

  lastLinks.forEach(el => {
    el.classList.add('disabled');
  });
  setTimeout(() => {
    lastLinks.forEach(el => {
      el.classList.remove('disabled');
    });
  }, 800);
}

// DEV
function devConsoleLog(totalPages = 0) {
  console.log('totalPages:', totalPages);
  console.log('currentPage:', apiData.currentPage);
  console.log('totalHits: ', apiData.totalHits + 20);
  console.log('itemsPerPage: ', apiData.itemsPerPage);
}
