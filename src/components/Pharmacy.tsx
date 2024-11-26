import { IoLocationSharp } from "react-icons/io5";
import { dataType } from '../utilityFunctions';



interface PropsType {
  pharmacyObj: dataType
}

function Pharmacy({ pharmacyObj }: PropsType) {

  return (
    <li className="bg-blue-400 p-1.5 lg:px-3">
      <div>
        <div className="flex justify-between font-bold font-s">
          <p><span className="text-red-700">Eczane:</span> {pharmacyObj.name}</p><p>İlçe: {pharmacyObj.dist}</p>
        </div>
        <address><b>Adres:</b> {pharmacyObj.address}</address>
        <div className="flex justify-between">
          <a className="hover:text-blue-900" href="tel:{pharmacyObj.phone}"><b>Tel:</b> {pharmacyObj.phone}</a>
          <a className="flex group" href={`https://www.google.com/maps/search/?api=1&query=${pharmacyObj.loc}`} target='_blank' rel='noreferrer'><b className="group-hover:opacity-70">Konum</b><IoLocationSharp className="fill-red-500 text-lg" /></a>
        </div>
      </div>
    </li>
  )
}

export default Pharmacy