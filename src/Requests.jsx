import axios from "axios";
axios.defaults.headers.common["Authorization"] = "HjXMyp7A0SPwXN3IopYIHefH";



function GetShowtimes(movieId, func) {
    axios
        .get(
            `https://mock-api.driven.com.br/api/v8/cineflex/movies/${movieId}/showtimes`
        )
        .then((res) => func(res.data));
}


function GetMovies(func) {
    axios
        .get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
        .then((res) => func(res.data));
}



function GetSeats(showtimeId, func) {
    axios
        .get(
            `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${showtimeId}/seats`
        )
        .then((res) => func(res.data));
}



function BookSeats(idList, name, cpf, func) {
    const purchase = {
        ids: idList,
        name: `${name}`,
        cpf: `${cpf}`,
    };
    axios
        .post(
            `https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`,
            purchase
        )
        .then((res) => func(res.data));
}


export { GetMovies, GetShowtimes, GetSeats, BookSeats };