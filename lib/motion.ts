import type { Variants, Transition } from "framer-motion";

/* ============================================================
   Shared Framer Motion variants + helpers.
   Kept in one place so every landing section animates with the
   same rhythm. All sections should use these instead of
   hand-rolling variants, so the page feels cohesive.
   ============================================================ */

const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];
const easeInOutCubic: Transition["ease"] = [0.65, 0, 0.35, 1];

/** Fade up + slight scale, the default "card enters" motion. */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

/** Pure fade — for things that should not move (large headlines). */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/** Slide in from the left. */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

/** Slide in from the right. */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

/** Scale + fade, for icons / badges / hero chips. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

/** Stagger container — used by parent grids/lists. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

/** Standard viewport config — fire when ~25% visible, only once. */
export const viewportOnce = { once: true, amount: 0.25 } as const;

/** Soft hover lift, used on cards. */
export const cardHover = {
  initial: { y: 0 },
  whileHover: {
    y: -6,
    transition: { duration: 0.25, ease: easeInOutCubic },
  },
};

/** Marquee helper for the trust bar logos. */
export const marquee: Variants = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      duration: 28,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

/** Floating loop, used for hero decoration. */
export const floatLoop = (duration = 6, y = -12): Variants => ({
  animate: {
    y: [0, y, 0],
    transition: {
      duration,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
});

/** Pulse loop for live-status dots. */
export const pulseDot: Variants = {
  animate: {
    scale: [1, 1.4, 1],
    opacity: [0.7, 0.2, 0.7],
    transition: {
      duration: 1.8,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};
