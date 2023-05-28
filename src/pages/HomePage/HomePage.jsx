import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../components/axios";



export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getMovies(setMovies);
  }, []);
  return (
    <PageContainer>
      Selecione o filme
      <ListContainer>
        {movies.map((movie) => {
          return (
            <MovieContainer data-test="movie" key={movie.id}>
              <img
                src={movie.posterURL}
                alt={movie.title}
                onClick={() => navigate(`/sessoes/${movie.id}`)}
              />
            </MovieContainer>
          );
        })}
      </ListContainer>
    </PageContainer>
  );
}


const ListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;


const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-top: 70px;
`;