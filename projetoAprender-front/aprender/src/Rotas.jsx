import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AprenderProvider } from "./Contexts/index"
import Login from "./Pages/Login"
import Cadastrar from "./Pages/Cadastrar"
import Desempenho from "./Pages/Desempenho"

export default function Router() {
    return(
        <AprenderProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/cadastrar" element={<Cadastrar/>} />
                    <Route path="/desempenho" element={<Desempenho/>} />
                </Routes>
            </BrowserRouter>
        </AprenderProvider>
	)
}