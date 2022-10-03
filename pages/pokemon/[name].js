import React from "react";
import style from "../styles/pokemon.module.css";
import Link from "next/link";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GiThunderBlade } from "react-icons/gi";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Pokemon({ pokemon }) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemAnimated = {
    hidden: { x: -100, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  console.log("tipo ", pokemon.types);
  return (
    <div className={style.pkmn__container}>
      <div className="wrapper">
        <div className={`overviewInfo ${pokemon.types[0].type.name}`}>
          <div className="actions">
            <Link
              scroll={false}
              href={{
                pathname: "/",
              }}
            >
              <a>
                <div className="backbutton ">
                  <BsFillArrowLeftSquareFill className="boton-atras" />
                </div>
              </a>
            </Link>
          </div>

          <div className="productinfo">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.6 } }}
              className="grouptext"
            >
              <h1>{pokemon.name}</h1>
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grouptext"
            >
              <h4>Types:</h4>
              {pokemon.types.map((type) => {
                return (
                  <motion.h3 key={type.type.name} variants={itemAnimated}>
                    {type.type.name}
                  </motion.h3>
                );
              })}
            </motion.div>
            <div className="grouptext"></div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { duration: 0.2 } }}
              className="productImage"
              drag
              dragElastic={0.7}
              dragConstraints={{left:0,top:0,right:0,bottom:0}}
            >
              <Image
              
                src={pokemon.img}
                alt="product: ps5 controller image"
                className="amogus"
                width={228}
                height={220}
                style={{userSelector:"none"}}
              />
            </motion.div>
          </div>
        </div>

        <div className="productSpecifications">
          <h2>Stats</h2>
          <motion.div
            className="productFeatures"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {pokemon.stats.map((stat) => {
              return (
                <motion.div
                  variants={itemAnimated}
                  key={stat.stat.name}
                  className="feature"
                >
                  <div className={`featureIcon ${pokemon.types[0].type.name}`}>
                    <MdOutlineCatchingPokemon />
                  </div>
                  <div className="featureText">
                    <h5>{stat.stat.name}</h5>
                    <h3>{stat.base_stat}</h3>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        <div className="productSpecifications ">
        <h2>Skills</h2>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="productFeatures skills-cont"
          >
            {pokemon.moves.map((move) => {
              return (
                <motion.div
                  variants={itemAnimated}
                  key={move.move.name}
                  className="feature"
                >
                  <div className={`featureIcon ${pokemon.types[0].type.name}`}>
                    <GiThunderBlade></GiThunderBlade>
                  </div>
                  <div className="featureText">{move.move.name}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.params;
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(
    (response) => response.json()
  );
  let pokemon = {};
  pokemon.name = response.name;
  pokemon.img = response.sprites.other["official-artwork"].front_default;
  pokemon.types = response.types;
  pokemon.stats = response.stats;
  pokemon.moves = response.moves.slice(0, 10);

  return { props: { pokemon: pokemon } };
}
