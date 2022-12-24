import Link from "next/link";
import { motion } from "framer-motion";

export default function Cartas({ filtro }) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.35 } },
  };
  const itemAnimated = {
    hidden: { x: -100, opacity: 0, scale: 0 },
    show: { x: 0, opacity: 1, scale: 1 },
    hover: {
      scale: 1.05,
      borderRadius: "1rem",
      transition: { type:"spring" },
    },
  };
  return (
    <>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="cards"
      >
        {filtro.map((pokemon, index) => {
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
                  whileHover="hover"
                  initial="hidden"
                  animate={{
                    ...itemAnimated.show,
                    transition: { delay: 0.13 * index },
                  }}
                  className={`card ${pokemon.types[0]}`}
                >
                  <div className="header">
                    <h3>{`#${pokemon.id}`}</h3>
                    <h2>{pokemon.name}</h2>
                  </div>
                  <img src={pokemon.sprite} height={150} width={200} />
                  <div className="types-container">
                    {pokemon.types.map((type) => (
                      <motion.p
                        variants={itemAnimated}
                        initial="hidden"
                        animate="show"
                        className={type}
                        whileHover={{ scale: 1.1 }}
                        key={type}
                      >
                        {type}
                      </motion.p>
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
