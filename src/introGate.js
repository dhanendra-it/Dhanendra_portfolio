// Tiny shared gate between the gear loader and the hero.
//  - heroReady: the hero portrait + 3D scene has actually drawn (textures decoded, GPU uploaded)
//  - revealed : the loader is lifting away, so the hero's entrance animations may start
import { useSyncExternalStore } from "react";
import photo from "./assets/dhruv-neww.webp";
import photoTall from "./assets/dhruv-torso.webp";

// start fetching + decoding the hero portraits right away (in parallel with the 3D chunk) instead of
// waiting for that chunk to ask for them, so they are ready by the time the gear finishes
if (typeof window !== "undefined" && window.location.pathname === "/") {
  [photo, photoTall].forEach((src) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    if (img.decode) img.decode().catch(() => {});
  });
}

const state = { heroReady: false, revealed: false };
const subs = new Set();
const emit = () => subs.forEach((fn) => fn());

export const markHeroReady = () => {
  if (state.heroReady) return;
  state.heroReady = true;
  emit();
};

export const reveal = () => {
  if (state.revealed) return;
  state.revealed = true;
  emit();
};

export const isHeroReady = () => state.heroReady;
export const isRevealed = () => state.revealed;

export const subscribe = (fn) => {
  subs.add(fn);
  return () => subs.delete(fn);
};

export const useRevealed = () => useSyncExternalStore(subscribe, isRevealed, isRevealed);
