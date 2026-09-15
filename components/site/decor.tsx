"use client";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function subscribeNever() {
  return () => {};
}

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

export function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
        cursor.dataset.active = "true";
      });
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      cursor.dataset.hover = String(!!t?.closest('a,button,[role="button"],input,textarea,select'));
    };
    const leave = () => {
      cursor.dataset.active = "false";
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);
  return (
    <div
      ref={cursorRef}
      data-active="false"
      data-hover="false"
      aria-hidden="true"
      className="custom-cursor hidden md:block fixed left-0 top-0 pointer-events-none z-[200]"
    >
      <div className="custom-cursor-dot rounded-full -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

export function StarField() {
  const stars = Array.from({ length: 55 }, (_, i) => i);
  return (
    <div aria-hidden="true" className="star-field fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((i) => {
        const left = (i * 17.3) % 100;
        const delay = (i * 0.67) % 18;
        const duration = 9 + (i % 9);
        const size = i % 9 === 0 ? 2.5 : 1.3;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-cyan-200"
            style={{
              left: left + "%",
              top: "-4%",
              width: size + "px",
              height: size + "px",
              opacity: 0,
              boxShadow: "0 0 4px rgba(103,232,249,.8)",
              animation: `fall ${duration}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

export function LiquidBackground() {
  return (
    <div aria-hidden="true" className="liquid-scene fixed inset-0 overflow-hidden pointer-events-none">
      <div className="liquid-glow liquid-glow-one absolute w-[560px] h-[560px] bg-cyan-400/[.09] blur-[120px]" />
      <div className="liquid-glow liquid-glow-two absolute w-[480px] h-[480px] bg-teal-300/[.08] blur-[120px]" />
      <div className="metal-flow metal-flow-one" />
      <div className="metal-flow metal-flow-two" />
      <div className="chrome-orbit chrome-orbit-one">
        <span />
      </div>
      <div className="chrome-orbit chrome-orbit-two">
        <span />
      </div>
      <div className="glass-prism">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

export function Cube3D() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 540]);
  const s = 112;
  const faceStyle =
    "absolute inset-0 flex items-center justify-center rounded-md border border-cyan-300/30 bg-cyan-300/[.06] backdrop-blur-sm mono text-[10px] text-cyan-300";
  return (
    <div ref={ref} aria-hidden="true" className="hidden md:flex items-center justify-center py-10">
      <div style={{ perspective: 700 }}>
        <motion.div style={{ width: s, height: s, position: "relative", transformStyle: "preserve-3d", rotateX, rotateY }}>
          <div className={faceStyle} style={{ transform: `translateZ(${s / 2}px)` }}>DESIGN</div>
          <div className={faceStyle} style={{ transform: `rotateY(180deg) translateZ(${s / 2}px)` }}>BUILD</div>
          <div className={faceStyle} style={{ transform: `rotateY(90deg) translateZ(${s / 2}px)` }}>SECURE</div>
          <div className={faceStyle} style={{ transform: `rotateY(-90deg) translateZ(${s / 2}px)` }}>TEST</div>
          <div className={faceStyle} style={{ transform: `rotateX(90deg) translateZ(${s / 2}px)` }}>SHIP</div>
          <div className={faceStyle} style={{ transform: `rotateX(-90deg) translateZ(${s / 2}px)` }}>ITERATE</div>
        </motion.div>
      </div>
    </div>
  );
}

export function SceneBackdrop() {
  return (
    <>
      <StarField />
      <LiquidBackground />
      <CursorGlow />
    </>
  );
}

export function useMountedState() {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}
