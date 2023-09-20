const path = require("path");
const fs = require("fs");

/**
 * @typedef TypeEffectiveness
 * @property {string} type
 * @property {string} multiplier
 */

/**
 * @typedef Pokemon
 * @property {string} name
 * @property {string} species
 * @property {string[]} types
 * @property {TypeEffectiveness[]} weaknesses
 * @property {TypeEffectiveness[]} resistances
 * @property {TypeEffectiveness[]} immunities
 */

/**
 * @typedef Triangle
 * @property {string} points
 * @property {string} color
 */

/**
 * @typedef PokemonSVG
 * @property {number} number
 * @property {string} name
 * @property {Triangle[]} paths
 */

/**
 * @type {Pokemon[]}
 */
const pokedex = JSON.parse(fs.readFileSync("./pokedex.json").toString());

// console.log(pokedex);

/**
 * @type {PokemonSVG[]}
 */
const pokemon = JSON.parse(fs.readFileSync("./pokemon.json").toString());

const merged = pokedex.map((p) => {
  console.log(`Merging ${p.name}`);

  return {
    ...p,
    paths: pokemon
      .find((_p) => _p.name === p.name)
      .paths.filter((tri) => tri.color !== "rgb(0,0,0)"),
  };
});

fs.writeFileSync("merged.json", JSON.stringify(merged));
