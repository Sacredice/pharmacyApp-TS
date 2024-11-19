import { IoLocationSharp } from "react-icons/io5";
import { dataType } from '../utilityFunctions';



interface PropsType {
  pharmacyObj: dataType
}

function Pharmacy({ pharmacyObj }: PropsType) {

  return (
    <li>
      <div>
        <h3><span>Eczane: {pharmacyObj.name}</span><span>İlçe: {pharmacyObj.dist}</span></h3>
        <address>{pharmacyObj.address}</address>
        <p>
          <a href="tel:{pharmacyObj.phone}">Tel: {pharmacyObj.phone}</a>
          <a href={`https://www.google.com/maps/search/?api=1&query=${pharmacyObj.loc}`} target='_blank' rel='noreferrer'><b>Konum</b><IoLocationSharp style={{ color: "deepskyblue", fontSize: "1.3rem" }} /></a>
        </p>
      </div>
    </li>
  )
}

export default Pharmacy