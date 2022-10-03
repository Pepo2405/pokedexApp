import React from "react";
import Link from "next/link";

export const NotFound = ({click}) => {
  return (
   
        <div className="error" onClick={click}>
          <div className="errorImg"></div>
          <h2>Perdon mi loco pero no aparecio</h2>
          <p>proba a buscar otro o clickea al bicho para volver</p>
        </div>
  
  );
};
