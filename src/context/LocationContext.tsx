import { createContext, ReactElement, useContext, useState } from "react";

export type coordsType = {
  accuracy: number,
  lat: number,
  lon: number,
} | null

interface LocationContextType {
  userLocation: coordsType,
  setUserLocation: React.Dispatch<React.SetStateAction<coordsType>>,
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const LocationProvider = ({ children }: ChildrenType): ReactElement => {
  const [userLocation, setUserLocation] = useState<coordsType>(null);

  return (
    <LocationContext.Provider value={{ userLocation, setUserLocation }} >
      {children}
    </LocationContext.Provider>
  )
}

export const useLocationContext = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocationContext must be used within a LocationProvider")
  }
  return context
}
