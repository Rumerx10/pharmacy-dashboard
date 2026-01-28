import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const gradientColors = [
  {
    colors: [
      { offset: "0%", color: "rgba(87, 143, 126, 1)" },
      { offset: "50%", color: "rgba(46, 117, 95, 1)" },
      { offset: "100%", color: "rgba(3, 90, 63, 1)" },
    ],
  },
  {
    colors: [
      { offset: "0%", color: "rgba(46, 140, 188, 1)" },
      { offset: "50%", color: "rgba(22, 106, 149, 1)" },
      { offset: "100%", color: "rgba(5, 81, 120, 1)" },
    ],
  },
  {
    colors: [
      { offset: "0%", color: "rgba(229, 43, 102, 1)" },
      { offset: "50%", color: "rgba(184, 22, 73, 1)" },
      { offset: "100%", color: "rgba(147, 5, 50, 1)" },
    ],
  },
  {
    colors: [
      { offset: "0%", color: "rgba(254, 197, 81, 1)" },
      { offset: "50%", color: "rgba(213, 156, 39, 1)" },
      { offset: "100%", color: "rgba(191, 134, 17, 1)" },
    ],
  },
  {
    colors: [
      { offset: "0%", color: "#46C3E0" },
      { offset: "50%", color: "rgba(56, 184, 216, 1)" },
      { offset: "100%", color: "rgba(38, 139, 168, 1)" },
    ],
  },
];
