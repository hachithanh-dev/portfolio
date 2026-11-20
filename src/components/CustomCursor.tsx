"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const subscribe = () => () => {};
const isTouchClient = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;
// Render nothing on the server; the client decides after hydration.
const isTouchServer = () => true;

export default function CustomCursor() {
  const isTouchDevice = useSyncExternalStore(subscribe, isTouchClient, isTouchServer);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  // MotionValues avoid React re-renders on every mouse move
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useSpring(cursorX, { stiffness: 900, damping: 40 });
  const dotY = useSpring(cursorY, { stiffness: 900, damping: 40 });
  const ringX = useSpring(cursorX, { stiffness: 350, damping: 28 });
  const ringY = useSpring(cursorY, { stiffness: 350, damping: 28 });

  useEffect(() => {
    if (isTouchDevice) return;

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsHidden(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button"));
    };

    const hide = () => setIsHidden(true);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", hide);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] h-2.5 w-2.5 rounded-full bg-sky-300 mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovering ? 0 : 1, opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* Ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] h-9 w-9 rounded-full border border-sky-300/50"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isHidden ? 0 : 1,
          backgroundColor: isHovering ? "rgba(125,211,252,0.12)" : "rgba(125,211,252,0)",
          borderColor: isHovering ? "rgba(125,211,252,0.8)" : "rgba(125,211,252,0.45)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </>
  );
}
