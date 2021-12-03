
// get all data from the local storage
let allMovieData = JSON.parse(localStorage.getItem("names") || "[]");




// function to remove movie object from list
function removeMovie(arr, attr, value){
    for(let i = 0; i < arr.length; i++){
        if(arr[i][attr] == value){
            arr.splice(i, 1);     // on ith index delete 1 element
        }
    }

    // length is zero then remove directly
    if(arr.length == 0){
        window.localStorage.removeItem("names");
    }

    
    // local storage setItem again
    window.localStorage.setItem("names", JSON.stringify(arr));
    document.getElementById("cards").innerHTML = "";

    // creating cards again with data present in localstorage
    for (let i = 0; i < allMovieData.length; i++) {
        createCard(allMovieData[i]);
    }

}



// function to create cards 
function createCard(data){

    // card div
    let parent = document.createElement("div");
    parent.classList.add("card-div");

    document.getElementById("cards").appendChild(parent); // append child

    // create heading of movie name
    let heading = document.createElement("h3");
    heading.classList.add("heading-movie");

    // add heading to parent
    parent.appendChild(heading);

    // creating heading  innertext
    heading.innerText = `${data.name}`;

    // buttons parent div
    let btnDiv = document.createElement("div");
    btnDiv.classList.add("class-btns");

    // add to parent div
    parent.appendChild(btnDiv);

    // create anchor tag button
    let detail = document.createElement("a")
    detail.setAttribute("href", "movie.html?title=" + data.name);

    // appending in btn div
    btnDiv.appendChild(detail);

    // create btn inside anchor tag           (<a><button><i></i>show details</button></a>)
    let showBtn = document.createElement("button");
    showBtn.classList.add("show-btn");

    // append show btn to anchor tag
    detail.appendChild(showBtn);

    // logo for showBtn
    let iconDetails = document.createElement("i");
    iconDetails.classList.add("fa");
    iconDetails.classList.add("fa-info-circle");

    // append logo into showbtn
    showBtn.appendChild(iconDetails);

    // create inner text of show btn
    let detailsText = document.createElement("span");
    detailsText.innerText = " Show Details";
    showBtn.appendChild(detailsText);

    // ----now creating remove button    (<button><i></i>show details</button>)
    let remove = document.createElement("button");
    remove.classList.add("remove-btn");
    remove.setAttribute("id", data.id);

    // add to its parent
    btnDiv.appendChild(remove);

    // remove btn logo
    let rmv_icon = document.createElement("i");
    rmv_icon.classList.add("fas");
    rmv_icon.classList.add("fa-times");
    
    // append remove icon to remove btn
    remove.appendChild(rmv_icon);
    
    // creating remove btn inner text
    let removeText = document.createElement("span")
    removeText.innerText = "Remove";
    remove.appendChild(removeText);

    document.getElementById(data.id).addEventListener("click", function(){
        let id = this.id;
        removeMovie(allMovieData, "id", id);
    });

}



// adding cards
for (let i = 0; i < allMovieData.length; i++) {
    createCard(allMovieData[i]);
}
