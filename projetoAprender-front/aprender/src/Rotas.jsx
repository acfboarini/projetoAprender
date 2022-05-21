import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AprenderProvider } from "./Contexts/index"

import Login from "./Pages/Login"
import HomePage from "./Pages/HomePage"
import Formulario from "./Pages/Formulario"

export default function Router() {
    return(
        <AprenderProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/formulario" element={<Formulario />} />
                </Routes>
            </BrowserRouter>
        </AprenderProvider>
	)
}