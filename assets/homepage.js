// VARIABLES FOR DOM ELEMENTS

// variables for movie elements
var inputMovieEl = document.querySelector(".inputMovie")
var generateMovieBtnEl = document.querySelector(".generateMovie")
var savebtnMovieEl = document.querySelector(".saveMovie")
var savedMoviesUlEl = document.querySelector(".savedMovies")
var googleMovieBtnEl = document.querySelector(".googleMovie")
var deleteMovieListBtnEl = document.querySelector(".deleteSavedMoviesBtn")

// variables for book elements
var savedBookUlEl = document.querySelector(".savedBooks")
var generateBookBtnEl = document.querySelector(".generateBook")
var inputBookEl = document.querySelector(".inputBook")
var googleBookBtnEl = document.querySelector(".googleBook")
var savebtnBookEl = document.querySelector(".saveBook")
var savedBooksUlEl = document.querySelector(".savedBooks")
var deleteBookListBtnEl = document.querySelector(".deleteSavedBooksBtn")

//food button variable
var foodSearchBtnEl = document.querySelector(".grubhubBtn");





//mobile menu

const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

var savedMoviesList = JSON.parse(localStorage.getItem("SavedMoviesList") || "[]");
// var savedBooksList = JSON.parse(localStorage.getItem("booksList") || "[]");


burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});






// // Call onPageLoad function when the page finishes loading
document.addEventListener('DOMContentLoaded', onPageLoad);





//PAGE LOAD FUNCTION
//this will happen on page load
// get data from local storage and put it on page
function onPageLoad() {
     

    // first, we need to get the 'moviesList' data from localstorage. Remember, this data is an array
    var savedMovies = JSON.parse(localStorage.getItem("SavedMoviesList") || "[]");
    // console.log('saved movies:', savedMovies);
    

    // because we have an array of data, we need to loop over each item in the array
    // in a for loop, the current thing you are looping over is savedMovies[i]
    for (var i = 0; i < savedMovies.length; i++) {
            //console.log(savedMovies);

            var li = document.createElement("li");
            li.classList.add('movie')
            li.appendChild(document.createTextNode(savedMovies[i]));
            var deleteMovieBtn = document.createElement("button")
            deleteMovieBtn.className = "singleMovieDelete"
            deleteMovieBtn.textContent = "Remove"
            li.appendChild(deleteMovieBtn)
            savedMoviesUlEl.appendChild(li);

            
            // add event listener for 'remove button' to remove a single movie
            deleteMovieBtn.addEventListener("click", deleteSingleMovie(li))     
    }
            
          // // gets 'booksList' data from localstorage. This is an array 
            // var savedBooks = JSON.parse(localStorage.getItem("booksList") || "[]");
            //         console.log(savedBooks);

            //     for (var i = 0; i < savedBooks.length; i++) {
            //         console.log(savedBooks);


            //     //loads books in "saved books list"
            //     deleteBtn(savedBooks[i])

            //     }
                

    }  

 



// MOVIE SECTION
// MOVIE SECTION
// MOVIE SECTION 


// movie api to be called in fetch function
function movieAPI() {

    var page = Math.floor(Math.random() * 466)

    return 'https://api.themoviedb.org/3/movie/top_rated?api_key=57a87d855b4da05e62b4da62e5c0856e&language=en-US&page=' + page + '&region=US'
}




//function to generate random movie from movie api when called in fetch function
function randomIndex(array) {
    return Math.floor(Math.random() * array.length)
}




// fetch function for randomly generating movie title 
var fetchFunction = function () {

    fetch(movieAPI())
        .then(response => response.json())
        .then(response => {
            // console.log(response.results[0])
            var movie = randomIndex(response.results)
            inputMovieEl.textContent = response.results[movie].title
            // console.log(response.results[movie].title)

        })
        .catch(err => console.error(err));
}





// Search button function to call fetch function to get a generated movie every click
generateMovieBtnEl.addEventListener("click", function () {
    fetchFunction();
    inputMovieEl.classList.remove("opacity")
})





// google button event listener to open new tabs and search generated book
googleMovieBtnEl.addEventListener("click", function () {
    window.open('http://www.google.com/search?q=' + inputMovieEl.innerHTML);

})






 // function to be called in 'addEventListner' inside of the for loop in the 'onPageLoad() function' 
 // this deletes a single movie in the 'saved movies' list and deletes the movie from local storage after the page loads 
 function deleteSingleMovie(movie) {
    return function() {

        var moviesList = JSON.parse(localStorage.getItem("SavedMoviesList"));

        // Get the index of the movie being deleted from the DOM
        var index = Array.from(movie.parentNode.children).indexOf(movie);

        // Check if index is valid
        if (index !== -1) {
            // Remove the movie from the DOM
            movie.parentNode.removeChild(movie);

            // Remove the corresponding movie from the array in local storage
            moviesList.splice(index, 1);

            // Update local storage with the modified array
            localStorage.setItem("SavedMoviesList", JSON.stringify(moviesList));

         
        }
    }
 }




//delete movie List(Deletes all movies)
deleteMovieListBtnEl.addEventListener("click", function (){
    savedMoviesUlEl.innerHTML = "";
    window.localStorage.removeItem("SavedMoviesList");

});





// eventListener to save movie onto page in 'saved movies' list when 'save' button is clicked
savebtnMovieEl.addEventListener('click', function () {
               
    // remember, savedMoviesList is an array!
    // limit movies in local storage to 10
    savedMoviesList = savedMoviesList.slice(0,9)

    // put data into savedMoviesList local storage
    savedMoviesList.push(inputMovieEl.textContent)

    
    // put movies on page and limit it to 10 movies max 
    if (savedMoviesUlEl.children.length < 10) {
        //saves the movie in 'saved movies' list when save button is clicked
        createMovieList(inputMovieEl.textContent)

    }

        

    //last, set savedMoviesList into local storage
    localStorage.setItem("SavedMoviesList", JSON.stringify(savedMoviesList));
         

})


 
 



// creates movie list using dom elements with delete button for each saved movie
var createMovieList = function(movieTitle) {

    
     
      //saves the movie in 'saved movies' list
      var li = document.createElement("li");
      li.classList.add('movie')
      li.appendChild(document.createTextNode(movieTitle));
      var deleteMovieBtn = document.createElement("button")
      deleteMovieBtn.className = "singleMovieDelete"
      deleteMovieBtn.textContent = "Remove"
      li.appendChild(deleteMovieBtn)
      savedMoviesUlEl.appendChild(li);
    
    
      
      // add event listener for 'remove button' to remove a single movie
      deleteMovieBtn.addEventListener("click", function() {
        

          savedMoviesUlEl.removeChild(li); 

          var savedMoviesList = JSON.parse(localStorage.getItem("SavedMoviesList"));

            for(var i = 0; i < savedMoviesList.length; i++) {

            // Check if savedMoviesList exists and the index is valid
            if (savedMoviesList[i] === movieTitle) {
                // Remove the item at the specified index
                savedMoviesList.splice(i, 1);
                
                // Update local storage with the modified array
                localStorage.setItem("SavedMoviesList", JSON.stringify(savedMoviesList));
            }    
        }           
    })
}
    
    

  

// BOOK SECTION
// BOOK SECTION
// BOOK SECTION

//rapidAPI key / host
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '61329c8183msh78cc9d6cf80b668p1997dajsn80542530576b',
        'X-RapidAPI-Host': 'bookshelves.p.rapidapi.com'
    }
};

//fetch function for generating random book
var bookFetchFunction = function () {
    fetch('https://bookshelves.p.rapidapi.com/books', options)
        .then(response => response.json())
        .then(response => {
            // console.log(response.results[0])
            inputBookEl.textContent = response.Books[Math.floor(Math.random() * 37)].title
            
            console.log(response.Books[Math.floor(Math.random() * 37)].title)
            
        })
        .catch(err => console.error(err));
    }
    
    



// Search button function to call fetch function to get a generated book every click
generateBookBtnEl.addEventListener("click", function () {
    bookFetchFunction();
    inputBookEl.classList.remove("opacity")

})




//google button event listener to open new tabs and search generated book
googleBookBtnEl.addEventListener("click", function () {
    window.open('http://www.google.com/search?q=' + inputBookEl.innerHTML);

})




//delete book list(deletes all books)
deleteBookListBtnEl.addEventListener("click", function (){
    savedBooksUlEl.innerHTML = "";
    window.localStorage.removeItem('booksList');

});





var bookKey = 0

savebtnBookEl.addEventListener("click", function() {
    console.log(inputBookEl.textContent);

    //SAVE BOOK IN LOCAL STORAGE -->

    //get data in local storage
    // var savedBooksList = JSON.parse(localStorage.getItem("booksList") || "[]");
        // console.log("Saved Books List", savedBooksList);
    
    // // we only want 10 Books on the Book list. IF there are more than 10, no more should be added
    // //check how many books are in the list
    if  (bookKey >= 10) {

        bookKey = bookKey.slice(0,0) // slice: this prevents item(book) to be added to array after 10 items

     }else{
        // next, need to put data into savedBooksList
        // remember, savedBooksList is an array!
        savedBooksList.push(inputBookEl.textContent)

        //saves the book in 'saved books' list when save button is clicked
        deleteBookBtn(inputBookEl.textContent)

         //last, set savedBooksList into local storage
        localStorage.setItem("booksList", JSON.stringify(savedBooksList));

     }

})





function deleteBookBtn(bookTitle){
         //saves the book in 'saved books' list
        var li = document.createElement("li");
        var deleteBookBtn = document.createElement("button")
        deleteBookBtn.className = "singleItemDelete"
        deleteBookBtn.textContent = "Remove"
  
        li.appendChild(document.createTextNode(bookTitle));
        li.appendChild(deleteBookBtn)
        savedBooksUlEl.appendChild(li);
        bookKey++ 
        
        // add event listener for 'remove button' to remove a single book
        deleteBookBtn.addEventListener("click", function() {
            savedBooksUlEl.removeChild(li); 
            var filteredBooks =  savedBooksList.filter((name)=> name !== bookTitle)
            localStorage.setItem("booksList", JSON.stringify(filteredBooks));
        })

}





//grubhub button event listener to redirect to grubhub
foodSearchBtnEl.addEventListener("click", function() {
     window.open("https://grubhub.com"); 

 })
















