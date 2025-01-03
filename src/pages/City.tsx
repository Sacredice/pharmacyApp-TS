import { useState, useEffect, useMemo } from "react"
import { useLocationContext } from "../context/LocationContext";
import { dataType } from "../utilityFunctions";
import { useParams, useNavigate } from "react-router-dom";
import { getThreeClosest, dynamicSort, nextShiftTimestamp } from "../utilityFunctions";
import axios from "axios";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import SearchBar from "../components/SearchBar";
import Pharmacy from "../components/Pharmacy";


function City() {
  const { userLocation, setUserLocation } = useLocationContext();
  const [pharmacyObjs, setPharmacyObjs] = useState<dataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [pharmacySearch, setPharmacySearch] = useState<string>("");
  const { city } = useParams();
  const navigate = useNavigate();
  const filteredPharmacies: dataType[] = useMemo(() => pharmacyObjs.filter((pharmacy) =>
    (((pharmacy.dist).toLocaleLowerCase()).includes(pharmacySearch.toLocaleLowerCase().trim())) ||
    ((pharmacy.address).toLocaleLowerCase()).includes(pharmacySearch.toLocaleLowerCase().trim())
  ), [pharmacySearch, pharmacyObjs]);


  const url: string = import.meta.env.VITE_BASE_CITY_URL + "/?il=" + city

  useEffect(() => {

    const handleCityPharmacies = async (city: string) => {
      /**
       * handleCityPharmacies funcion check nextshift timestamp is passed or not, if not use localStorage data otherwise 
       * get new data from API. And for both condition check userLocation is null or not, if not setCityObj with all data
       *  otherwise call getThreeClosest function to filter 3 closest pharmacy and use it to render list. 
       */
      const storageData = localStorage.getItem(city)


      if (storageData && ((JSON.parse(storageData))[1] > Date.now())) {
        const dataArray = JSON.parse((storageData))[0];
        if (userLocation) {
          setPharmacyObjs(getThreeClosest(userLocation, dataArray));
          setUserLocation(null);
        } else {
          setPharmacyObjs(dataArray);
        }
      } else {
        setIsLoading(true);
        try {
          const response = await axios.get(url, {
            headers: {
              "authorization": import.meta.env.VITE_API_KEY,
              "content-type": "application/json",
            }
          });
          console.log(response.data)
          if (response.data.success) {
            console.log(response);
            const sortedData: dataType[] = response.data.result.sort(dynamicSort("dist"));
            const storageArray = [sortedData, nextShiftTimestamp()];
            localStorage.setItem(city, JSON.stringify(storageArray));
            if (userLocation) {
              setPharmacyObjs(getThreeClosest(userLocation, sortedData));
            } else {
              setPharmacyObjs(sortedData);
            }
            setFetchError(null);
          } else {
            setFetchError("Server isteği reddedildi. Server hizmet dışı veya API aylık 100 istek limiti aşılmış olabilir!")
            console.log(fetchError)
          }

        } catch (err) {
          console.log(`Error: ${(err as Error).message}`);
          console.log(`Error: ${err as Error}`);
          setFetchError((err as Error).message);
        } finally {
          setIsLoading(false);
          setUserLocation(null);
        }
      }
    }
    if (city) {
      handleCityPharmacies(city);
    }
  }, [city, setPharmacyObjs, setIsLoading, setUserLocation])

  // useEffect(() => {
  //   const filteredPharmacies = pharmacyObjs.filter((pharmacy) =>
  //     (((pharmacy.dist).toLocaleLowerCase()).includes(pharmacySearch.toLocaleLowerCase())) ||
  //     ((pharmacy.address).toLocaleLowerCase()).includes(pharmacySearch.toLocaleLowerCase())
  //   );
  //   setSearchPharmacyResults(filteredPharmacies);
  // }, [pharmacySearch, pharmacyObjs, setPharmacyObjs, setIsLoading])

  const handleBack = () => {
    setPharmacySearch("");
    navigate("/");
  }


  return (

    <div className="max-w-[600px] mx-auto">
      <SearchBar search={pharmacySearch} setSearch={setPharmacySearch} />
      {isLoading && <p className="text-3xl text-center text-blue-800"><b>Liste Yükleniyor...</b></p>}
      {!isLoading && fetchError && <p className=" text-2xl text-red-500 text-center font-bold">{fetchError}</p>}
      {!isLoading && !fetchError && <section>
        <ul className="border border-black rounded divide-y divide-black">
          {filteredPharmacies.map((pharmacyObj, key) => (
            <Pharmacy pharmacyObj={pharmacyObj} key={key} />
          ))}
        </ul>
      </section>}
      <BsArrowLeftSquareFill className="size-11 absolute top-0 left-0 dark:fill-slate-100" title='Geri Dön' onClick={handleBack} />
    </div>
  );
}

export default City;
