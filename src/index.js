import Notiflix from 'notiflix';

const formR = document.querySelector(".search-form");
const inputR = document.querySelector("input");
const buttonR = document.querySelector("button");


formR.style.display = "flex";
formR.style.justifyContent = "center";
formR.style.alignItems = "center";
formR.style.height = "60px";
formR.style.backgroundColor = "blue";
inputR.style.width = "400px";
inputR.style.height = "40px";
buttonR.style.height = "40px";

const BASE_URL = "https://pixabay.com/api/";

const API_KEY = '35870886-75af865edd7f3268a0fe2e3e2';
// const URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });

formR.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const search = event.target.value;
    if (getImages === "") {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    } else {
        getImages(search).then((data) => {
            formR.insertAdjacentElement("beforeend", createMarkup(search))
        })
    }
}

async function getImages(name) {
    return await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`).then(    
    (resp) => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    }
  );
} 

function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
    `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy">
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

