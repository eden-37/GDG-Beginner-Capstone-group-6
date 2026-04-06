const movies = [
    { title: "Inception", year: 2010, poster: "https://via.placeholder.com/200x300?text=Inception" },
    { title: "Interstellar", year: 2014, poster: "https://via.placeholder.com/200x300?text=Interstellar" },
    { title: "The Dark Knight", year: 2008, poster: "https://via.placeholder.com/200x300?text=Dark+Knight" },
    { title: "Avengers: Endgame", year: 2019, poster: "https://via.placeholder.com/200x300?text=Endgame" },
    { title: "Titanic", year: 1997, poster: "https://via.placeholder.com/200x300?text=Titanic" },
    { title: "Spider-Man: No Way Home", year: 2021, poster: "https://via.placeholder.com/200x300?text=Spider-Man" }
];

const container = document.getElementById("movieContainer");

function displayMovies() {
    container.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${movie.poster}" alt="">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.year}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

displayMovies();