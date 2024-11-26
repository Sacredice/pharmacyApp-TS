import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import cityListData from "./cityListData"
import SearchBar from "./SearchBar"


function CityList() {
  const [citySearch, setCitySearch] = useState<string>("")
  const navigate = useNavigate()
  const filteredList: string[] = useMemo(() => cityListData.filter(city => city.toLocaleLowerCase().includes(citySearch.trim().toLocaleLowerCase())), [citySearch])


  return (
    <div className="max-w-[600px] mx-auto mb-16">
      <div className="sticky top-[44px] lg:hidden">
        <SearchBar search={citySearch} setSearch={setCitySearch} />
      </div>
      <div className="sticky top-0 hidden lg:block">
        <SearchBar search={citySearch} setSearch={setCitySearch} />
      </div>

      <ul className="border border-black divide-y divide-black rounded">
        {filteredList.map((city: string, key: number) => {
          return <li className="bg-blue-400 text-xl text-center list-none py-1.5 font-bold cursor-pointer" key={key} onClick={() => navigate(city)}>{city}</li>
        })}
      </ul>

    </div>
  )
}

export default CityList
