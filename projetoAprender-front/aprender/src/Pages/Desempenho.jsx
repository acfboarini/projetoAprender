import { Link } from "react-router-dom";
import { useState, useEffect } from "react";   
import { useNavigate } from "react-router-dom"
import { IoPencil } from "react-icons/io5" ; 
import slyled from 'styled-components';
import axios from "axios";

export default function Desempenho() {
    const userJSON = window.localStorage.getItem("user");
    const {name, token} = JSON.parse(userJSON);
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    const [ desempenho, setDesempenho] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/statistics`, config)
        .then((answer) => {
            // setDesempenho(answer.data); console.log(answer.data);
            console.log(answer)
        })
        .catch((error) => console.log(error))       
    }, []);

    return ( 
        <Container>
            <h1>Desempenho</h1>
            <div className="lista">
                <h2> Nome lista <IoPencil className="icon"/></h2>
                <div className="infosQuestoes">
                    <div className="questao">
                        <p>Questoes: 10</p>
                    </div>
                    <div className="acertos">
                        <p>Acertos: 10%</p>
                    </div>
                </div>
                {/* <button>Enviar</button> */}
            </div>
           
            
        </Container>
    )
}


const Container = slyled.div`

    *{
        box-sizing: border-box;
    }
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 100vh;
    flex-direction: column;
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
        margin-top: 15px;
        margin-bottom: 5px;
    }

    .lista{
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        height: 150px;
        background: #FB7E00;
        border-radius: 10px;

        h2{
            font-family: 'Saira Stencil One';
            width: 100%;
            
            display: flex;
            align-items: center;
            justify-content: center;
            background: #00605F;
            font-style: normal;
            font-weight: 400;
            font-size: 32px;
            line-height: 50px;
            color: #FFFFFF;
            margin-bottom: 5px;
            border-radius: 10px 10px 0px 0px;

            .icon{
                margin-left: 10px;
                color: #FBB019;
            }
        }
    }

    .infosQuestoes{
        margin-top: 24px;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        width: 98%;
        height: auto;
        blackground: yellow;
        p{
            font-weight: 700;
            font-size: 25px;
            line-height: 18px;

            color: #FFFFFF;
        }
    }

    button{
    
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        border-radius: 10px;
        background-color: #FF4200;
        color: #FFFFFF;
        font-size: 30px;
        border: none;
        height: 60px;
    }

    

`;