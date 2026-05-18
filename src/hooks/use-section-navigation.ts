"use client";

import { useEffect, useState, type MouseEvent } from "react";

import type { NavId } from "@/lib/site-config";

export function useSectionNavigation() {
  const [activeSection, setActiveSection] = useState<NavId | "">("");

  const handleNavClick = (
    section: NavId,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    setActiveSection(section);

    const target = document.getElementById(section);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${section}`);
  };

  useEffect(() => {
    if (!window.location.hash) return;

    const section = window.location.hash.substring(1) as NavId;
    setActiveSection(section);

    const id = window.setTimeout(() => {
      document
        .getElementById(section)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    return () => window.clearTimeout(id);
  }, []);

  return { activeSection, handleNavClick };
}
