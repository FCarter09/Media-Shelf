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

//grubhub button variable
var grubHubBtnEl = document.querySelector(".grubhubBtn");

//local storage global variables
var savedMoviesList = JSON.parse(localStorage.getItem("SavedMoviesList") || "[]");
var savedBooksList = JSON.parse(localStorage.getItem("SavedBooksList") || "[]");

//mobile menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');





// eventListener for navbar
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

            var movieLi = document.createElement("li");
            movieLi.classList.add('movie')
            movieLi.appendChild(document.createTextNode(savedMovies[i]));
            var deleteMovieBtn = document.createElement("button")
            deleteMovieBtn.className = "singleMovieDelete"
            deleteMovieBtn.textContent = "Remove"
            movieLi.appendChild(deleteMovieBtn)
            savedMoviesUlEl.appendChild(movieLi);

            
            // add event listener for 'remove button' to remove a single movie
            deleteMovieBtn.addEventListener("click", deleteSingleMovie(movieLi))     
    }
            
            // gets 'SavedBooksList' data from localstorage. This is an array 
            var savedBooks = JSON.parse(localStorage.getItem("SavedBooksList") || "[]");
                    // console.log(savedBooks);

                for (var i = 0; i < savedBooks.length; i++) {
                    // console.log(savedBooks);

                    var bookLi = document.createElement("li");
                    bookLi.classList.add('book')
                    bookLi.appendChild(document.createTextNode(savedBooks[i]));
                    var deleteBookBtn = document.createElement("button")
                    deleteBookBtn.className = "singleBookDelete"
                    deleteBookBtn.textContent = "Remove"
                    bookLi.appendChild(deleteBookBtn)
                    savedBooksUlEl.appendChild(bookLi);
        
                    
                    // add event listener for 'remove button' to remove a single book
                    deleteBookBtn.addEventListener("click", deleteSingleBook(bookLi))  
                }
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
var movieFetchFunction = function () {

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
    movieFetchFunction();
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

        // get movie list from local storage
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
    localStorage.removeItem("SavedMoviesList");

});





// eventListener to save movie onto page in 'saved movies' list when 'save' button is clicked
savebtnMovieEl.addEventListener('click', function () {
     // Retrieve the saved movies list from local storage
     var savedMoviesList = JSON.parse(localStorage.getItem("SavedMoviesList")) || [];
               
    // remember, savedMoviesList is an array!
    // limit movies in local storage to 10
      
      if (savedMoviesList.length < 10) {
        // Push the new movie title into the savedMoviesList
        savedMoviesList.push(inputMovieEl.textContent);

        // Add the new movie to the page
        createMovieList(inputMovieEl.textContent);

        // Set the updated savedMoviesList into local storage
        localStorage.setItem("SavedMoviesList", JSON.stringify(savedMoviesList));
    } else {
        console.log("Maximum limit reached");
    }
         

})


 
 

// creates movie list using dom elements with delete button for each saved movie
var createMovieList = function(movieTitle) {
     
      //saves the movie in 'saved movies' list
      var movieLi = document.createElement("li");
      movieLi.classList.add('movie')
      movieLi.appendChild(document.createTextNode(movieTitle));
      var deleteMovieBtn = document.createElement("button")
      deleteMovieBtn.className = "singleMovieDelete"
      deleteMovieBtn.textContent = "Remove"
      movieLi.appendChild(deleteMovieBtn)
      savedMoviesUlEl.appendChild(movieLi);
    
    
      
      // add event listener for 'remove button' to remove a single movie
      deleteMovieBtn.addEventListener("click", function() {
          
            // delete selected movie off of page
            savedMoviesUlEl.removeChild(movieLi); 

            // get movie list from local storage
            var savedMoviesList = JSON.parse(localStorage.getItem("SavedMoviesList"));

            // Find the index of the movie to be removed
            var index = savedMoviesList.indexOf(movieTitle);

            // Check if the movie is found in the savedMoviesList
            if (index !== -1) {
                // Remove the item at the specified index
                savedMoviesList.splice(index, 1);

                // Update local storage with the modified array
                localStorage.setItem("SavedMoviesList", JSON.stringify(savedMoviesList));
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
         'X-RapidAPI-Key': '76dec4ed41msh4a6682e49aa991cp1ee729jsn06ef7b1369f7',
        'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
    }
};

//fetch function for generating random book
var bookFetchFunction = function () {
    // Make a fetch request to get a random book
    fetch(`https://book-finder1.p.rapidapi.com/api/search?&results_per_page=100&page=1`, options)
    .then(response => response.json())
    .then(response => {
       // Log the response to the console
       // console.log(response);

       // Check if the array of 'results' in the response contains any books
       if ( response.results.length > 0) {

        // Extract titles from the 'results' response and make it a new array called 'titles'
        const titles = response.results.map(book => book.title);
           
        // Log the titles to the console
        // console.log(titles);

        // Get a random book title from the array of titles
        const randomBookIndex = Math.floor(Math.random() * titles.length);
        const randomBookTitle = titles[randomBookIndex];


        // Display the random book title in the inputBookEl element
        inputBookEl.textContent = randomBookTitle;

       } else {
           console.error('No books found in the response');
       }
        
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




 // function to be called in 'addEventListner' inside of the for loop in the 'onPageLoad() function' 
 // this deletes a single book in the 'saved books' list and deletes the book from local storage after the page loads 
 function deleteSingleBook(book) {
    return function() {

        // get book list from local storage
        var booksList = JSON.parse(localStorage.getItem("SavedBooksList"));

        // Get the index of the movie being deleted from the DOM
        var index = Array.from(book.parentNode.children).indexOf(book);

        // Check if index is valid
        if (index !== -1) {
            // Remove the movie from the DOM
            book.parentNode.removeChild(book);

            // Remove the corresponding movie from the array in local storage
            booksList.splice(index, 1);

            // Update local storage with the modified array
            localStorage.setItem("SavedBooksList", JSON.stringify(booksList));

         
        }
    }
 }





//delete book list(deletes all books)
deleteBookListBtnEl.addEventListener("click", function (){
    savedBooksUlEl.innerHTML = "";
    localStorage.removeItem('SavedBooksList');

});




// saves book in 'saved books' list and local storage when button is clicked
savebtnBookEl.addEventListener("click", function() {
    // console.log(inputBookEl.textContent);

    //SAVE BOOK IN LOCAL STORAGE -->
    // Retrieve the saved movies list from local storage
    var savedBooksList = JSON.parse(localStorage.getItem("SavedBooksList")) || [];
    
    if (savedBooksList.length < 10) {
        // Push the new book title into the savedBooksList
        savedBooksList.push(inputBookEl.textContent);

        // Add the new book to the page
        createBookList(inputBookEl.textContent);

        // Set the updated savedBooksList into local storage
        localStorage.setItem("SavedBooksList", JSON.stringify(savedBooksList));

    } else {

        console.log("Maximum limit reached");
    }

})




// creates book list using dom elements with delete button for each saved book
function createBookList(bookTitle){

         //saves the book in 'saved books' list
        var bookLi = document.createElement("li");
        bookLi.classList.add('book')
        var deleteBookBtn = document.createElement("button")
        deleteBookBtn.className = "singleBookDelete"
        deleteBookBtn.textContent = "Remove"
  
        bookLi.appendChild(document.createTextNode(bookTitle));
        bookLi.appendChild(deleteBookBtn)
        savedBooksUlEl.appendChild(bookLi);
        
        
        // add event listener for 'remove button' to remove a single book
        deleteBookBtn.addEventListener("click", function() {

            // delete selected books off of page
            savedBooksUlEl.removeChild(bookLi); 

            // get book list from local storage
            var savedBooksList = JSON.parse(localStorage.getItem("SavedBooksList"));

            // Find the index of the movie to be removed
            var index = savedBooksList.indexOf(bookTitle);

            // Check if the movie is found in the savedMoviesList
            if (index !== -1) {
                // Remove the item at the specified index
                savedBooksList.splice(index, 1);

                // Update local storage with the modified array
                localStorage.setItem("SavedBooksList", JSON.stringify(savedBooksList));
            }  
            
        })

}





//grubhub button event listener to redirect to grubhub
grubHubBtnEl.addEventListener("click", function() {
     window.open("https://grubhub.com"); 

 })
















