

export const AprenderContexts = createContext({});

export const AprenderProvider = ({ children }) => {

    return (
        <AprenderContexts.Provider
            value = {{

            }}
        > 
            { children }
        </AprenderContexts.Provider>
    )
}