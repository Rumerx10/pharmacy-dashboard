"use state";
import React, { useState } from "react";
import ConnectionStatus from "../ConnectionStatus";
import { ThemeSwitcher } from "../ui/shadcn-io/theme-switcher";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Header = ({
  connectionStatus,
  navToggle,
  setNavToggle,
}: {
  connectionStatus: "connecting" | "connected" | "disconnected";
  navToggle: boolean;
  setNavToggle: (value: boolean) => void;
}) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  return (
    <div
      className={`fixed shadow transition-all duration-300 ${
        navToggle ? "h-10" : "h-24"
      } px-4 lg:px-40 z-50 w-full backdrop-blur-sm 
        bg-white/70 dark:bg-gray-800/70  border-gray-200 dark:border-gray-700 
        flex items-center justify-between duration-300`}
    >
      <div
        className={`flex duration-100 justify-between w-full items-center ${
          navToggle && "opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-primary-900 dark:text-primary-100">
            Dashboard Overview
          </h1>
          <ConnectionStatus connectionStatus={connectionStatus} />
        </div>
        <div className="mr-3">
          <ThemeSwitcher
            value={theme}
            onChange={setTheme}
            className="scale-125"
          />
        </div>
      </div>
      <div
        onClick={() => setNavToggle(!navToggle)}
        className="rounded absolute left-1/2 -translate-x-1/2 -bottom-2.5"
      >
        <div className="text-gray-400 dark:text-white bg-white dark:bg-gray-800 flex items-center justify-center h-7 w-7 shadow rounded">
          <MdOutlineKeyboardArrowDown
            size={28}
            className={`cursor-pointer duration-300 ${
              !navToggle && "rotate-180"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
