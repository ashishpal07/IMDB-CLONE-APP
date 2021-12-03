// every time we enter any key in search box then we have
// to fire keyup event
document.getElementById("search-box").onkeyup =  getDataFromApi;

// autocomplete container
let autocomplete = document.getElementById("auto-complete");

// movie id
let movie_id = 0;

function getDataFromApi(){

    let movie_name = document.getElementById("search-box").value;

    // clear list before start
    clearListElement();

    // create xhr object
    var xhrRequest = new XMLHttpRequest();

    // handle when respond is get
    xhrRequest.onload = function(){
        let res = JSON.parse(xhrRequest.response);
        let element = res.Title; // for suggesstion
        movie_id = res.imdbID;
    
        // if no movie is found name like element var
        if(element == null){
            clearListElement();
        }else{
            let li = document.createElement("li");
            li.innerText = element;
            li.classList.add("list-item");
            autocomplete.appendChild(li);
            
            // if click on li suggetions then search box value 
            // li's inner text
            li.addEventListener("click", function(){
                document.getElementById("search-box").value = this.innerText;
                clearListElement();
                document.getElementById("search-box").focus();  // bring back focus on search box
                return;
            });
        }

    }

    // create request to send
    xhrRequest.open("GET", `https://www.omdbapi.com/?t=${movie_name}&apikey=d52f0b0`);

    // seand the request to the server
    xhrRequest.send();

}




// clearlist imean suggetion list
function clearListElement() {
    let list = document.getElementById("auto-complete");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}



// as soon as click on search button
document.getElementsByClassName("search-btn")[0].addEventListener("click", showMovie);

function showMovie(){
    let movie_name = document.getElementById("search-box").value;
    if(movie_name == ""){
        alert("movie name should be entered (No Name) !!!");
    }else if(movie_id == 0 || movie_id == null){
        alert("No movie found!!!");
    }
    else{
        // movie.html?title=chhichhore
        window.open("movie.html?title=" + movie_name, "_blank");
    }
    // search box should be empty
    document.getElementById("search-box").value = "";
}



// handling press enter key
document.getElementById("search-box").addEventListener("keydown", function(event){
    if(event.keyCode == 13){
        if(movie_id == 0 || movie_id == null){
            alert("No movie found !!!");
        }else{
            showMovie();
        }
    }
});



// by clicking on my favourite button
document.getElementsByClassName("fav-btn")[0].addEventListener("click", function(){
    window.location.assign("favourite.html");
});

