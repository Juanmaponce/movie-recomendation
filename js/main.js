$("document").ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});
// Funcion para filtrar peliculas por genero y mostrar en el document
let gusto;
let peliculasGenero;
const porGenero = () => {
  gusto = $("#selectGenero option:selected").val();
  peliculasGenero = arrayPeliculas.filter(
    (pelicula) => pelicula.genre === gusto
  );
  let peliculasGeneroID = peliculasGenero.map((pelicula) => pelicula.id);
  selectedMovie(
    peliculasGeneroID[
      Math.floor(Math.random() * (peliculasGeneroID.length - 0) + 0)
    ]
  );
};
let duracion;
// Funcion para filtrar peliculas por duracion y mostrar en el document
let peliculaPorDuracion = [];
const porDuracion = () => {
  duracion = $("#selectDuracion option:selected").val();
  if (duracion === "Larga") {
    peliculaPorDuracion = arrayPeliculas.filter(
      (pelicula) => pelicula.duration >= 2.3
    );
  } else if (duracion === "Mediana") {
    peliculaPorDuracion = arrayPeliculas.filter(
      (pelicula) => pelicula.duration < 2.3 && pelicula.duration >= 1.7
    );
  } else if (duracion === "Corta") {
    peliculaPorDuracion = arrayPeliculas.filter(
      (pelicula) => pelicula.duration < 1.7
    );
  }
  let peliculasDuracionID = peliculaPorDuracion.map((pelicula) => pelicula.id);
  selectedMovie(
    peliculasDuracionID[
      Math.floor(Math.random() * (peliculasDuracionID.length - 0) + 0)
    ]
  );
  console.log(peliculaPorDuracion);
  return peliculaPorDuracion;
};
//Filtrar peliculas por el rating
let rating;
let peliculasPorRating;
const porRating = () => {
  rating = parseInt($("#selectRating option:selected").val());
  console.log(rating)
  peliculasPorRating = arrayPeliculas.filter(
    (pelicula) => pelicula.score >= rating
  );
  let peliculasRatingID = peliculasPorRating.map((pelicula) => pelicula.id);
  selectedMovie(
    peliculasRatingID[
      Math.floor(Math.random() * (peliculasRatingID.length - 0) + 0)
    ]
  );
};

//Pelicula recomendada aleatoria
const peliculaAleatoria = () => {
  peliculasAleatoriasId = arrayPeliculas.map((pelicula) => pelicula.id);
  selectedMovie(
    peliculasAleatoriasId[
      Math.floor(Math.random() * (peliculasAleatoriasId.length - 0) + 0)
    ]
  );
}

//buscar peliculas ajax jquery

function getMovies(searchText) {
  $.get(
    baseURL + searchName + searchText + "&type=movie",
    (respuesta, estado) => {
      if (estado === "success") {
        let movies = respuesta.Search;
        let output = "";
        $.each(movies, (i, movie) => {
          output += `
          <div class="col-md-3">
            <div class="well text-center">
            <img class="imgSearch" src="${movie.Poster}">
            <h5>${movie.Title}</h5>
            <a onclick="selectedMovie('${movie.imdbID}')" class="btn btn-info" href="#">Mas info</a>
            </div>
          </div>
          
        `;
        });

        result.html(output);
      }
    }
  );
}

const selectedMovie = (id) => {
  sessionStorage.setItem("movieId", id);
  window.location = "./pages/movie.html";
  return false;
};
const getMovieById = () => {
  let movieId = sessionStorage.getItem("movieId");

  $.get(baseURL + searchId + movieId, (respuesta, estado) => {
    if (estado === "success") {
      let movie = respuesta;
      let output = `
      <div class="row">
      <div class="col-md-4">
        <img src="${movie.Poster}" class="thumbnail">
      </div>
      <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
          <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
          <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
          <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
          <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
          <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
          <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
        </ul>
      </div>
    </div>
    <div class="row mb-3">
      <div class="well">
        <h3>Plot</h3>
        ${movie.Plot}
        <hr>
        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
        <a href="../index.html" class="btn btn-default mx-2">Go Back To Recomendations</a>
      </div>
    </div>
          
        `;
      result.html(output);
    }
  });
};

//Manejo de eventos para botones
const result = $("#result-container");
const btnGenero = document.querySelector("#btnGenero");
const btnDuracion = document.querySelector("#btnDuracion");
const btnRating = document.querySelector("#btnRating");
const btnRandom = document.querySelector("#btnRandom");
const baseURL = "https://www.omdbapi.com/?apikey=72a27c89&";
const searchName = "s=";
const searchId = "i=";

btnGenero.addEventListener("click", porGenero);
btnDuracion.addEventListener("click", porDuracion);
btnRating.addEventListener("click", porRating);
btnRandom.addEventListener("click", peliculaAleatoria);
