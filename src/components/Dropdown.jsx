import { ChevronDown, MoveDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Dropdown = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-44" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-2 text-white rounded-lg flex items-center justify-between"
      >
        <span>{selected || label}</span>
        <ChevronDown width={20}/>
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full rounded-lg shadow bg-neutral-800 overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className="px-4 py-2 text-white hover:bg-amber-300 hover:text-black cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
