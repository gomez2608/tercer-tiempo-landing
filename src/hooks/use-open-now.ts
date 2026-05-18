"use client";

import { useEffect, useState } from "react";

import { businessHours } from "@/lib/site-config";

export type OpenNowState =
  | { state: "open"; closesAt: string }
  | { state: "opens-today"; opensAt: string }
  | { state: "opens-tomorrow"; opensAt: string };

function formatHourMinute(h: number, m: number): string {
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const mm = m === 0 ? "" : `:${m.toString().padStart(2, "0")}`;
  return `${hour12}${mm} ${period}`;
}

export function computeOpenNow(now: Date): OpenNowState {
  const { open, close } = businessHours;
  const openMinutes = open.hour * 60 + open.minute;
  const closeMinutes = close.hour * 60 + close.minute;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  if (nowMinutes >= openMinutes && nowMinutes < closeMinutes) {
    return { state: "open", closesAt: formatHourMinute(close.hour, close.minute) };
  }
  if (nowMinutes < openMinutes) {
    return { state: "opens-today", opensAt: formatHourMinute(open.hour, open.minute) };
  }
  return { state: "opens-tomorrow", opensAt: formatHourMinute(open.hour, open.minute) };
}

export function useOpenNow(): OpenNowState | null {
  const [state, setState] = useState<OpenNowState | null>(null);

  useEffect(() => {
    const tick = () => setState(computeOpenNow(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}
