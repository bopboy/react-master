const API_KEY = "d23b6e209156de66ef98203b83473aac"
const BASE_PATH = "https://api.themoviedb.org/3"

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
        .then(res => res.json())
}