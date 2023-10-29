"use client";

import { FormEventHandler, useEffect, useState } from "react";
// @ts-expect-error
import { motion, AnimatePresence, LayoutGroup } from "@/lib/framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faAnglesDown,
  // faAnglesUp,
  faChevronLeft,
  faChevronRight,
  // faXmark,
} from "@fortawesome/free-solid-svg-icons";
// import { Pokemon } from "@/types";
import pokeball from "@/json/pokeball.json";
// import TypeEffectiveness from "@/components/TypeEffectiveness";
import { PathGroup } from "@/components";
import pokedex from "@/assets/pokedex.json";

const typeColors = {
  Normal: "#A8A77A",
  Fire: "#EE8130",
  Water: "#6390F0",
  Electric: "#F7D02C",
  Grass: "#7AC74C",
  Ice: "#96D9D6",
  Fighting: "#C22E28",
  Poison: "#A33EA1",
  Ground: "#E2BF65",
  Flying: "#A98FF3",
  Psychic: "#F95587",
  Bug: "#A6B91A",
  Rock: "#B6A136",
  Ghost: "#735797",
  Dragon: "#6F35FC",
  Dark: "#705746",
  Steel: "#B7B7CE",
  Fairy: "#D685AD",
};

export default function Home() {
  // const [data, setData] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);
  // const [activePokemon, setActivePokemon] = useState<Pokemon>();

  const handleSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (search === "") {
      return;
    }

    const filter = /[:\s]+/g;

    const index = pokedex.findIndex(
      (p) =>
        p.name.toLowerCase().replaceAll(filter, "") ===
        search.toLowerCase().replaceAll(filter, "")
    );

    if (index === -1) {
      return;
    }

    setIndex(index);
    setSearch("");
  };

  // useEffect(() => {
  //   setActivePokemon(pokedex[activeIndex - 1]);
  // }, [activeIndex]);

  // useEffect(() => {
  //   fetch("/merged_v2.json")
  //     .then((res) => res.json())
  //     .then(setData)
  //     .then(() => setActiveIndex(491));
  // }, []);

  return (
    <main className="relative grid place-content-center w-full gap-6">
      <form
        action=""
        className="w-full flex justify-center p-6 z-50"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          name="pokemon"
          id="pokemon"
          onChange={(e) => setSearch(e.currentTarget.value)}
          value={search}
          className="bg-white/10 border-[1px] border-white/30 rounded-full p-1 placeholder:text-white/30 text-center w-96 max-w-[80vw]"
          placeholder="Search Pokemon (enter to submit)"
        />
        <input type="submit" value="" className="hidden" />
      </form>

      {/* <span className="absolute text-[13rem] uppercase w-full h-screen lg:grid place-content-center max-w-screen-2xl -translate-x-1/2 left-1/2 text-center pointer-events-none opacity-5 font-extrabold hidden">
        {activePokemon && activePokemon.species.replace(/(?<=Pokémon)(.*)/g, "")}
      </span> */}

      {/* <section className="flex flex-col gap-3">
        <div className="grid grid-cols-[30px_1fr] gap-3">
          <FontAwesomeIcon icon={faAnglesUp} className="text-3xl text-rose-400 mx-auto" />
          <ul className="flex gap-2 flex-wrap items-center">
            {activePokemon &&
              activePokemon.weaknesses.map((data, i) => (
                <li key={`weak-${i}`}>
                  <TypeEffectiveness {...data} backgroundColor={typeColors[data.type]} />
                </li>
              ))}
          </ul>
        </div>
        <div className="grid grid-cols-[30px_1fr] gap-3">
          <FontAwesomeIcon
            icon={faAnglesDown}
            className="text-3xl text-indigo-400 mx-auto"
          />
          <ul className="flex gap-2 flex-wrap items-center">
            {activePokemon &&
              activePokemon.resistances.map((data, i) => (
                <li key={`resist-${i}`}>
                  <TypeEffectiveness {...data} backgroundColor={typeColors[data.type]} />
                </li>
              ))}
          </ul>
        </div>
        <div className="grid grid-cols-[30px_1fr] gap-3">
          <FontAwesomeIcon icon={faXmark} className="text-3xl text-slate-300 mx-auto" />
          <ul className="flex gap-2 flex-wrap items-center">
            {activePokemon &&
              activePokemon.immunities.map((data, i) => (
                <li key={`imm-${i}`}>
                  <TypeEffectiveness {...data} backgroundColor={typeColors[data.type]} />
                </li>
              ))}
          </ul>
        </div>
      </section> */}

      <div className="absolute w-full flex justify-between z-30 px-7 top-[calc(100vh-8rem)] md:hidden">
        <button
          role="navigation"
          data-left
          onClick={() => setIndex(index - 1)}
          disabled={index === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          role="navigation"
          data-right
          onClick={() => setIndex(index + 1)}
          disabled={index === pokedex.length - 1}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className="flex justify-center md:justify-between gap-12 w-full z-10 items-center max-w-screen-xl">
        <button
          role="navigation"
          data-left
          onClick={() => setIndex(index - 1)}
          className="hidden md:grid"
          disabled={index === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="flex flex-col gap-5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth=".5"
            width={570}
            height={570}
            // preserveAspectRatio="none"
            viewBox="0 0 570 570"
            className="relative rounded-lg w-[500px] max-w-[85vw] aspect-square z-10"
          >
            <AnimatePresence>
              <LayoutGroup>
                {pokedex[index] ? (
                  <PathGroup paths={pokedex[index].paths} mode="variants" />
                ) : (
                  <PathGroup paths={pokeball.paths} mode="pulse" />
                )}
              </LayoutGroup>
            </AnimatePresence>
          </svg>

          <AnimatePresence mode="wait">
            <motion.div
              className="flex flex-col gap-4 items-center h-24"
              layout
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.2 }}
              key={`pokemon-${index}`}
            >
              {pokedex[index] ? (
                <>
                  <h1 className="text-5xl">{pokedex[index].name}</h1>
                  {/* <p className="md:hidden">{pokedex[index].species}</p> */}
                  <ul className="flex flex-row gap-3">
                    {pokedex[index].types.map((t, i) => (
                      <li
                        key={`${pokedex[index].name}-type-${i}`}
                        className="px-2 py-1 rounded-md"
                        style={{ backgroundColor: typeColors[t] }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <span aria-hidden></span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          role="navigation"
          onClick={() => setIndex(index + 1)}
          data-right
          className="hidden md:grid"
          disabled={index === pokedex.length - 1}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </main>
  );
}
