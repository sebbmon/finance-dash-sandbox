"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../../utils/utils";

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function Select({ value, onChange, options, placeholder = "Select...", className, disabled }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn("relative w-full text-sm", className)} ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-zinc-200 bg-transparent px-3 py-1 shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:focus:ring-zinc-300",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-zinc-200 bg-white py-1 shadow-md dark:border-zinc-800 dark:bg-zinc-950 animate-in fade-in-80 zoom-in-95 duration-100">
          {options.map((option) => (
             <div
               key={option.value}
               className={cn(
                 "relative flex cursor-pointer select-none items-center rounded-sm mx-1 py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-zinc-100 hover:text-zinc-900 focus:bg-zinc-100 focus:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-colors",
                 value === option.value && "bg-zinc-100 dark:bg-zinc-800 font-medium"
               )}
               onClick={() => {
                 onChange(option.value);
                 setIsOpen(false);
               }}
             >
               {value === option.value && (
                 <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                   <Check className="h-4 w-4" />
                 </span>
               )}
               <span className="block truncate">{option.label}</span>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
