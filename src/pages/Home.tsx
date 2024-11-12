import { useState } from 'react'
import Map from "../components/Map"
import CityList from '../components/CityList'


type menuStateType = "map" | "list"

function Home() {
  const [menuType, setMenuType] = useState<menuStateType>("list")

  return (
    <div>
      <button onClick={() => setMenuType("list")} disabled={menuType === "list"}>Liste</button>
      <button onClick={() => setMenuType("map")} disabled={menuType === "map"}>Harita</button>
      {menuType === "map" ? <Map /> : <CityList />}
    </div>
  )
}

export default Home
