
const API_KEY = "c68345b642c4661c86d84df371a2650a"; 
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;
const TRENDING_API = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const searchInput = document.getElementById("search");
const main = document.getElementById("movies");
const loading = document.getElementById("loading");
const heroTitle = document.getElementById("hero-title");
const heroDesc = document.getElementById("hero-desc");
const hero = document.getElementById("hero");




window.addEventListener("load", () => {
  getTrendingMovies(false); 
});


async function getTrendingMovies(showLoader = true) {
  try {
    if (showLoader) loading.classList.remove("hidden");

    const res = await fetch(TRENDING_API);
    const data = await res.json();

    if (showLoader) loading.classList.add("hidden");

    showMovies(data.results);

    if (data.results.length > 0) setHero(data.results[0]);
  } catch (error) {
    console.error(error);
    if (showLoader) loading.innerHTML = "Error loading movies ❌";
  }
}


searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value;
    if (query) searchMovies(query);
  }
});

async function searchMovies(query) {
  try {
    loading.classList.remove("hidden");
    const res = await fetch(`${SEARCH_API}&query=${query}`);
    const data = await res.json();
    loading.classList.add("hidden"); 
    showMovies(data.results);
  } catch (error) {
    console.error(error);
    loading.innerHTML = "Error loading search results ❌";
  }
}


function showMovies(movies) {
  main.innerHTML = "";

  if (!movies || movies.length === 0) {
    main.innerHTML = `
      <div class="no-results">
        <img src="https://via.placeholder.com/200x200?text=oops...!" alt="No results">
        <h2>Oops...! No movies found</h2>
        <p>Try searching for another movie.</p>
      </div>
    `;
    return;
  }

  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="${poster_path ? IMG_PATH + poster_path : 'https://via.placeholder.com/300x450?text=No+Image'}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${vote_average >= 8 ? 'green' : vote_average >= 5 ? 'orange' : 'red'}">${vote_average}</span>
      </div>
      <div class="overview">${overview}</div>
    `;

    main.appendChild(movieEl);
  });
}

function setHero(movie) {
  hero.style.backgroundImage = movie.backdrop_path
    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
    : 'linear-gradient(to right, #0f172a, #020617)'; // fallback

  heroTitle.innerText = movie.title || "No Title";
  heroDesc.innerText = movie.overview || "No Description Available";
}