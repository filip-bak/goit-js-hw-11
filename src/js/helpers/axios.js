import axios from 'axios';

const API_KEY = '36341566-f92ccb073025197e607fc0609';
axios.defaults.baseURL = `https://pixabay.com/api/?key=${API_KEY}`;

export let apiData = {
  currentPage: 1,
  itemsPerPage: 20,
  totalHits: 0,
};

export function getTotalPages(totalHits, itemsPerPage) {
  return Math.ceil(totalHits / itemsPerPage) + 1;
}

export async function getData({
  name = '',
  page = apiData.currentPage,
  per_page = 20,
} = {}) {
  try {
    const response = await axios.get('', {
      params: {
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response === 400) {
      return;
    }
  }
}
export function refactoredHits(data) {
  if (data) {
    return data.map(image => {
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
  }
}
