"use client";

import { useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Pokemon } from "@/types";
import pokeball from "@/json/pokeball.json";

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

  useEffect(() => {
    fetch("/merged.json")
      .then((res) => res.json())
      .then(setData)
      .then(() => setActive(493));
  }, []);

  return (
    <main className="relative grid place-content-center w-full h-screen overflow-clip gap-6">
      <div className="flex justify-between w-full gap-12 z-10 items-center max-w-screen-xl">
        <button
          role="navigation"
          onClick={() => setActive(active - 1)}
          className="hidden md:block"
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
            className="relative rounded-lg w-[570px] max-w-[90vw] aspect-square z-10"
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
          className="hidden md:block"
          disabled={active === data.length - 1}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="absolute flex w-full justify-between bottom-6 p-10 md:hidden">
        <button
          role="navigation"
          onClick={() => setActive(active - 1)}
          disabled={active === data.length - 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          role="navigation"
          onClick={() => setActive(active + 1)}
          disabled={active === data.length - 1}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </main>
  );
}
