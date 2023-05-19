import axios from 'axios';

const API_KEY = '36341566-f92ccb073025197e607fc0609';
axios.defaults.baseURL = `https://pixabay.com/api/?key=${API_KEY}`;

export let apiData = {
  currentPage: 1,
  itemsPerPage: 20,
  totalPages: 0,
};

export async function getData({ name, page = 1, per_page = 20 } = {}) {
  try {
    const response = await axios.get('', {
      params: {
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}
export function refactoredHits(data) {
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
