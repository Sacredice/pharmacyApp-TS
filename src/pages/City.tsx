import React from "react";
import { useParams } from "react-router-dom";

function City() {
  const { city } = useParams();
  return (
    <div>
      <p>{city}</p>
    </div>
  );
}

export default City;
