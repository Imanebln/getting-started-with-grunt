function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  $.ajax(
    "http://www.omdbapi.com/?apikey=7c3e8abb&i=" + movieId, // request url
    {
      success: function (data, status, xhr) {
        // success callback function
        let movie = data;
        console.log(movie);
        let output = `
            <div class="container px-5 py-24 mx-auto flex flex-wrap">
            <div class="lg:w-1/3 mb-10 lg:mb-0 rounded-lg overflow-hidden">
              <img
                alt="feature"
                class="object-cover h-[70vh] w-[200px]"
                src="${movie.Poster}"
              />
            </div>
            <div
              class="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center"
            >
              <div class="flex flex-col mb-10 lg:items-start items-center">
              <span class="inline-block py-1 px-2 mb-2 rounded bg-gray-800 text-gray-400 text-opacity-75 text-xs font-medium tracking-widest">${movie.Type}</span>
              <h1 class="sm:text-3xl text-2xl font-medium mb-4 text-gray-200">${movie.Title}</h1>
              <ul class="block">
              <li class="mb-2"><strong class="text-green-600">Rated:</strong> ${movie.Rated}</li>
              <li class="mb-2"><strong class="text-green-600">Genre:</strong> ${movie.Genre}</li>
              <li class="mb-2"><strong class="text-green-600">Released:</strong> ${movie.Released}</li>
              <li class="mb-2"><strong class="text-green-600">IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="mb-2"><strong class="text-green-600">Director:</strong> ${movie.Director}</li>
              <li class="mb-2"><strong class="text-green-600">Writer:</strong> ${movie.Writer}</li>
              <li class="mb-2"><strong class="text-green-600">Actors:</strong> ${movie.Actors}</li>
              </ul>
    
              <div class="mt-3 rounded-lg">
                  <h2 class="text-white text-2xl mb-2">Plot</h2>
                  <p class="leading-relaxed text-base">${movie.Plot}</p>
              </div>
              <div class="flex mt-8">
                <button class="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"><a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a></button>
                <button id="like" class="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
            </div>
              </div>
            </div>
          </div>
          `;
        $("#movie").html(output);
      },

      error: function (jqXhr, textStatus, errorMessage) {
        // error callback
        console.log(errorMessage);
      },
    }
  );
}
