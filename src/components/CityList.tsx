import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import cityListData from "./cityListData"
import SearchBar from "./SearchBar"


function CityList() {
  const [citySearch, setCitySearch] = useState<string>("")
  const navigate = useNavigate()
  const filteredList: string[] = useMemo(() => cityListData.filter(city => city.toLocaleLowerCase().includes(citySearch.trim().toLocaleLowerCase())), [citySearch])


  return (
    <div className="max-w-[700px] mx-auto px-1">
      <SearchBar search={citySearch} setSearch={setCitySearch} />

      <ul>
        <li>
          {filteredList.map((city: string, key: number) => {
            return <h2 className="text-center" key={key} onClick={() => navigate(city)}>{city}</h2>
          })}
        </li>
      </ul>

    </div>
  )
}

export default CityList
