import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AprenderProvider } from "./Contexts/index"

export default function Router() {
    return(
        <AprenderProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                </Routes>
            </BrowserRouter>
        </AprenderProvider>
	)
}