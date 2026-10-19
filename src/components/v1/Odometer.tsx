"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { playDing, playTick } from "@/components/v1/sound";

interface OdometerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  replayToken?: number; // change this number to spin the wheels again
  onComplete?: () => void;
}

const DIGIT_HEIGHT = 1.1; // em, height of one digit cell
const STAGGER = 250; // ms, extra spin time per higher place
const MIN_TICK_GAP = 28; // ms, keeps fast spins from turning into noise

// Bike-meter style counter: each digit is a wheel of 0-9 that spins into place.
// The ones wheel spins the most, higher places spin fewer times, like a real odometer.
export const Odometer = ({ value, prefix = "", suffix = "", duration = 4000, className = "", replayToken = 0, onComplete }: OdometerProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);
  const [rolled, setRolled] = useState(false);
  const [instant, setInstant] = useState(false); // true while snapping back for a replay, or always with reduced motion

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const formatted = value.toLocaleString("en-US");
  const chars = formatted.split("");
  const digitCount = chars.filter((c) => /\d/.test(c)).length;
  const totalTime = duration + (digitCount - 1) * STAGGER;

  // Follow the wheels while they spin: tick whenever any wheel passes a digit, ding when they settle
  const trackSpin = useCallback(() => {
    cancelAnimationFrame(frame.current);
    const wheels = ref.current ? [...ref.current.querySelectorAll<HTMLElement>("[data-wheel]")] : [];
    const start = performance.now();
    let lastSum = -1;
    let lastTick = 0;

    const step = (now: number) => {
      let sum = 0;
      for (const wheel of wheels) {
        const cell = parseFloat(getComputedStyle(wheel).fontSize) * DIGIT_HEIGHT;
        const y = new DOMMatrixReadOnly(getComputedStyle(wheel).transform).m42;
        sum += Math.round(-y / cell);
      }
      if (lastSum !== -1 && sum !== lastSum && now - lastTick > MIN_TICK_GAP) {
        playTick();
        lastTick = now;
      }
      lastSum = sum;

      if (now - start < totalTime + 50) {
        frame.current = requestAnimationFrame(step);
      } else {
        playDing();
        onCompleteRef.current?.();
      }
    };
    frame.current = requestAnimationFrame(step);
  }, [totalTime]);

  const roll = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true);
      setRolled(true);
      onCompleteRef.current?.();
      return;
    }
    setRolled(true);
    trackSpin();
  }, [trackSpin]);

  // First spin when the number scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          roll();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" } // start as soon as the number rises above the bottom tenth of the screen
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [roll]);

  // Replays: snap back to ...0001 with no transition, let that paint, then spin again
  useEffect(() => {
    if (replayToken === 0) return;
    let id = requestAnimationFrame(() => {
      cancelAnimationFrame(frame.current);
      setInstant(true);
      setRolled(false);
      id = requestAnimationFrame(() => {
        id = requestAnimationFrame(() => {
          setInstant(false);
          roll();
        });
      });
    });
    return () => cancelAnimationFrame(id);
  }, [replayToken, roll]);

  let digitIdx = 0;

  return (
    <span
      ref={ref}
      role="img"
      aria-label={`${prefix}${formatted}${suffix}`}
      className={`inline-flex items-start tabular-nums leading-none ${className}`}
    >
      {prefix && <span aria-hidden="true" style={{ height: `${DIGIT_HEIGHT}em`, lineHeight: `${DIGIT_HEIGHT}em` }}>{prefix}</span>}
      {chars.map((char, i) => {
        if (!/\d/.test(char)) {
          return (
            <span key={i} aria-hidden="true" style={{ height: `${DIGIT_HEIGHT}em`, lineHeight: `${DIGIT_HEIGHT}em` }}>
              {char}
            </span>
          );
        }

        const place = digitCount - 1 - digitIdx++; // 0 = ones
        const spins = digitCount - place; // ones spin most
        const target = spins * 10 + Number(char);
        const start = place === 0 ? 1 : 0; // meter starts at ...0001
        const position = rolled ? target : start;
        const wheel = Array.from({ length: (spins + 1) * 10 }, (_, n) => n % 10);

        return (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block overflow-hidden"
            style={{ height: `${DIGIT_HEIGHT}em` }}
          >
            <span
              data-wheel
              className="flex flex-col"
              style={{
                transform: `translateY(-${position * DIGIT_HEIGHT}em)`,
                transition: instant
                  ? "none"
                  : `transform ${duration + place * STAGGER}ms cubic-bezier(0.15, 0.85, 0.25, 1)`,
              }}
            >
              {wheel.map((d, n) => (
                <span key={n} style={{ height: `${DIGIT_HEIGHT}em`, lineHeight: `${DIGIT_HEIGHT}em` }}>
                  {d}
                </span>
              ))}
            </span>
          </span>
        );
      })}
      {suffix && <span aria-hidden="true" style={{ height: `${DIGIT_HEIGHT}em`, lineHeight: `${DIGIT_HEIGHT}em` }}>{suffix}</span>}
    </span>
  );
};
