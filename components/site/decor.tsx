"use client";
import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";

function subscribeNever() {
  return () => {};
}

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : Math.min(delay, 0.18) }}
    >
      {children}
    </motion.div>
  );
}

export function FloatingPortrait({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, 0.35, 0] }}
      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      className="hero-portrait relative mx-auto max-w-[320px] lg:max-w-none w-full"
    >
      {children}
    </motion.div>
  );
}

const stars = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: (index * 37.7) % 100,
  top: (index * 53.1) % 100,
  size: index % 7 === 0 ? 2 : 1,
  delay: (index * 0.43) % 6,
}));

export function SceneBackdrop() {
  return (
    <div aria-hidden="true" className="scene-backdrop fixed inset-0 pointer-events-none overflow-hidden">
      <div className="star-field absolute inset-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star-dot absolute rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="chrome-orbit chrome-orbit-one"><span /></div>
      <div className="chrome-orbit chrome-orbit-two"><span /></div>
      <div className="glass-prism"><i /><i /><i /></div>
    </div>
  );
}

export function useMountedState() {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}