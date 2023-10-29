"use client";

import { FormEventHandler, useState } from "react";
// @ts-expect-error
import { motion, AnimatePresence, LayoutGroup } from "@/lib/framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesDown,
  faAnglesUp,
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import pokeball from "@/json/pokeball.json";
import { PathGroup, TypeEffectiveness } from "@/components";
import pokedex from "@/assets/staging.json";

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
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  // const data: Pokemon[] = pokedex;

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

    setActiveIndex(index);
    setSearch("");
  };

  const handleLink = (pid: string) => {
    const index = pokedex.findIndex((p) => p.id === pid);

    if (index === -1) {
      return;
    }

    setActiveIndex(index);
  };

  const getNext = () => {
    const number = Number(pokedex[activeIndex].id.split("-")[0]);
    const next = `${(number + 1).toString().padStart(4, "0")}`;
    console.log(next);

    handleLink(next);
  };

  const getPrev = () => {
    const number = Number(pokedex[activeIndex].id.split("-")[0]);
    const prev = `${(number - 1).toString().padStart(4, "0")}`;
    console.log(prev);

    handleLink(prev);
  };

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

      <div className="absolute w-full flex justify-between z-30 px-7 top-[calc(100vh-8rem)] md:hidden">
        <button
          role="navigation"
          data-left
          onClick={() => getPrev()}
          disabled={activeIndex === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          role="navigation"
          data-right
          onClick={() => getNext()}
          disabled={activeIndex === pokedex.length - 1}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className="flex justify-center md:justify-between gap-12 w-full z-10 items-center max-w-screen-xl">
        <button
          role="navigation"
          data-left
          onClick={() => getPrev()}
          className="hidden md:grid"
          disabled={activeIndex === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="flex flex-col items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth=".5"
            width={450}
            height={450}
            viewBox="0 0 570 570"
            className="relative rounded-lg max-w-[85vw] aspect-square z-10"
          >
            <AnimatePresence>
              <LayoutGroup>
                {pokedex ? (
                  <PathGroup paths={pokedex[activeIndex].paths} mode="variants" />
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
              key={`pokemon-${activeIndex - 1}`}
            >
              <h1 className="text-5xl">{pokedex[activeIndex].name}</h1>
              {/* <p className="md:hidden">{pokedex[activeIndex].species}</p> */}
              <ul className="flex flex-row gap-3">
                {pokedex[activeIndex].types.map((t, i) => (
                  <li
                    key={`${pokedex[activeIndex].name}-type-${i}`}
                    className="px-2 py-1 rounded-md"
                    style={{ backgroundColor: typeColors[t] }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
          <section className="flex flex-col gap-3">
            <div className="grid grid-cols-[30px_1fr] gap-3">
              <FontAwesomeIcon
                icon={faAnglesUp}
                className="text-3xl text-rose-400 mx-auto"
              />
              <ul className="flex gap-2 flex-wrap items-center">
                {Object.entries(pokedex[activeIndex].weaknesses).map((data, i) => (
                  <li key={`weak-${i}`}>
                    <TypeEffectiveness
                      type={data[0]}
                      multiplier={data[1]}
                      backgroundColor={typeColors[data[0]]}
                    />
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
                {Object.entries(pokedex[activeIndex].resistances).map((data, i) => (
                  <li key={`resist-${i}`}>
                    <TypeEffectiveness
                      type={data[0]}
                      multiplier={data[1]}
                      backgroundColor={typeColors[data[0]]}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-[30px_1fr] gap-3">
              <FontAwesomeIcon
                icon={faXmark}
                className="text-3xl text-slate-300 mx-auto"
              />
              <ul className="flex gap-2 flex-wrap items-center">
                {Object.entries(pokedex[activeIndex].immunities).map((data, i) => (
                  <li key={`imm-${i}`}>
                    <TypeEffectiveness
                      type={data[0]}
                      multiplier={data[1]}
                      backgroundColor={typeColors[data[0]]}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <div className="flex gap-4 items-center">
            {pokedex[activeIndex].evolutions ? <h2>Evolutions</h2> : ""}
            <ul className="flex gap-4">
              {pokedex[activeIndex].evolutions.map((e, i) => (
                <li key={e}>
                  <button
                    onClick={() => handleLink(e)}
                    className="bg-amber-500 px-4 py-2 rounded-lg"
                  >
                    {e}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4">
            <ul className="flex gap-4">
              {pokedex[activeIndex].forms.length ? <h2>Forms</h2> : ""}
              {pokedex[activeIndex].forms.map((f) => (
                <li key={f}>
                  <button
                    onClick={() => handleLink(f)}
                    className="bg-emerald-500 px-4 py-2 rounded-lg"
                  >
                    {f}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          role="navigation"
          onClick={() => getNext()}
          data-right
          className="hidden md:grid"
          disabled={activeIndex === pokedex[activeIndex].length - 1}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </main>
  );
}
