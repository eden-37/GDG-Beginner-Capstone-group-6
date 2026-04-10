// ====================== WATCHLIST PAGE SCRIPT ======================

function getWatchlist() {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
}

function saveWatchlist(list) {
    localStorage.setItem("watchlist", JSON.stringify(list));
}

function removeFromWatchlist(id) {
    const updatedList = getWatchlist().filter(movie => movie.imdbID !== id);
    saveWatchlist(updatedList);
    renderWatchlist();
}

function updateStats(list) {
    document.getElementById("totalMovies").textContent = list.length;
    document.getElementById("totalWatchTime").textContent = list.length * 2 || 0;
    document.getElementById("avgRating").textContent = list.length ? "8.2" : "0.0";
}

function renderWatchlist() {
    const container = document.getElementById("watchlistContainer");
    const emptyState = document.getElementById("emptyWatchlist");
    const list = getWatchlist();

    if (!container) return;

    container.innerHTML = "";
    updateStats(list);

    if (list.length === 0) {
        emptyState.style.display = "flex";
        return;
    }

    emptyState.style.display = "none";

    list.forEach(movie => {
        const card = document.createElement("div");
        card.className = "watchlist-card";

        card.innerHTML = `
            <img src="${imgSrc(movie.Poster)}" alt="${movie.Title}">
            <div class="watchlist-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year || "Unknown year"}</p>
                <div class="watchlist-actions">
                    <button class="remove-btn" data-id="${movie.imdbID}">Remove</button>
                    <button class="details-btn" data-id="${movie.imdbID}">Details</button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function showMovieDetails(movie) {
    const modal = document.createElement("div");
    modal.className = "movie-modal";

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${movie.Title}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${imgSrc(movie.Poster)}" alt="${movie.Title}">
                <p><strong>Year:</strong> ${movie.Year || "N/A"}</p>
                <p><strong>Type:</strong> ${movie.Type || "N/A"}</p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".close-modal").addEventListener("click", () => modal.remove());
    modal.addEventListener("click", e => {
        if (e.target === modal) modal.remove();
    });
}

function handleWatchlistClick(event) {
    const button = event.target.closest("button");
    if (!button) return;

    const id = button.dataset.id;
    if (!id) return;

    if (button.classList.contains("remove-btn")) {
        removeFromWatchlist(id);
        return;
    }

    if (button.classList.contains("details-btn")) {
        const movie = getWatchlist().find(item => item.imdbID === id);
        if (movie) showMovieDetails(movie);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    renderWatchlist();
    const container = document.getElementById("watchlistContainer");
    if (container) {
        container.addEventListener("click", handleWatchlistClick);
    }
});

function imgSrc(src) {
    return src && src !== "N/A" ? src : "https://via.placeholder.com/300x450?text=No+Image";
}
