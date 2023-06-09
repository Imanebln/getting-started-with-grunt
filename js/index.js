$(document).ready(() => {
  getAllMovies();
  $("#header").load("header.html", () => {
    getUserData();
  });
  $("#footer").load("footer.html");
  $("#swiper").load("slider.html");
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getUserData() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    let welcomeMsg = "Welcome, " + user.fullname + "!";
    $("#login-btn").hide();
    $("#welcome-msg").html(welcomeMsg);
  } else {
    $("#login").show();
    $("#logout").hide();
  }
}

function getAllMovies() {
  const moviesPerPage = 10;
  const numPages = 5;
  let movies = [];
  for (let i = 1; i <= numPages; i++) {
    $.ajax(
      `http://www.omdbapi.com/?apikey=7c3e8abb&s=all&type=movie&page=${i}`,
      {
        success: function (data) {
          movies = movies.concat(data.Search);
          if (i === numPages) {
            // Shuffle the movies using the Fisher-Yates shuffle algorithm
            for (let i = movies.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [movies[i], movies[j]] = [movies[j], movies[i]];
            }
            // Take a random subset of 50 movies
            const randomMovies = movies.slice(0, 50);
            let output = "";
            $.each(randomMovies, function (index, movie) {
              output += `
                <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <a class="block relative rounded overflow-hidden" onclick="movieSelected('${movie.imdbID}')">
                    <img
                      alt="ecommerce"
                      class="object-cover w-full h-[500px] block cursor-pointer"
                      src="${movie.Poster}"
                    />
                  </a>
                  <div class="mt-4">
                    <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                      ${movie.Type}
                    </h3>
                    <h2 class="text-gray-100 title-font text-lg font-medium">
                    ${movie.Title}
                    </h2>
                    <p class="mt-1 text-gray-400">${movie.Year}</p>
                  </div>
                </div>
              `;
            });
            $("#allMovies").html(output);
          }
        },
      }
    );
  }
}

function getMovies(searchText) {
  $.get(
    "http://www.omdbapi.com/?apikey=7c3e8abb&s=" + searchText, // request url
    function (data, status, xhr) {
      // success callback function
      console.log(data);
      let movies = data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
          <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
            <a class="block relative rounded overflow-hidden" onclick="movieSelected('${movie.imdbID}')">
              <img
                alt="ecommerce"
                class="object-cover w-full h-[500px] block cursor-pointer"
                src="${movie.Poster}"
              />
            </a>
            <div class="mt-4">
              <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                ${movie.Type}
              </h3>
              <h2 class="text-gray-100 title-font text-lg font-medium">
              ${movie.Title}
              </h2>
              <p class="mt-1 text-gray-400">${movie.Year}</p>
            </div>
          </div>
          `;
      });

      $("#movies").html(output);
    }
  );
}

function navigateToPage(page) {
  window.location = `${page}.html`;
}
