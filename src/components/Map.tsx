import Turkey from "@react-map/turkey";
import { useNavigate } from "react-router-dom";

function Map() {
  const navigate = useNavigate()

  function handleOnSelect(name: string | null) {
    navigate(name ?? "/") // Cannot be null TS error
  }
  return (
    <div className="mx-auto w-[800px]">
      <h1 className="text-center text-[28px] font-semibold mb-6 cursor-default">Haritadan Şehir Seçin</h1>
      <Turkey type="select-single" hints size={800} mapColor="skyblue" hoverColor="red" onSelect={handleOnSelect}></Turkey>
    </div>
  )
}

export default Map
