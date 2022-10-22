
// get movies data from third-party api （tmdb-the movie database)
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// get elements object from html
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

//get movies
getMovies(APIURL);

// open a new stride waiting for responde from backend
async function getMovies(url){
    const response = await fetch(url); //The Fetch API interface allows web browser to make HTTP requests to web servers.
    const respData = await response.json(); 

    console.log(respData); //Get a JSON(JavaScript Object Notation) file over the network and print it to the console



    showMovies(respData.results);

    // respData.results.forEach((movie) => {
    //     const img = document.createElement("img");
    //     img.src = IMGPATH + movie.poster_path;

    //     document.body.appendChild(img);

    // })
}

//show movies
function showMovies(movies){

    main.innerHTML = ""; //clean main

    movies.forEach((movie) => {
        const { poster_path, title,vote_average, overview } = movie; //automatically assign movie attribute to 
        const movieEl = document.createElement('div');
        movieEl.classList.add("movie"); //add css class to el

        movieEl.innerHTML = 
        
        `               
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
       
        `;     
        main.appendChild(movieEl);
        
    });


}

//vote_average color
function getClassByRate(vote_average){
    if(vote_average >= 8){
        return `green`;
    }else if(vote_average >=6){
        return `orange`
    }else{
        return `red`;
    }

}

//Search movies
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }

});



