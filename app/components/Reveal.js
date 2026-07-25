"use client";

import { motion } from "framer-motion";

/* Fluid reveal-on-scroll wrapper.
   Animates opacity + translateY only (no layout-affecting props),
   so it composites on the GPU and never thrashes layout. */
export default function Reveal({ children, delay = 0, y = 40, className, style }) {
  return (
    <motion.div
      className={className}
      style={{ willChange: "transform, opacity", ...style }}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
