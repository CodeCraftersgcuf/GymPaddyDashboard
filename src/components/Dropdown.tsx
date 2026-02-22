import { ChevronDown } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface DropdownOption {
  name: string;
  value: string;
  icon?: string;
  danger?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  roundedValue?: string;
  position?: string;
  bgColor?: string;
  borderColor?: string;
  disabled?: boolean;
  gap?: string;
  FullWidth?: boolean;
  isNotActiveBg?: boolean;
  img?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  placeholder = "Select an option",
  defaultValue,
  roundedValue = "md",
  position = "right-0",
  borderColor = "gray-300",
  disabled = false,
  gap = "2",
  FullWidth,
  isNotActiveBg = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    () => (defaultValue !== undefined ? (options.find(o => o.value === defaultValue) ?? null) : null)
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    onChange(option.value);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getButtonStyles = () => {
    if (isNotActiveBg || selectedOption) {
      return "bg-white text-black";
    }
    return "bg-white text-black";
  };

  return (
    <div
      className={`relative ${FullWidth ? "w-full" : "w-fit"}`}
      ref={dropdownRef}
    >
      <button
        className={`flex text-nowrap items-center justify-between cursor-pointer
          gap-${gap} p-2 
          ${selectedOption ? 'bg-theme-dark text-white' : ''}
          border border-${borderColor} rounded-${roundedValue} 
          ${getButtonStyles()}
           text-base ${FullWidth ? "w-full" : "w-fit"}`}
        disabled={disabled}
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          {selectedOption?.icon && (
            <img src={selectedOption.icon} alt={selectedOption.name} className="w-5 h-5" />
          )}
          {selectedOption ? selectedOption.name : placeholder}
        </div>
        <ChevronDown size={15} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} color="black" />
      </button>

      {dropdownOpen && (
        <div
          className={`absolute top-full mt-1 min-w-full z-10 ${position} border border-${borderColor} rounded-lg bg-white shadow-md text-black overflow-hidden`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              className={`w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-left text-nowrap hover:bg-gray-100 capitalize
                ${option.danger ? "text-red-600" : "text-black"}
                ${selectedOption?.value === option.value ? "bg-gray-100 font-medium" : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.icon && (
                <img src={option.icon} alt={option.name} className="w-5 h-5" />
              )}
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
