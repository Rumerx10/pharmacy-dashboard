"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const themes = [
  {
    key: "light",
    icon: Sun,
    label: "Light theme",
  },
  {
    key: "dark",
    icon: Moon,
    label: "Dark theme",
  },
];

export type ThemeSwitcherProps = {
  value?: "light" | "dark" | "system";
  onChange?: (theme: "light" | "dark" | "system") => void;
  defaultValue?: "light" | "dark" | "system";
  className?: string;
};

export const ThemeSwitcher = ({
  value,
  onChange,
  defaultValue = "system",
  className,
}: ThemeSwitcherProps) => {
  const { theme: resolvedTheme, setTheme } = useTheme();
  const [theme, setLocalTheme] = useControllableState({
    defaultProp: defaultValue,
    prop: value,
    onChange,
  });
  const [mounted, setMounted] = useState(false);

  const handleThemeClick = useCallback(
    (themeKey: "light" | "dark") => {
      setLocalTheme(themeKey);
      setTheme(themeKey);
    },
    [setLocalTheme, setTheme]
  );

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    if (resolvedTheme) {
      setLocalTheme(resolvedTheme as "light" | "dark");
    }
  }, [resolvedTheme, setLocalTheme]);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border",
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            aria-label={label}
            className="relative  cursor-pointer h-6 w-6 rounded-full"
            key={key}
            onClick={() => handleThemeClick(key as "light" | "dark")}
            type="button"
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gray-50 dark:bg-gray-700"
                layoutId="activeTheme"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto h-4 w-4",
                isActive ? "text-yellow-400" : "text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
