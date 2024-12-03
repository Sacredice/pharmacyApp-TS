import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocationContext } from "../context/LocationContext"
import Map from "../components/Map"
import CityList from '../components/CityList'
import InfoModal from '../components/InfoModal'
import axios from "axios"
import { IoLocationSharp } from "react-icons/io5";
import { BsFillInfoSquareFill } from "react-icons/bs";


type menuStateType = "map" | "list"

function Home() {
  const [menuType, setMenuType] = useState<menuStateType>("list")
  const { setUserLocation } = useLocationContext()
  const [infoModal, setInfoModal] = useState<boolean>(false)
  const navigate = useNavigate()

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

      if (coordinates.accuracy < 1200) {
        setUserLocation(coordinates);
        navigate(`/${province}`);
        console.log("acurate", province)
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
    }, err => {
      console.log("err", err)
      if (err.message === "User denied Geolocation") {
        alert(`Lokasyon izni kapalı, kullanmak için lokasyon izni gereklidir!\n${err.message}`)
      }
    });
  }


  return (
    <div>
      <div className='hidden lg:flex max-w-[800px] justify-between mx-auto mb-8'>
        <div>
          <button className='bg-blue-600 text-white py-2 px-4 font-bold rounded disabled:opacity-50 mr-3' onClick={() => setMenuType("list")} disabled={menuType === "list"}>Liste</button>
          <button className='bg-blue-600 text-white py-2 px-4 font-bold rounded disabled:opacity-50' onClick={() => setMenuType("map")} disabled={menuType === "map"}>Harita</button>
        </div>
        <button className='bg-red-500 text-white py-2 px-4 font-bold rounded hover:bg-red-600' onClick={findUserLocation}><p><span className='inline-block mr-1'><IoLocationSharp /></span>Konuma En Yakın 3 Eczane</p></button>
      </div>
      <div className='hidden lg:block '>
        {menuType === "map" ? <Map /> : <CityList />}
      </div>
      <div className='lg:hidden'>
        <button className='block bg-red-500 text-white py-2 px-4 font-bold w-full mx-auto max-w-[600px] sm:rounded sticky top-0' onClick={findUserLocation}><p><span className='inline-block mr-1'><IoLocationSharp /></span>Konuma En Yakın 3 Eczane</p></button>
        <CityList />
      </div>
      <BsFillInfoSquareFill title='info' className='absolute top-0 right-0 size-11' onClick={() => setInfoModal(!infoModal)} />
      {infoModal && <InfoModal setInfoModal={setInfoModal} />}
    </div>
  )
}

export default Home
