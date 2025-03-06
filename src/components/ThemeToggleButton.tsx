// src/components/ThemeToggleButton.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import useTheme from "@/hooks/useTheme";

export default function ThemeToggleButton() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Toggle aria-label="Toggle theme" onClick={toggleTheme}>
      {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Toggle>
  );
}
