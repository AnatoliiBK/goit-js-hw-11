import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImages } from "./fetchImages";

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


let page = 1;
let responseTotalHits;
let search;

formR.addEventListener("submit", onFormSubmit);

async function onFormSubmit(event) {
    event.preventDefault();
    bodyDes.style.backgroundColor = "white";
    imageContainer.innerHTML = "";
    buttonLM.style.display = "none"
    page = 1;
    search = event.target.elements.searchQuery.value.trim();
    
    if (!search) {
        return
    }

    try {
        const { hits, totalHits } = await getImages(search, page);
        responseTotalHits = totalHits;
    
        if (hits.length === 0) {
          Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");  
        } else {
            imageContainer.insertAdjacentHTML("beforeend", createMarkup(hits));
            galleryLightBox.refresh();
            if (page !== Math.ceil(responseTotalHits / 40)) {
                buttonLM.style.display = "block";
                
            } else {
                if (hits.length === responseTotalHits) {
                    buttonLM.style.display = "none";
                    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                  }
                
            }

        }
    } catch (error) {
        console.log(error);
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
}

buttonLM.addEventListener("click", onClickLM)

async function onClickLM() {
    page += 1;

    try {
        const { hits, totalHits } = await getImages(search, page);
        responseTotalHits = totalHits;
    
        
        if (page === Math.ceil(responseTotalHits / 40)) {
            buttonLM.style.display = "none";
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.", {
                timeout: 12000,
                position: 'bottom-left',
                delay: 3000,
            });
        }

        imageContainer.insertAdjacentHTML("beforeend", createMarkup(hits));
        galleryLightBox.refresh();

    } catch (error) {
        console.log(error);
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
     
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