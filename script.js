const API_KEY = "api_key=64d560b8a57eb011ee583dd6509462df"
const BASE_URL = "https://api.themoviedb.org/3/"
const API_URL = BASE_URL + "discover/movie?sort_by=popularity.desc&" + API_KEY
const IMG_URL = "https://image.tmdb.org/t/p/w500"

const searchUrl = BASE_URL + "search/movie?" + API_KEY
const main = document.getElementById("main")
const movieWrapper = document.getElementsByClassName("movie")[0]
const search = document.getElementById("search")
const searchBtn = document.getElementById("search-btn")

const genres =  [{
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

const tagsEl = document.getElementById("tags")

let selectedGenre = []
setGenre()
function setGenre() {
    tagsEl.innerHTML = ""
    genres.forEach(g => {
        const t = document.createElement("div")
        t.classList.add("tag")
        t.id = g.id
        t.innerText = g.name
        t.addEventListener("click", () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(g.id)
            } else {
                if (selectedGenre.includes(g.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if (id == g.id) {
                            selectedGenre.splice(idx, 1)
                        }
                    })
                } else {
                    selectedGenre.push(g.id)
                }
            }        
            getMovies(API_URL + "&with_genres="+selectedGenre.join(","))
        })
        t.addEventListener("click", () => {
            if (t.classList.contains("clicked")) {
                t.classList.remove("clicked")
            } else {
                t.classList.add("clicked")
            }
            console.log(t.classList);
        })
        tagsEl.append(t)
    })
}

getMovies(API_URL)

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            showMovies(data.results)
        })
}

function showMovies(data) {
    main.innerHTML = ""
    data.forEach(movie => {
        const {
            title,
            poster_path,
            vote_average,
            overview
        } = movie
        let movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML = `
        <img class="poster-img" src="${IMG_URL+poster_path}" alt = "${title}">
            <div class = "movie-info" >
            <h3> ${title}</h3>
            <div class="${getColor(vote_average)}">${vote_average}</div >
            </div>
            <div class = "overview" >
            ${overview}
            </div>
            `
        let p = movieEl.getElementsByClassName("overview")[0]
        p.style.transition = "all 0.2s"
        p.style.visibility = "hidden"
        movieEl.addEventListener("mouseover", () => p.style.visibility = "visible")
        movieEl.addEventListener("mouseleave", () => p.style.visibility = "hidden")
        main.append(movieEl)
    })
}

function getColor(vote) {
    if (vote > 8) {
        return "green"
    } else if (vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(searchUrl + "&query=" + searchTerm)
    } else {
        main.innerHTML = "No results found"
    }
})