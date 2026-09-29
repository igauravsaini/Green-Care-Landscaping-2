"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

/* ─── Snappy, glitch-free FadeUp ─────────────────────────────────────── */
interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
  once = true,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "20px" }}
      transition={{
        duration: 0.35,
        delay: Math.min(delay, 0.25), // Cap delay so items never stay hidden
        ease: [0.25, 1, 0.5, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Snappy, glitch-free SlideIn ────────────────────────────────────── */
interface SlideInProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}

export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className = "",
}: SlideInProps) {
  const x = direction === "left" ? -24 : 24;
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "20px" }}
      transition={{
        duration: 0.35,
        delay: Math.min(delay, 0.25),
        ease: [0.25, 1, 0.5, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger container ──────────────────────────────────────────────── */
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function Stagger({
  children,
  className = "",
  staggerDelay = 0.06,
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "20px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerChild = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

/* ─── Scale on hover ─────────────────────────────────────────────────── */
interface ScaleHoverProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export function ScaleHover({
  children,
  className = "",
  scale = 1.02,
}: ScaleHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ───────────────────────────────────────────────── */
interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
