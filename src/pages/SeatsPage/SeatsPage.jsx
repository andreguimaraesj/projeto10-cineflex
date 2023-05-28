import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetSeats } from "../../Requests";


export default function SeatsPage() {
    const [userName, setName] = useState("");
    const [userCpf, setCpf] = useState("");
    const [seats, setSeats] = useState([]);
    const [selected, setSelected] = useState([]);
    const [footer, setFooter] = useState({});
    const navigate = useNavigate();
    const purchase = {
        ids: [],
        name: "",
        cpf: "",
    };
    const { showtimeId } = useParams();

    useEffect(() => {
        GetSeats(showtimeId, updateSeats);
    }, []);



    function sendPurchase() {
        const idArray = selected.map((obj) => obj.id);
        const nameArray = selected.map((obj) => obj.name);

        if (selected.length === 0) {
            alert("Selecione um assento");
            return;
        }
        purchase.ids = idArray;
        purchase.name = userName;
        purchase.cpf = userCpf;
        console.log(footer);
        const { posterURL, name, weekday, time, date } = footer;

        const data = {
            posterURL,
            name,
            weekday,
            time,
            date,
            seatNames: nameArray,
        };

        const postRequest = axios.post(
            "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",
            purchase
        );
        postRequest.then(() =>
            navigate("/sucesso", {
                state: {
                    purchase,
                    data,
                },
            })
        );
        postRequest.catch((err) => console.log(err.data));
    }


    function updateSeats(data) {
      console.log(data);
      let footerData = {};
      footerData = {
          poster: data.movie.posterURL,
          name: data.movie.title,
          weekday: data.day.weekday,
          time: data.name,
          date: data.day.date,
      };

      setFooter((footer) => ({
          ...footer,
          ...footerData,
      }));
      setSeats(data.seats);
  }


    function clickSeat(seat) {
        if (seat.isAvailable === true) {
            const isSelected = selected.some((s) => seat.id === s.id);
            if (isSelected) {
                seat.isSelected = false;
                const newList = selected.filter((s) => seat.id !== s.id);
                setSelected(newList);
            } else {
                seat.isSelected = true;
                setSelected([
                    ...selected.filter((s) => s.id !== seat.id),
                    seat,
                ]);
            }
        } else {
            alert("Esse assento não está disponível");
        }
    }


    const handleCpfChange = (event) => {
        const inputCpf = event.target.value;
        const digitsOnly = inputCpf.replace(/\D/g, "");
        const formattedCpf = digitsOnly.substring(0, 11);

        setCpf(formattedCpf);
    };


    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
                {seats.length > 0
                    ? seats.map((s) => (
                          <SeatItem
                              key={s.id}
                              data-test="seat"
                              isSelected={selected.some(
                                  (seat) => s.id === seat.id
                              )}
                              className={`seat ${
                                  s.isAvailable ? "" : "unavailable"
                              } ${s.isSelected ? "selected" : ""}`}
                              onClick={() => clickSeat(s)}
                          >
                              {s.name}
                          </SeatItem>
                      ))
                    : "..."}
            </SeatsContainer>
            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle className="selected" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle className="unavailable" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>
            <FormContainer>
                Nome do Comprador:
                <input
                    data-test="client-name"
                    type="text"
                    placeholder="Digite seu nome..."
                    value={userName}
                    onChange={(event) => setName(event.target.value)}
                />
                CPF do Comprador:
                <input
                    data-test="client-cpf"
                    type="number"
                    placeholder="Digite seu CPF..."
                    value={userCpf}
                    maxLength={11}
                    onInput={handleCpfChange}
                />
                <button data-test="book-seat-btn" onClick={sendPurchase}>
                    Reservar Assento(s)
                </button>
            </FormContainer>
            <FooterContainer data-test="footer">
                <div>
                    <img src={footer.poster} alt="poster" />
                </div>
                <div>
                    <p>{footer.name}</p>
                    <p>
                        {footer.weekday} - {footer.time}
                    </p>
                </div>
            </FooterContainer>
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


const FormContainer = styled.div`
    width: calc(100vw - 40px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`;


const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`;


const CaptionCircle = styled.div`
    border: 1px solid #7b8b99;
    background-color: #c3cfd9;
    &.unavailable {
        border: 1px solid #f7c52b;
        background-color: #fbe192;
    }

    &.selected {
        border: 1px solid #0e7d71;
        background-color: #1aae9e;
    }
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;


const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`;


const SeatItem = styled.div`
    border: 1px solid #7b8b99;
    background-color: #c3cfd9;
    &.unavailable {
        border: 1px solid #f7c52b;
        background-color: #fbe192;
    }

    &.selected {
        border: 1px solid #0e7d71;
        background-color: #1aae9e;
    }
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: "Roboto";
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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