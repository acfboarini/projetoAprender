import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import slyled from 'styled-components';
import axios from "axios";

export default function Cadastrar() {

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [password, setPassword] = useState("");
    const [confirmacaoPassword, setConfirmacaoPassword] = useState("");

    const navigate = useNavigate();
    
    function cadastrar(){
        axios.post("https://app-aprender.herokuapp.com/signup", {
            name: nome,
            email,
            senha: password,
            checkSenha: confirmacaoPassword
        }).then(res => {
            navigate("/");
        }).catch(err => {
            console.log(err);
        });
    }
    return(
        <Container>
            <h1>Aprender</h1>
            < input type="input" placeholder="Nome"  onChange={ e => setNome(e.target.value)}></input>
            < input type="email" placeholder="E-mail" onChange={ e => setEmail(e.target.value)}></input>
            < input type="password" placeholder="Senha" onChange={ e => setPassword(e.target.value)}></input>
            < input type="password" placeholder="Confirme a senha" onChange={ e => setConfirmacaoPassword(e.target.value)}></input>
            < button type="submit" onClick={() => cadastrar()}>Cadastrar</button>
            <Link to= "/">
                <p>Já tem uma conta? Entre agora!</p>
            </Link>
        </Container>
    )
}

const Container = slyled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #00A49E;
    font-family: 'Raleway', sans-serif;

    font-style: normal;

    h1{
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #FFFFFF;
        margin-bottom: 24px;
    }

    input{
        width: 90%;
        height: 58px;
        background: #FFFFFF;
        border: none;
        border-radius: 5px;
        margin-bottom: 13px;

        text-indent: 15px;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;

    }

    input::placeholder{
        text-indent: 15px;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
    }

    button{
        width: 90%;
        height: 46px;
        background: #FF4200;
        border-radius: 5px;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        border: none;
        color: #FFFFFF;
        margin-bottom: 24px;
    }

    p{
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;

        color: #FFFFFF;
    }

`