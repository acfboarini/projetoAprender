import { Link } from "react-router-dom";
import { useState } from "react";   
import { useNavigate } from "react-router-dom"
import slyled from 'styled-components';
import axios from "axios";


export default function Desempenho() {
    
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const navigate = useNavigate();

    // function logar(){
    //     axios.post("https://back-wallett.herokuapp.com/login", {
    //         email,
    //         senha: password
    //     }).then(res => {
    //         console.log(res.data);
    //         localStorage.setItem('token', res.data.token);
    //         localStorage.setItem('name', res.data.name);
    //         navigate("/home");
    //     }).catch(err => {
    //         console.log(err);
    //         setEmail("");
    //         setPassword("");
    //         alert("Login ou senha incorretos!");
    //     });
    // }

    return ( 
        <Container>
            <h1>Desempenho</h1>
            <div className="infosQuestoes">
                <p>Questoes</p>
                <p>Acertos</p>
            </div>
            
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

    .infosQuestoes{
        margin-top: 24px;
        padding: 24px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100vh;
        blackground: yellow;
        p{
            font-weight: 700;
            font-size: 25px;
            line-height: 18px;

            color: #FFFFFF;
        }
    }

    

`;