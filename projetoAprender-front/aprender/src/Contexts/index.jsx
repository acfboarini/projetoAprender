import React, { createContext, useState } from 'react';
import axios from "axios";

export const AprenderContexts = createContext({});

export const AprenderProvider = ({ children }) => {

    const [ formsInfos, setFormsInfos ] = useState([])

    const getForms = () => {
        axios.get("http://localhost:5000/listas")
        .then((answer) => {setFormsInfos(answer.data); console.log(answer.data)})
        .catch((error) => console.log(error))
    }

    return (
        <AprenderContexts.Provider
            value = {{
                getForms,
                formsInfos,
            }}
        > 
            { children }
        </AprenderContexts.Provider>
    )
}