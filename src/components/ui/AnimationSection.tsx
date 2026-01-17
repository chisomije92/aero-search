"use client";

import { fadeIn } from "@/src/lib/animations";
import { motion, Variants } from "framer-motion";

interface AnimationSectionProps {
  children: React.ReactNode;
  variants?: Variants;
}

export function AnimatedSection({ children, variants }: AnimationSectionProps) {
  return (
    <motion.div
      variants={variants || fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
