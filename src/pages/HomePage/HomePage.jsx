import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetMovies } from "../../Requests";


export default function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        GetMovies(updateMovies);
    }, []);

    function updateMovies(data) {
        setMovies(data);
    }


    return (
        <PageContainer>
            Selecione o filme
            <ListContainer>
                {movies.map((m) => (
                    <Link data-test="movie" key={m.id} to={`/sessoes/${m.id}`}>
                        <MovieContainer>
                            <img src={m.posterURL} alt="" />
                        </MovieContainer>
                    </Link>
                ))}
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
    width: 100%;
    align-items: center;
    font-family: "Roboto";
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`;