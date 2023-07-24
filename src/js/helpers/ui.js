import SimpleLightbox from 'simplelightbox';

import { refactoredHits, apiData } from './axios';
import {
  createElement,
  createImg,
  capitalizeFirstLetter,
  searchQueryValidaton,
  showLoader,
  hideLoader,
} from './utils';
import { preventDefaultHandler } from './handlers';
import { galleryEl } from '..';

let lightbox;

export function renderPage({
  data,
  newLightbox = false,
  validation = false,
  resetPage = false,
} = {}) {
  data.then(picture => {
    showLoader();

    try {
      const hits = refactoredHits(picture.hits);

      apiData.totalHits = picture.totalHits - 20;

      if (validation) {
        searchQueryValidaton(hits.length, picture.totalHits);
      }

      if (resetPage) {
        galleryEl.innerHTML = '';
      }

      renderGallery({ data: hits, renderOn: galleryEl });

      if (newLightbox) {
        lightbox = new SimpleLightbox('.gallery .photo-card a', {});
      } else {
        lightbox.destroy();
        lightbox = new SimpleLightbox('.gallery .photo-card a', {});
      }
    } catch (error) {
      console.log(error);
    }

    hideLoader();
  });
}

function renderGallery({ data, renderOn } = {}) {
  let galleryArray = [];
  data.forEach(el => {
    galleryArray.push(photoCardElement(el));
  });
  renderOn.append(...galleryArray);
}

export function photoCardElement(data) {
  //  Destructuring
  const {
    likes,
    comments,
    downloads,
    views,
    tags,
    webformatURL,
    largeImageURL,
  } = data;

  const userData = {
    likes,
    comments,
    downloads,
    views,
  };

  // Creating elements
  const photoCardDiv = createElement({ type: 'div', classes: ['photo-card'] });

  const a = createElement({
    type: 'a',
    href: largeImageURL,
    clickHandler: preventDefaultHandler,
  });

  a.append(
    createImg({
      src: webformatURL,
      alt: tags,
    })
  );

  const infoDiv = createElement({ type: 'div', classes: ['info'] });

  Object.keys(userData).forEach(el => {
    const p = createElement({
      type: 'p',
      innerText: `${userData[el]}`,
      classes: ['info-item'],
    });
    p.prepend(
      createElement({
        type: 'b',
        innerText: capitalizeFirstLetter(el),
      })
    );
    infoDiv.append(p);
  });

  photoCardDiv.append(a, infoDiv);
  return photoCardDiv;
}
