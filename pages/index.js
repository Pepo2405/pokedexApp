import Cards from "../components/pokemons";
import {GiPokecog,GiComputerFan} from "react-icons/gi"

export default function Home({ data, types }) {
  console.log(types);
  return (
    <>
      <header className="home-header">
        <h2 style={{ color: "#eaeaea" }}><GiComputerFan className="tuerca"/> POKEMONES <GiPokecog className="tuerca"/></h2>
        <details>
          <summary>Types:</summary>
          <ul className="botonera-clases">
            {types.map((type) => {
              return <li key={type.name} className={`boton ${type.name}`}>{type.name}</li>;
            })}
          </ul>
        </details>
      </header>
      <Cards data={data} />
    </>
  );
}

export async function getStaticProps(context) {
  let pokemonsRaw = [];
  for (let i = 1; i <= 42; i++) {
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

// export async function getStaticProps(context) {

//   return {
//     props: {
//       amogus: "ass"

//     },
//   }
// }
