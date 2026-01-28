import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { TbCoinTaka } from "react-icons/tb";
import { BsSortNumericDown, BsSortNumericUp } from "react-icons/bs";

const SelectDropDown = ({
  onSortChange,
}: {
  onSortChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("High to Low");

  const options = [
    {
      label: "High to Low",
      value: "High to Low",
      icon: <BsSortNumericUp size={20} />,
    },
    {
      label: "Low to High",
      value: "Low to High",
      icon: <BsSortNumericDown size={20} />,
    },
  ];

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onSortChange(value);
  };

  return (
    <div className="relative w-full">
      {/* Trigger Button */}
      <div
        className="border border-[#E4E2E2] dark:border-gray-700 h-11 py-2 px-3 rounded-lg cursor-pointer flex justify-between items-center text-sm bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 whitespace-nowrap">
          <TbCoinTaka
            size={18}
            className="text-gray-600 dark:text-gray-300"
          />
          {selected}
        </div>
        <div
          className={`transition-all duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <IoIosArrowDown
            size={18}
            className="text-gray-600 dark:text-gray-300"
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1 p-1 w-full bg-white dark:bg-gray-900 border border-[#E4E2E2] dark:border-gray-700 shadow-lg rounded-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="p-3 text-sm cursor-pointer rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0 text-gray-700 dark:text-gray-200">
                  {option.icon}
                </div>
                <span className="whitespace-nowrap">{option.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropDown;
