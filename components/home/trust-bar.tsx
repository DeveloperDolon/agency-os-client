"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";

/**
 * Compact stats strip that sits under the hero. Each stat animates
 * in with a count-up style reveal (opacity + y) so the row reads
 * as one rhythmic unit rather than four separate numbers.
 */
const STATS = [
  { value: "11", label: "domains consolidated into one spine" },
  { value: "5", label: "autonomy levels, enforced by the backend" },
  { value: "100%", label: "of agent runs recorded with sources" },
  { value: "0", label: "third-party actions taken without approval" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Key facts"
      className="border-y border-border bg-surface/50"
    >
      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 sm:px-6 lg:grid-cols-4 lg:px-8"
      >
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className="flex flex-col gap-1 border-border px-4 py-6 lg:border-l lg:first:border-l-0 lg:px-6"
          >
            <span className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {s.value}
            </span>
            <span className="text-xs leading-snug text-muted-foreground sm:text-sm">
              {s.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
