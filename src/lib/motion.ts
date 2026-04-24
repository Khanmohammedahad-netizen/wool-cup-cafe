// Easing curves — the cinematic signature of the site
export const cinematic = [0.22, 1, 0.36, 1] as const;
export const gentle = [0.25, 0.1, 0.25, 1] as const;

// Reusable transition presets
export const cinematicTransition = {
  duration: 0.8,
  ease: cinematic,
};

export const gentleTransition = {
  duration: 0.6,
  ease: gentle,
};

// Animation variants
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: cinematicTransition,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: gentleTransition,
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const wordStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const wordChild = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: cinematic,
    },
  },
};
