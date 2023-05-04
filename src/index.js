import axios from "axios";
import Notiflix from 'notiflix';

const formR = document.querySelector(".search-form");
const inputR = document.querySelector("input");
const buttonR = document.querySelector("button");
const imageContainer = document.querySelector(".gallery")
const buttonLM = document.querySelector(".load-more");

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = '35870886-75af865edd7f3268a0fe2e3e2';

let page = 1;

formR.style.display = "flex";
formR.style.justifyContent = "center";
formR.style.alignItems = "center";
formR.style.height = "60px";
formR.style.backgroundColor = "blue";
inputR.style.width = "400px";
inputR.style.height = "40px";
buttonR.style.height = "40px";
buttonLM.style.height = "40px";
buttonLM.style.marginTop = "20px";
buttonLM.style.display = "block";
buttonLM.style.marginRight = "auto";
buttonLM.style.marginLeft = "auto";
buttonLM.style.display = "none";

async function getImages(searchQuery) {
    try {
      const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
           
      const responseHits = response.data.hits;
    //   console.log(responseHits);
      return responseHits;

    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure("An error occurred while fetching images. Please try again later.");
    }
  }

//   getImages()


formR.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    imageContainer.innerHTML = "";
    page = 1;
    search = event.target.elements.searchQuery.value.trim();
    console.log(search)
    if (!search) {
        return
    }


    getImages(search).then((data) => {
        if (data.length === 0) {
          Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");  
        } else {
            imageContainer.insertAdjacentHTML("beforeend", createMarkup(data));
            if (data.length >= 40) {
                buttonLM.style.display = "block";
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
        
        imageContainer.insertAdjacentHTML("beforeend", createMarkup(data));
    })
    .catch(err => 
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."));
    
}

function createMarkup(responseHits) {
    return responseHits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
    `<div class="photo-card">
        <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy">
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
