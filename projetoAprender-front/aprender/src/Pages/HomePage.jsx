import styled from "styled-components";
import { AprenderContexts } from "../Contexts/index"
import { Link } from "react-router-dom";
import { useContext } from 'react';

export default function HomePage() {

    const { formsInfos } = useContext(AprenderContexts)
    
    return (
        <>
            <Center>
                <Header>
                    <p>Aprender</p>
                </Header>
                <Body>
                    <Margin>
                        <h1>Atividades</h1>
                        {formsInfos.map((forms) =>
                            {return (
                                <>
                                    <Link to={`/formulario/${forms._id}`}>
                                        <Lista>
                                            <p>Lista de cálculo 1</p>
                                        </Lista>
                                    </Link>
                                </>
                            )}
                        )}
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
    justify-content: center;

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
        font-size: 18px;
        font-weight:  500;
        padding-bottom: 15px;
    }
`
const Margin = styled.div`
    width: 90%;
    height: 100%;
    margin-top: 20px;
`
const Lista = styled.div`
    width: 100%;
    height: 8%;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    border-bottom: 1px solid #FBB029;
    border-top: 1px solid #FBB029;

`