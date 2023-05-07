import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import { getImages } from "./fetchImages";
// import { page } from "./fetchImages";
// import { responseHits } from "./fetchImages";
// import { responseTotalHits } from "./fetchImages";

const formR = document.querySelector(".search-form");
const imageContainer = document.querySelector(".gallery")
const buttonLM = document.querySelector(".load-more");
const bodyDes = document.querySelector("body")

const galleryLightBox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",	

    captionPosition: "down",
    
    captionDelay: 250,
    
    nav: "false",
});

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = '35870886-75af865edd7f3268a0fe2e3e2';

let page = 1;
let responseHits;
let responseTotalHits;
let search;

async function getImages(searchQuery) {
    try {
      const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
           
      responseHits = response.data.hits;
      responseTotalHits = response.data.totalHits;
    //   console.log(responseHits);
    //   console.log(responseTotalHits)
      return responseHits;

    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure("An error occurred while fetching images. Please try again later.");
    }
  }


formR.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    bodyDes.style.backgroundColor = "white";
    imageContainer.innerHTML = "";
    buttonLM.style.display = "none"
    page = 1;
    search = event.target.elements.searchQuery.value.trim();
    // console.log(search)
    if (!search) {
        return
    }


    getImages(search).then((data) => {
        if (data.length === 0) {
          Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");  
        } else {
            imageContainer.insertAdjacentHTML("beforeend", createMarkup(data));
            galleryLightBox.refresh();
            if (page !== Math.ceil(responseTotalHits / data.length)) {
                buttonLM.style.display = "block";
                
            } else {
                if (data.length === responseTotalHits) {
                    buttonLM.style.display = "none";
                    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                  }
                
            }

        }   
        
    })
    .catch(err => 
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."));
}

buttonLM.addEventListener("click", onClickLM)

function onClickLM() {
    page += 1;

    getImages(search).then((data) => {
        
        if (page === Math.ceil(responseTotalHits / data.length) - 1) {
            buttonLM.style.display = "none";
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.", {
                timeout: 12000,
                position: 'bottom-left',
                delay: 3000,
            });
            

        }
        imageContainer.insertAdjacentHTML("beforeend", createMarkup(data));
        galleryLightBox.refresh();
        

        
    })
    .catch(err => 
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."));
    
}

function createMarkup(responseHits) {
    return responseHits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
    `<div class="photo-card">
        <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300">
        </a>
        <div class="info">
            <p class="info-item">Likes
                <b>${likes}</b>
            </p>
            <p class="info-item">Views
                <b>${views}</b>
            </p>
            <p class="info-item">Comments
                <b>${comments}</b>
            </p>
            <p class="info-item">Downloads
                <b>${downloads}</b>
            </p>
        </div>
    </div>`).join("");
}