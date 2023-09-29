import { Triangle } from "@/types";
import { AnimatePresence, Variants, motion } from "framer-motion";

interface Props {
  paths: Triangle[];
  mode: "variants" | "pulse";
}

function PathGroup({ paths, mode }: Props) {
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

  return (
    <AnimatePresence>
      {paths.map((tri, i) => (
        <motion.path
          layout
          d={tri.points}
          color={tri.color}
          variants={mode === "variants" ? variants : {}}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5 }}
          exit="exit"
          key={`tri-${i}`}
          layoutId={`tri-${i}`}
          className={`duration-[850ms] ${
            mode === "pulse" ? "animate-pulse [animation-duration:0.9s]" : ""
          }`}
        />
      ))}
    </AnimatePresence>
  );
}

export default PathGroup;
