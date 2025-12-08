const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


fetch('https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}')
.then(response => response.json())
.then(data => {console.log(data);
})