import Turkey from "@react-map/turkey";
import { useNavigate } from "react-router-dom";

function Map() {
  const navigate = useNavigate()

  function handleOnSelect(name: string | null) {
    console.log(name)
    navigate(name ?? "/") // Cannot be null TS error
  }
  return (
    <div className="mx-auto w-[800px]">
      <Turkey type="select-single" hints size={800} mapColor="skyblue" hoverColor="red" onSelect={handleOnSelect}></Turkey>
    </div>
  )
}

export default Map
