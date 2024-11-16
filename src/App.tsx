import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import City from "./pages/City"


function App() {

  return (
    <>
      <header>
        <h1>Nöbetçi Eczaneler</h1>
      </header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path=":city" element={<City />}></Route>
          </Routes>
        </Router>
      </main>
    </>
  )
}

export default App
