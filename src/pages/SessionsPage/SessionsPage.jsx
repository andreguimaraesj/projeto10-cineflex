import styled from "styled-components";
import { useState, useEffect } from "react";
import { getSessions } from "../../components/axios";
import { useNavigate, useParams } from "react-router-dom";
export default function SessionsPage() {
  const { idFilme } = useParams();
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSessions(idFilme, setSessions);
  }, []);


  return (
    <PageContainer>
      Selecione o horário
      {sessions.length === 0 && <div>"loading"</div>}
      {sessions.length !== 0 && (
        <>
          <div>
            {sessions.days.map((day) => {
              return (
                <SessionContainer data-test="movie-day" key={day.id}>
                  {day.weekday} - {day.date}
                  <ButtonsContainer>
                    {day.showtimes.map((time) => {
                      return (
                        <button
                          data-test="showtime"
                          onClick={() => navigate(`/assentos/${time.id}`)}
                        >
                          {time.name}
                        </button>
                      );
                    })}
                  </ButtonsContainer>
                </SessionContainer>
              );
            })}
          </div>
          <FooterContainer data-test="footer">
            <div>
              <img src={sessions.posterURL} alt={sessions.title} />
            </div>
            <div>
              <p>{sessions.title}</p>
            </div>
          </FooterContainer>
        </>
      )}
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

  button {
    width: 83px;
    height: 43px;
    background: #e8833a;
    border: none;
    border-radius: 3px;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
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


const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
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