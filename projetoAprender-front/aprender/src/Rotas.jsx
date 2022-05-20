import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AprenderProvider } from "./Contexts/index"
import Login from "./Pages/Login"

export default function Router() {
    return(
        <AprenderProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                </Routes>
            </BrowserRouter>
        </AprenderProvider>
	)
}