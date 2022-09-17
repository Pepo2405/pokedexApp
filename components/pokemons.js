import Link from "next/link";
import { motion } from "framer-motion";

export default function Cartas({ data }) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemAnimated = {
    hidden: { x: -100, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };
  return (
    <>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="cards"
      >
        {/* <ul className="botonera">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul> */}
        {data.map((pokemon) => {
          return (
            <Link
              key={pokemon.id}
              href={{
                pathname: "/pokemon/[name]",
                query: { name: pokemon.name },
              }}
            >
              <a>
                <motion.li
                  variants={itemAnimated}
                  className={`card ${pokemon.types[0]}`}
                >
                  <div className="header">
                    <h3>{`#${pokemon.id}`}</h3>
                    <h2>{pokemon.name}</h2>
                  </div>
                  <img src={pokemon.sprite} height={150} width={200} />
                  <div className="types-container">
                    {pokemon.types.map((type) => (
                      <p key={type}>{type}</p>
                    ))}
                  </div>
                </motion.li>
              </a>
            </Link>
          );
        })}
      </motion.ul>
    </>
  );
}