const moviesList = document.querySelector(".app");
const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes");
let buttons = [];
let moviesData = [];

request.then(getMovies);

function getMovies(answer) {
    moviesData = answer.data;
    showMovies();
    activeButtons();
};

function showMovies() {
    for(let i = 0; i < moviesData.length; i++) {
        moviesList.innerHTML += `      
        <div class="movies">
            <div class="movie">
            <img src="${moviesData[i].imagem}">
            <div class="title">${moviesData[i].titulo}</div>
            <button>
                Comprar
                <ion-icon name="cart-outline"></ion-icon>
            </button>
            </div>
        </div>`;
    };  
}
function activeButtons() {
    buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", function(){buy(button.parentNode)});
    });
}

function buy(movie) {
    const name = prompt("Qual eh o seu nome?");
    const placesToSit = prompt("Quantos lugares?");
    const titleMovie = movie.querySelector(".title").innerHTML;
    const movieClicked = moviesData.filter(movie => {
       return movie.titulo === titleMovie;
    });
    console.log(movieClicked)
    const movieId =  movieClicked[0].id;
    console.log(movieId);
    movieData = {
        nome: name,
        quantiade: placesToSit,
    }

    const enviar = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes/${movieId}/ingresso`, movieData);
    enviar.then(sucess);
    enviar.catch(fail);

}

function sucess() {
    alert("Comprado com sucesso!");
}

function fail() {
    alert("FALHA NA COMPRA TENTE NOVAMENTE!!");
}