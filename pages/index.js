import Cards from "../components/pokemons";
import { GiPokecog } from "react-icons/gi";
import { useState } from "react";

export default function Home({ data, types }) {
  const [filtro, setFiltrar] = useState(data);

  const filtrar = (eltipo) => {
    setFiltrar(data);
    if (eltipo === "borrar") {
      setFiltrar(data);
    } else {
      let tipofiltrado = data
        .filter((pokemon) => pokemon.types.some((tipo) => {
          console.log("tipo",tipo)
          return tipo === eltipo}))
        .map((tem2) => {
          let nuevosTem = { ...tem2 };
          return nuevosTem;
        });
        console.log(tipofiltrado)
      setFiltrar(tipofiltrado);
    }
  };

  return (
    <>
      <header className="home-header">
        <h2 style={{ color: "#eaeaea" }}>
          <GiPokecog className="tuerca" /> Pokemones{" "}
          <GiPokecog className="tuerca" />
        </h2>
        <details>
          <summary>Types:</summary>
          <ul className="botonera-clases">
            <li className={`boton`} onClick={() => filtrar("borrar")}>Todos</li>
            {types.map((type) => {
              return (
                <li
                  key={type.name}
                  onClick={() => filtrar(type.name)}
                  className={`boton ${type.name}`}
                >
                  {type.name}
                </li>
              );
            })}
          </ul>
        </details>
      </header>
      <Cards data={data} filtro={filtro} />
    </>
  );
}

export async function getStaticProps(context) {
  let pokemonsRaw = [];
  for (let i = 1; i <= 102; i++) {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(
      (response) => response.json()
    );
    pokemonsRaw.push(data);
  }
  let pokemons_mini = pokemonsRaw.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.other.dream_world.front_default,
      types: pokemon.types.map((item) => item.type.name),
    };
  });
  let data_types = await fetch("https://pokeapi.co/api/v2/type/")
    .then((response) => response.json())
    .then((data) => data.results);
  return {
    props: {
      data: pokemons_mini,
      types: data_types,
    },
  };
}
