import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import City from "./pages/City"


function App() {

  return (
    <div>
      <header>
        <h1 className="font-bold text-3xl lg:text-4xl text-center mb-6">Nöbetçi Eczaneler</h1>
      </header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path=":city" element={<City />}></Route>
          </Routes>
        </Router>
      </main>
    </div>
  )
}

export default App
