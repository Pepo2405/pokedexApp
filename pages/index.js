import Cards from "../components/Cards";
import { GiPokecog } from "react-icons/gi";
import { useState } from "react";
import { Loader } from "../components/loader";
import { Searcher } from "../components/searcher";
import { NotFound } from "../components/404";
import { motion } from "framer-motion";

export default function Home({ data, types }) {
  const [filtro, setFiltrar] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const restore = () => {
    setLoading(true);
    setFiltrar(data);
    setError(false);
    setLoading(false);
  };
  async function filtrar(tipo = "fire") {
    let response = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    let data = await response.json().then((data) => data.pokemon);
    return data;
  }
  const prueba = async (e, input) => {
    e.preventDefault();
    if (input === "" || input === undefined) {
      return;
    } else {
      setLoading(true);
      let pokemonsRaw = [];
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${input}`
      ).then((response) => {
        if (response.ok === false) {
          setError(true);
          setLoading(false);
          return response;
        }
        setError(false);
        return response;
      });
      let data = await response.json();

      pokemonsRaw.push(data);

      if (data) {
        let pokemons_mini = pokemonsRaw.map((pokemon) => {
          return {
            id: pokemon.id,
            name: pokemon.name,
            sprite: pokemon.sprites.other.dream_world.front_default,
            types: pokemon.types.map((item) => item.type.name),
          };
        });
        setFiltrar(pokemons_mini);
      }
      setLoading(false);
    }
  };

  const filtrar2 = async (eltipo) => {
    setLoading(true);
    setFiltrar(data);
    if (eltipo === "borrar") {
      setFiltrar(data);
      setError(false);
      setLoading(false);
    } else {
      let arregloVacio = [];
      let arreglodepokimons = await filtrar(eltipo);
      for (let pokemon of arreglodepokimons) {
        let response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`
        );
        let data = await response.json();
        arregloVacio.push(data);
      }
      let pokemons_mini = arregloVacio.map((pokemon) => {
        let foto = "";
        if (pokemon.sprites.other.dream_world.front_default == null) {
          foto = pokemon.sprites.front_default;
        } else {
          foto = pokemon.sprites.other.dream_world.front_default;
        }
        return {
          id: pokemon.id,
          name: pokemon.name,
          sprite: foto,
          types: pokemon.types.map((item) => item.type.name),
        };
      });
      setFiltrar(pokemons_mini);
      setError(false);
      setLoading(false);
    }
  };

  return (
    <>
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
                >
                  {type.name}
                </motion.li>
              );
            })}
          </ul>
        </details>
        <Searcher handleSubmit={prueba} />
      </header>
      {loading ? (
        <Loader />
      ) : error ? (
        <NotFound click={restore} />
      ) : (
        <Cards data={data} filtro={filtro} />
      )}{" "}
    </>
  );
}

export async function getStaticProps(context) {
  let pokemonsRaw = [];
  for (let i = 1; i <= 16; i++) {
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
    .then((data) => data.results)
    .then((data) =>
      data.filter((type) => type.name !== "shadow" && type.name !== "unknown")
    );
  return {
    props: {
      data: pokemons_mini,
      types: data_types,
    },
  };
}
