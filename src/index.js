import axios from "axios";
import Notiflix from 'notiflix';

const formR = document.querySelector(".search-form");
const inputR = document.querySelector("input");
const buttonR = document.querySelector("button");

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

async function getImages(name) {
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
           
      const responseHits = response.data.hits;
      console.log(responseHits);
      return responseHits;

    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure("An error occurred while fetching images. Please try again later.");
    }
  }

  getImages()


formR.addEventListener("submit", onFormSubmit);

async function onFormSubmit(event) {
    event.preventDefault();
    
    search = event.target.formR.value;
    console.log(search)
    // if (getImages(search) === []) {
    //     Notiflix.Notify.failure("Oops, there is no things with that name");
    // } else {
            
    //     getImages(search).then((data) => {
    //         formR.insertAdjacentElement("afterend", createMarkup(data))
    //     })
    //     console.log(getImages(search))
    //     console.log(data)
    //     .catch(err => 
    //     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."));
    // }
}

// function createMarkContainer () {
//     return `<div class="gallery">
//     </div>`
// }

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















// const URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });


// async function getImages(name) {
//     return await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`).then(    
//     (resp) => {
//         if (!resp.ok) {
//             throw new Error(resp.statusText);
//         }
//         // console.log(resp.json())
//         return resp.json();
//     }
//   );
// }