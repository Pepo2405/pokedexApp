import React from 'react'
import { GiPokecog } from "react-icons/gi";
import { Searcher } from "../components/searcher";
import {motion} from 'framer-motion'



const Header = ({types,prueba,filtrar2,load}) => {
  return (
    
    <header className="home-header">
    <h2 style={{ color: "#eaeaea" }} onClick={() => restore}>
      <GiPokecog className="tuerca" /> Pokemones{" "}
      <GiPokecog className="tuerca" />
    </h2>
    <details>
      <summary>Types:</summary>
      <ul className="botonera-clases">
        <li className={`boton`} onClick={() => filtrar2("borrar")}>
          Todos
        </li>
        {types.map((type) => {
          return (
            <motion.li
              key={type.name}
              onClick={() => filtrar2(type.name)}
              className={`boton ${type.name}`}
              whileHover={{scale:1.10}}
            >
              {type.name}
            </motion.li>
          );
        })}
      </ul>
    </details>
    <Searcher handleSubmit={prueba} />
  </header>
  )
}

export default Header