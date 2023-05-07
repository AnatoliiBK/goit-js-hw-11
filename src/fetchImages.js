import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = '35870886-75af865edd7f3268a0fe2e3e2';


export async function getImages(searchQuery, page) {
    try {
      const {data} = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&
      image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
                 
      return data;

    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure("An error occurred while fetching images. Please try again later.");
    }
  }
