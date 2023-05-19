import { Notify, Loading } from 'notiflix';
Notify.init({
  pauseOnHover: false,
  timeout: 4500,
});

export {
  createElement,
  createImg,
  apiValidation,
  searchQueryValidaton,
  endOfHitsValidation,
  capitalizeFirstLetter,
};

function createElement({
  type,
  innerText,
  classes = [],
  href,
  clickHandler,
} = {}) {
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

function endOfHitsValidation() {
  Notify.info("We're sorry, but you've reached the end of search results.");
}

function apiValidation(totalHits, itemsPerPage) {
  // if there is uneven total numbers of hits then render them 20 per page
  const amount = totalHits % itemsPerPage;
  if (amount) {
    return 20;
  } else {
    return 40;
  }
}
