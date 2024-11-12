import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import City from "./pages/City"


function App() {
  const [search, setSearch] = useState("")

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:city" element={<City />}></Route>


        </Routes>
      </Router>
    </>
  )
}

export default App
