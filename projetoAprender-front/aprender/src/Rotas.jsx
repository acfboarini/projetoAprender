import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AprenderProvider } from "./Contexts/index"

import Login from "./Pages/Login"
import HomePage from "./Pages/HomePage"
import Formulario from "./Pages/Formulario"
import Cadastrar from "./Pages/Cadastrar"
import Desempenho from "./Pages/Desempenho"

export default function Router() {
    return(
        <AprenderProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/formulario/:id" element={<Formulario />} />
                    <Route path="/cadastrar" element={<Cadastrar/>} />
                    <Route path="/desempenho" element={<Desempenho/>} />
                </Routes>
            </BrowserRouter>
        </AprenderProvider>
	)
}