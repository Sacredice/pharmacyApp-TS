import React from 'react'
import Map from "../components/Map"

interface PropTypes {
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

function Home() {
  return (
    <div>
      <Map />
    </div>
  )
}

export default Home
