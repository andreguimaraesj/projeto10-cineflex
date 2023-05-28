import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";



export default function SuccessPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <PageContainer>
      <h1>
        Pedido feito <br /> com sucesso!
      </h1>

      <TextContainer data-test="movie-info">
        <strong>
          <p>Filme e sessão</p>
        </strong>
        <p>{state.dataReserve.movie}</p>
        <p>
          {state.dataReserve.day} - {state.dataReserve.hour}
        </p>
      </TextContainer>

      <TextContainer data-test="seats-info">
        <strong>
          <p>Ingressos</p>
        </strong>
        {state.dataReserve.seats.map((seat) => {
          return <p key={seat}>Assento {seat}</p>;
        })}
      </TextContainer>

      <TextContainer data-test="client-info">
        <strong>
          <p>Comprador</p>
        </strong>
        <p>Nome: {state.dataReserve.name}</p>
        <p>CPF: {state.dataReserve.cpf}</p>
      </TextContainer>

      <button data-test="go-home-btn" onClick={() => navigate("/")}>
        Voltar para Home
      </button>
    </PageContainer>
  );
}



const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  color: #293845;
  margin: 30px 20px;
  padding-bottom: 120px;
  padding-top: 70px;
  a {
    text-decoration: none;
  }
  button {
    margin-top: 50px;
    width: 225px;
    height: 42px;
    background: #e8833a;
    border-radius: 3px;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    letter-spacing: 0.04em;

    color: #ffffff;
  }
  h1 {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #247a6b;
  }
`;


const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  strong {
    font-weight: bold;
    margin-bottom: 10px;
  }
`;