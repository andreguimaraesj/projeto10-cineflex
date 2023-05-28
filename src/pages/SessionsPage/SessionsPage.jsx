import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetShowtimes } from "../../Requests";


export default function SessionsPage() {
    const [sessions, setSessions] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        GetShowtimes(movieId, updateSessions);
    }, []);

    function updateSessions(data) {
        setSessions(data);
    }


    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessions.days
                    ? sessions.days.map((s) => (
                          <SessionContainer data-test="movie-day" key={s.id}>
                              <div>
                                  <div className="date">
                                      {s.weekday} - {s.date}
                                  </div>
                                  <ButtonsContainer className="showtime-list">
                                      {s.showtimes.map((time) => (
                                          <button
                                              data-test="showtime"
                                              key={time.id}
                                          >
                                              <Link to={`/assentos/${time.id}`}>
                                                  {time.name}
                                              </Link>
                                          </button>
                                      ))}
                                  </ButtonsContainer>
                              </div>
                          </SessionContainer>
                      ))
                    : "..."}
            </div>
            <FooterContainer data-test="footer">
                <div>
                    <img src={sessions.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessions.title}</p>
                </div>
            </FooterContainer>
        </PageContainer>
    );
}



const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`;



const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: "Roboto";
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`;



const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: "Roboto";
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`;


const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #c3cfd9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001a;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`;