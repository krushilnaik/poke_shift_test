"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesDown,
  faAnglesUp,
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Pokemon } from "@/types";
import pokeball from "@/json/pokeball.json";
import TypeEffectiveness from "@/components/TypeEffectiveness";

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
  const [data, setData] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(0);

  const variants: Variants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (search === "") {
      return;
    }

    const filter = /[:\s]+/g;

    const index = data.findIndex(
      (p) =>
        p.name.toLowerCase().replaceAll(filter, "") ===
        search.toLowerCase().replaceAll(filter, "")
    );

    if (index === -1) {
      return;
    }

    setActive(index + 1);
    setSearch("");
  };

  useEffect(() => {
    fetch("/merged_v2.json")
      .then((res) => res.json())
      .then(setData)
      .then(() => setActive(491));
  }, []);

  return (
    <main className="relative grid place-content-center w-full gap-6 p-6">
      <form
        action=""
        className="w-full flex justify-center absolute p-6 z-50"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          name="pokemon"
          id="pokemon"
          onChange={(e) => setSearch(e.currentTarget.value)}
          value={search}
          className="bg-white/10 border-[1px] border-white/30 rounded-full p-1 placeholder:text-white/30 text-center w-[25rem] max-w-[80vw]"
          placeholder="Search"
        />
        <input type="submit" value="" className="hidden" />
      </form>
      <span className="absolute text-[13rem] uppercase w-full h-screen lg:grid place-content-center text-center pointer-events-none opacity-5 font-extrabold hidden">
        {data.length && data[active - 1].species.replace(/(?<=Pokémon)(.*)/g, "")}
      </span>
      <div className="flex justify-center md:justify-between h-screen gap-12 w-full z-10 items-center max-w-screen-xl">
        <button
          role="navigation"
          data-left
          onClick={() => setActive(active - 1)}
          className="hidden md:grid"
          disabled={active === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="flex flex-col gap-5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth=".5"
            viewBox="0 0 250 250"
            className="relative rounded-lg w-[570px] max-w-[85vw] aspect-square z-10"
          >
            <AnimatePresence mode="popLayout">
              {data.length
                ? data[active - 1].paths.map((tri, i) => (
                    <motion.path
                      layout
                      d={tri.points}
                      color={tri.color}
                      variants={variants}
                      initial="initial"
                      animate="animate"
                      transition={{ duration: 0.5 }}
                      exit="exit"
                      key={`tri-${i}`}
                      className="duration-[850ms]"
                    />
                  ))
                : pokeball.paths.map((tri, i) => (
                    <motion.path
                      layout
                      d={tri.points}
                      color={tri.color}
                      transition={{ duration: 0.5 }}
                      key={`tri-${i}`}
                      className="animate-pulse [animation-duration:0.9s]"
                    />
                  ))}
            </AnimatePresence>
          </svg>

          <AnimatePresence mode="wait">
            {data.length && (
              <motion.div
                className="flex flex-col gap-4 items-center"
                layout
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.2 }}
                key={`${data[active - 1].name}`}
              >
                <h1 className="text-5xl">{data[active - 1].name}</h1>
                <ul className="flex flex-row gap-3">
                  {data[active - 1].types.map((t, i) => (
                    <li
                      key={`${data[active - 1].name}-type-${i}`}
                      className="px-2 py-1 rounded-md"
                      style={{ backgroundColor: typeColors[t] }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          role="navigation"
          onClick={() => setActive(active + 1)}
          data-right
          className="hidden md:grid"
          disabled={active === data.length - 1}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className="absolute flex justify-between w-full top-[calc(90vh-3rem)] md:hidden z-20">
        <button
          role="navigation"
          data-left
          onClick={() => setActive(active - 1)}
          disabled={active === data.length - 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          role="navigation"
          data-right
          onClick={() => setActive(active + 1)}
          disabled={active === data.length - 1}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <section className="flex flex-col gap-4">
        <div className="flex gap-4">
          <FontAwesomeIcon icon={faAnglesUp} className="text-3xl text-rose-400" />
          <ul className="flex gap-2 flex-wrap">
            {data.length &&
              data[active - 1].weaknesses.map((data) => (
                <li>
                  <TypeEffectiveness {...data} backgroundColor={typeColors[data.type]} />
                </li>
              ))}
          </ul>
        </div>
        <div className="flex gap-4">
          <FontAwesomeIcon icon={faAnglesDown} className="text-3xl text-indigo-400" />
          <ul className="flex gap-2 flex-wrap">
            {data.length &&
              data[active - 1].resistances.map((data) => (
                <li>
                  <TypeEffectiveness {...data} backgroundColor={typeColors[data.type]} />
                </li>
              ))}
          </ul>
        </div>
        <div className="flex gap-4">
          <FontAwesomeIcon icon={faXmark} className="text-3xl" />
          <ul className="flex gap-2 flex-wrap">
            {data.length &&
              data[active - 1].immunities.map((data) => (
                <li>
                  <TypeEffectiveness {...data} backgroundColor={typeColors[data.type]} />
                </li>
              ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
