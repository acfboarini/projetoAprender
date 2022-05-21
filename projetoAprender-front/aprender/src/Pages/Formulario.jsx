import styled from "styled-components";
import RenderButton from "../Componentes/RenderButton"
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import axios from "axios";

export default function Formulario() {
    const userJSON = window.localStorage.getItem("user");
    const {name, token} = JSON.parse(userJSON);
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    let questionNumber = 0
    const { id } = useParams();
    const [ listaInfos, setListaInfos ] = useState([]);
    const [ respostas, setRespsotas ] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/listas/${id}`)
        .then((answer) => {
            setListaInfos(answer.data.questoes); console.log(answer.data)
        })
        .catch((error) => console.log(error))       
    }, []);

    function OnSubmit(e){
        e.preventDefault();
        let acertos = 0
        respostas.forEach((answer) => {
            if(answer.isCorrect){
                acertos ++
            }
        })
        let enviar = {
            nome: listaInfos.name,
            id: listaInfos._id,
            qtdMin: listaInfos.minAcertos,
            qtdAcertos: acertos,
            totalQuestoes: acertos.length
        }
        axios.post("http://localhost:5000/doneLists", enviar, config)
        .then((response) => {console.log(response.data); navigate('/desempenho')})
        .catch((error) => console.log(error))
    }

    return (
        <>
            <Center>
                <Header>
                    <Link to="/home">
                        <Icon>
                            <ion-icon name="chevron-back-outline"></ion-icon>
                        </Icon>
                    </Link>
                    <p>Aprender</p>
                </Header>
                <Body>
                    <Margin>
                    <Form onSubmit = {OnSubmit}>
                        <Question>
                                {listaInfos.map((question, index) => {
                                    questionNumber += 1
                                    return (
                                        <>
                                            <h1>Questão {questionNumber}</h1>
                                            <Lista>
                                                <h2>{question.pergunta}</h2>
                                                    <Select
                                                        required
                                                        onChange = {(e) => {setRespsotas([...respostas, {
                                                            id: question._id,
                                                            res: e.target.value,
                                                            isCorrect: e.target.value == question.resCorreta 
                                                        }])}}>
                                                            <option value = "">Selecione uma resposta</option>
                                                            {(question.respostas).map((option) => {
                                                                return (
                                                                    <>
                                                                        <option value = {`${option}`}>{`${option}`}</option>
                                                                    </>
                                                                )
                                                            })}
                                                    </Select>
                                            </Lista>
                                        </>
                                    )
                                })}
                        </Question>
                        <Button disabled = {false} type="submit">
                            <RenderButton state = {false} text="Enviar respostas"/>
                        </Button>
                        </Form>
                    </Margin>
                </Body>
            </Center>
        </>
    )
}

const Center = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #34A49E;
    font-family: 'Raleway', sans-serif;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #2E2E2E;
`

const Header = styled.header`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    p {
        font-size: 24px;
        font-weight: 500;
        color: white;
    }
`
const Body = styled.body`
    width: 90%;
    height: 100vh;
    background-color: white;
    border-radius: 40px 40px 0px 0px;
    display: flex;
    justify-content: center;

    h1 {
        font-size: 20px;
        font-weight:  500;
        margin-bottom: 15px;
    }
`
const Margin = styled.div`
    width: 90%;
    height: 100%;
    padding-top: 20px;
`
const Lista = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 5px;

    h2 {
        font-size: 18px;
        padding-bottom: 20px;
    }
`
const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`
const Select = styled.select`
    width: 100%;
    height: 30px;
    border: none;
    box-sizing: border-box;
    margin-bottom: 10px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    border: 1px solid #FBB029;
    background-color: white;
    color: #2E2E2E;
`
const Question = styled.div`
    width: 100%;
    height: auto;
`
const Button = styled.button`
    width: 100%;
    height: 50px;
    border-radius: 10px;
    background: #FB9759;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    border: none;
    font-size: 21px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px;
    color: white;
    margin-bottom: 20px;

    &:disabled {
    opacity: 0.7;
  }
`
const Icon = styled.p`
    font-size: 30px;
    color: white;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    align-items: center;

    &:active {
        opacity: 0.7;
    }
`