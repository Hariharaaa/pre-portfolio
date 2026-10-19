"use client";
import { useSyncExternalStore } from "react";

// Tiny Web Audio sound kit. Every sound is synthesised, so there are no audio files to load.
// Browsers only allow audio after a click or key press, so sounds stay silent until then.

const STORAGE_KEY = "portfolio-sound-muted";

let ctx: AudioContext | null = null;
let muted = false;
const subscribers = new Set<() => void>();
const notify = () => subscribers.forEach((fn) => fn());

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

if (typeof window !== "undefined") {
  try {
    muted = localStorage.getItem(STORAGE_KEY) === "1";
  } catch {}
  // Only some events count as a "user gesture" (scrolling does not). Keep listening until audio actually starts.
  const events = ["pointerdown", "pointerup", "mousedown", "click", "touchend", "keydown"] as const;
  const unlock = () => {
    const c = getCtx();
    if (!c) return;
    c.resume().then(() => {
      if (c.state === "running") events.forEach((e) => window.removeEventListener(e, unlock));
    }).catch(() => {});
  };
  events.forEach((e) => window.addEventListener(e, unlock));
}

function ready() {
  if (muted || !ctx || ctx.state !== "running") return null;
  return ctx;
}

function tone(c: AudioContext, opts: { type: OscillatorType; from: number; to?: number; at?: number; length: number; volume: number }) {
  const t = c.currentTime + (opts.at ?? 0);
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = opts.type;
  osc.frequency.setValueAtTime(opts.from, t);
  if (opts.to) osc.frequency.exponentialRampToValueAtTime(opts.to, t + opts.length);
  gain.gain.setValueAtTime(opts.volume, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + opts.length);
  osc.connect(gain).connect(c.destination);
  osc.start(t);
  osc.stop(t + opts.length + 0.02);
}

// Mechanical click of an odometer wheel passing a digit
export function playTick() {
  const c = ready();
  if (!c) return;
  tone(c, { type: "square", from: 2600, to: 900, length: 0.025, volume: 0.025 });
}

// "Cha-ching" when a number lands
export function playDing() {
  const c = ready();
  if (!c) return;
  tone(c, { type: "triangle", from: 1318.5, length: 0.5, volume: 0.12 });
  tone(c, { type: "triangle", from: 1760, at: 0.09, length: 0.7, volume: 0.12 });
  tone(c, { type: "sine", from: 3520, at: 0.09, length: 0.35, volume: 0.03 });
}

// Soft blip on hover
export function playHover() {
  const c = ready();
  if (!c) return;
  tone(c, { type: "sine", from: 660, to: 880, length: 0.06, volume: 0.035 });
}

// Chunky press on click
export function playClick() {
  const c = ready();
  if (!c) return;
  tone(c, { type: "triangle", from: 220, to: 90, length: 0.09, volume: 0.18 });
}

export function setMuted(next: boolean) {
  muted = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  } catch {}
  notify();
}

export function useMuted() {
  return useSyncExternalStore(
    (fn) => {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
    () => muted,
    () => false
  );
}
