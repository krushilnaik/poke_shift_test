"use client";

import { PokemonSVG } from "@/types";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [data, setData] = useState<PokemonSVG[]>([]);
  const [active, setActive] = useState(1);

  const variants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 2,
      },
    },
  };

  useEffect(() => {
    fetch("/pokemon.json")
      .then((res) => res.json())
      .then((data: PokemonSVG[]) => {
        const sorted = data.sort(function (a, b) {
          return a.number - b.number;
        });

        setData(sorted);
      });
  }, []);

  return (
    <main className="grid place-content-center h-screen gap-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth=".5"
        viewBox="0 0 250 250"
        className="border-[1px] border-white/30 rounded-lg w-[570px] h-[570px] max-w-[80vw] aspect-square"
      >
        {data.length &&
          data[active - 1].paths
            .filter((p) => p.color !== "rgb(0,0,0)")
            .map((tri, i) => (
              <motion.path
                d={tri.points}
                color={tri.color}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                key={`tri-${i}`}
                className="transition-all duration-1000"
                layoutId={`tri-${i}`}
              />
            ))}
      </svg>

      <div className="flex justify-evenly text-3xl">
        <button
          onClick={() => setActive(active - 1)}
          disabled={active === 1}
          className="bg-white/50 hover:bg-rose-200/50 transition-colors duration-300 rounded-full aspect-square w-16 grid place-content-center"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <input
          type="number"
          name="active"
          id="active"
          value={active}
          className="bg-white/25 text-center rounded-lg"
          onChange={(e) => setActive(Number(e.target.value))}
        />
        <button
          onClick={() => setActive(active + 1)}
          disabled={active === data.length - 1}
          className="bg-white/50 hover:bg-rose-200/50 transition-colors duration-300 rounded-full aspect-square w-16 grid place-content-center"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </main>
  );
}
