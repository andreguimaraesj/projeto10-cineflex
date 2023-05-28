import axios from "axios";

export function apiToken(key) {
  axios.defaults.headers.common["Authorization"] = { key };
}

export function getMovies(set) {
    axios
      .get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
      .then((res) => set(res.data))
      .catch((error) => console.log(error.response));
  }
  
  

export function postReserve(data, callBack) {
    axios
      .post(
        "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",
        data
      )
      .then(() => callBack())
      .catch((error) => console.log(error.response));
  }



export function getSeats(idSession, set) {
  axios
    .get(
      `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats`
    )
    .then((res) => set(res.data))
    .catch((error) => console.log(error.response));
}


export function getSessions(idMovie, set) {
    axios
      .get(
        `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idMovie}/showtimes`
      )
      .then((res) => set(res.data))
      .catch((error) => console.log(error.response));
  }

