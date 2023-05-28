import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getSeats, postReserve } from "../../components/axios";
export default function SeatsPage() {
  const { idSessao } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedId, setSelectedID] = useState([]);
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();
  const cpfMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2") 
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };


  useEffect(() => {
    getSeats(idSessao, setSeats);
  }, []);

  function sendPost(e) {
    e.preventDefault();

    if (selected.length === 0) {
      return alert("Nenhum assento Selecionado");
    }

    const dataReserve = {
      movie: seats.movie.title,
      day: seats.day.date,
      hour: seats.name,
      seats: [...selected],
      cpf,
      name,
    };

    const newReserve = {
      ids: [...selectedId],
      cpf: cpf.replaceAll(/[\.\-]/g, ""),
      name,
    };

    const sucess = () => navigate(`/sucesso`, { state: { dataReserve } });

    postReserve(newReserve, sucess);
  }


  return (
    <PageContainer>
      Selecione o(s) assento(s)
      {seats.length === 0 && <div>"loading"</div>}
      {seats.length !== 0 && (
        <>
          <SeatsContainer>
            {seats.seats.map((seat) => {
              return (
                <SeatItem
                  data-test="seat"
                  key={seat.id}
                  bg={
                    selectedId.includes(seat.id)
                      ? "#1AAE9E"
                      : seat.isAvailable
                      ? "#C3CFD9"
                      : "#FBE192"
                  }
                  border={
                    selectedId.includes(seat.id)
                      ? "#0E7D71"
                      : seat.isAvailable
                      ? "#7B8B99"
                      : "#F7C52B"
                  }
                  onClick={() => {
                    if (!seat.isAvailable) {
                      alert("Esse assento não está disponível");
                    } else {
                      if (selectedId.includes(seat.id)) {
                        setSelected([
                          ...selected.filter((name) => name !== seat.name),
                        ]);
                        setSelectedID([
                          ...selectedId.filter((id) => id !== seat.id),
                        ]);
                      } else {
                        setSelected([...selected, seat.name]);
                        setSelectedID([...selectedId, seat.id]);
                      }
                    }
                  }}
                >
                  {seat.name}
                </SeatItem>
              );
            })}
          </SeatsContainer>

          <CaptionContainer>
            <CaptionItem>
              <CaptionCircle color={"#1AAE9E"} border={"#0E7D71"} />
              Selecionado
            </CaptionItem>
            <CaptionItem>
              <CaptionCircle color={"#C3CFD9"} border={"#7B8B99"} />
              Disponível
            </CaptionItem>
            <CaptionItem>
              <CaptionCircle color={"#FBE192"} border={"#F7C52B"} />
              Indisponível
            </CaptionItem>
          </CaptionContainer>

          <FormContainer onSubmit={sendPost}>
            <label htmlFor="name">Nome do Comprador:</label>
            <input
              data-test="client-name"
              id="name"
              placeholder="Digite seu nome..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="cpf">CPF do Comprador:</label>
            <input
              data-test="client-cpf"
              pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
              maxLength="14"
              id="cpf"
              placeholder="Digite seu CPF..."
              value={cpfMask(cpf)}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
            <button data-test="book-seat-btn" type="submit">
              Reservar Assento(s)
            </button>
          </FormContainer>

          <FooterContainer data-test="footer">
            <div>
              <img src={seats.movie.posterURL} alt={seats.movie.title} />
            </div>
            <div>
              <p>{seats.movie.title}</p>
              <p>
                {seats.day.weekday} - {seats.name}
              </p>
            </div>
          </FooterContainer>
        </>
      )}
    </PageContainer>
  );
}



const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;


const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;


const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;

  button {
    align-self: center;
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
  input {
    width: calc(100vw - 60px);
    height: 51px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    &::placeholder {
      padding-left: 20px;
      font-style: italic;
      font-weight: 400;
      font-size: 18px;
      line-height: 21px;
      color: #afafaf;
    }
  }
`;



const CaptionCircle = styled.div`
  border: 1px solid ${({ border }) => border}; // Essa cor deve mudar
  background-color: ${({ color }) => color}; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;


const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;


const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
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


const SeatItem = styled.button`
  height: 26px;
  width: 26px;
  border-radius: 12px;
  border: 1px solid ${({ border }) => border}; // Essa cor deve mudar
  background-color: ${({ bg }) => bg};
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;