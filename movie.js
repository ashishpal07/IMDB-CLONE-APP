
// movie.html?title=chhichhore

// query string 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString); 
let movie_name = urlParams.get("title");

// lets assume movie object is null now
let movie_object = null;

// creating request object
let xhrRequest = new XMLHttpRequest();

// handle request as we got the response
xhrRequest.onload = function(){
    let result = JSON.parse(xhrRequest.response);
    
    // movie object of perticular movie
    movie_object = result;

    // fill all data of movie
    fillMovieData(movie_object);
};

// creating request
xhrRequest.open("GET", `https://www.omdbapi.com/?t=${movie_name}&apikey=d52f0b0`);

// send the request
xhrRequest.send();




// fill movie data function
function fillMovieData(data){

    // set movie_poster
    let poster = document.getElementById("movie-image");
    poster.setAttribute("src", data.Poster);

    // set movie_name
    document.getElementById("movie-name").innerText = data.Title;

    // data.Poster = "";
    delete data.Poster;  // deleted poster key because i show the poster on the page
    allDetails(data);    // allDetails function is called i.e to show the movie description

}



// function to all details added to the description div
function allDetails(bio){
    
    for(const [key, value] of Object.entries(bio)){
        // console.log(key, ":", value);
        let p = document.createElement("p");
        p.classList.add("para-graph");
        p.innerText = `${key} : ${value}`;
        document.getElementsByClassName("description")[0].appendChild(p);
    }

}



// after clicking on add-fav button movies should be added
// in local storage
document.getElementsByClassName("add-fav")[0].addEventListener("click", addToFavourite);



// function to show alert when movie is added to favourite
function showAlertMessage(res){
    
    let message;
    if(res){
        message = "Movie is added to your favourites successfully!😊"
    }else{
        message = "Movie already added! 😉"
    }

    // setting the message box message
    let messageElement = document.getElementById("msg-box");
    messageElement.innerText = message;

    // after 2 sec message box will disappear
    // after showing convenient message
    setTimeout(function(){
        messageElement.style.display = "none";
    }, 1000);

}




// function to check if current movie is already there or not
function containsObj(movie_name, list_of_movies){

    for(let i = 0; i < list_of_movies.length; i++){
        // find the object if local storage contains already
        if(list_of_movies[i].name == movie_name){
            return true;
        }
    }
    return false;
}




// function to add movie to favourite section
function addToFavourite(){

    // creating object of each movie (for adding)
    let movie = {
        id: movie_object.imdbID,
        name: movie_name,
    }

    // data pushing into local storage
    let local = JSON.parse(localStorage.getItem("names") || "[]");
    
    // call functions to see this movie is present already or
    // not in local storage
    let contains = containsObj(movie_name, local);

    // if contains is true then movie is already added
    // otherwise movie is added successfully !
    if(contains){
        showAlertMessage(false);
    }else{
        local.push(movie);
        window.localStorage.setItem("names", JSON.stringify(local));
        showAlertMessage(true);
    }

}



// on clicking on favourite btn user should be locate on favourite.html page
document.getElementsByClassName("my-fav")[0].addEventListener("click", function(){
    window.location.assign("favourite.html");
}) 

