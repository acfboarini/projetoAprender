import { Link } from "react-router-dom";
import { useState, useContext } from "react";   
import { useNavigate } from "react-router-dom"
import slyled from 'styled-components';
import axios from "axios";
import { AprenderContexts } from "../Contexts/index"


export default function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { getForms } = useContext(AprenderContexts)

    function logar(){
        axios.post("http://localhost:5000/login", {
            email,
            senha: password
        }).then(res => {
            console.log(res.data);
            window.localStorage.setItem("user", JSON.stringify(res.data));
            getForms()
            navigate("/home");
        }).catch(err => {
            console.log(err);
            setEmail("");
            setPassword("");
            alert("Login ou senha incorretos!");
        });
    }

    return ( 
        <Container>
            <h1>Aprender</h1>
            < input type="email" placeholder="Email" onChange={ e => setEmail(e.target.value)}></input>
            < input type="password" placeholder="Senha" onChange={ e => setPassword(e.target.value)}></input>
            < button type="submit" onClick={()=> logar()}>Entrar</button>
            <Link to= "./Cadastrar">
                <p>Primeira vez? Cadastre-se!</p>
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

    font-family: 'Raleway';
    font-style: normal;

    h1{
        font-family: 'Saira Stencil One';
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

`;