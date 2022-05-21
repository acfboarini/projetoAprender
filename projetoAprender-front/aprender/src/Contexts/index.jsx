import React, { createContext, useState } from 'react';
import axios from "axios";

export const AprenderContexts = createContext({});

export const AprenderProvider = ({ children }) => {

    const [ formsInfos, setFormsInfos ] = useState([])

    const getForms = () => {
        axios.get()
    }

    return (
        <AprenderContexts.Provider
            value = {{

            }}
        > 
            { children }
        </AprenderContexts.Provider>
    )
}