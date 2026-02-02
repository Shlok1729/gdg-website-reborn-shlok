"use client";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { type themeType } from "@/app/constants/theme";
import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const themes = [
  {
    key: "system",
    Icon: Monitor,
    label: "System",
  },
  {
    key: "light",
    Icon: Sun,
    label: "Light",
  },
  {
    key: "dark",
    Icon: Moon,
    label: "Dark",
  },
] as const;

export type ThemeSwitcherProps = {
  onChange?: (theme: themeType) => void;
  className?: string;
};

export const ThemeSwitcher = ({ onChange, className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const CurrentTheme = themes.find((t) => t.key === theme);

  return (
    <div className={cn("relative", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            {CurrentTheme ? (
              <CurrentTheme.Icon className="size-4 absolute inset-0 m-auto" />
            ) : (
              <Monitor className="size-4" />
            )}
            <span className="sr-only">Open theme switcher</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          alignOffset={-8}
          className="max-w-24 space-y-1"
        >
          {themes.map(({ key, Icon: Icon, label }) => {
            const isActive = theme === key;
            return (
              <Button
                variant="ghost"
                size="sm"
                key={key}
                onClick={() => {
                  setTheme(key as themeType);
                  onChange?.(key as themeType);
                }}
                className={cn("justify-start relative text-xs w-full")}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTheme"
                    className="absolute inset-0 rounded-full bg-primary/10 dark:bg-primary/20"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <Icon className="size-4 relative" />
                <span className="relative">{label}</span>
              </Button>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
