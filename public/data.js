const API_KEY = "5a2adbd4ccd50daf3380b9ff63d55291"


fetch('https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}')
.then(response => response.json())
.then(data => {console.log(data);
})