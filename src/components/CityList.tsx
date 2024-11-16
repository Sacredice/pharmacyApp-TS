import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import cityListData from "./cityListData"
import SearchBar from "./SearchBar"
import axios from "axios"
import { useLocationContext } from "../context/LocationContext"


function CityList() {
  const [citySearch, setCitySearch] = useState<string>("")
  const navigate = useNavigate()
  const { setUserLocation } = useLocationContext()
  const filteredList: string[] = useMemo(() => cityListData.filter(city => city.toLocaleLowerCase().includes(citySearch.trim().toLocaleLowerCase())), [citySearch])

  interface coordsType {
    accuracy: number,
    lat: number,
    lon: number,
    city?: string,
  }

  const getCityFromCoords = async (coordinates: coordsType): Promise<void> => {
    const lat = coordinates.lat;
    const lon = coordinates.lon;
    try {
      const response = await axios(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const province = response.data.address.province;

      if (coordinates.accuracy < 1000) {
        setUserLocation(coordinates);
        navigate(`/${province}`);
      } else {
        alert(`UYARI: Cihazın konum hassasiyeti yeterli olmadığından ${province} eczaneleri listesine yönlendirileceksiniz!`);
        setUserLocation(null);
        navigate(`/${province}`);
      }
    } catch (err) {
      console.log(`Error: ${(err as Error).message}`);
    }
  }

  const findUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coordinates: coordsType = {
        accuracy: position.coords.accuracy,
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };
      getCityFromCoords(coordinates);
    }, err => console.log(err));
  }


  return (
    <div>
      <SearchBar search={citySearch} setSearch={setCitySearch} />

      <li>
        <ul>
          {filteredList.map((city: string, key: number) => {
            return <h2 key={key} onClick={() => navigate(city)}>{city}</h2>
          })}
        </ul>
      </li>
      <div onClick={findUserLocation}><p>En Yakın 3 Eczane</p></div>

    </div>
  )
}

export default CityList
