import { useState } from "react"
import { useNavigate } from "react-router-dom"
import cityListData from "./cityListData"
import SearchBar from "./SearchBar"

function CityList() {
  const [citySearch, setCitySearch] = useState<string>("")
  const navigate = useNavigate()
  return (
    <div>
      <SearchBar search={citySearch} setSearch={setCitySearch} />

      <li>
        <ul>
          {cityListData.map((city: string, key: number) => {
            return <h2 key={key} onClick={() => navigate(city)}>{city}</h2>
          })}
        </ul>
      </li>

    </div>
  )
}

export default CityList
