import React, { useState, useEffect, useRef } from "react";
import ChevronDownIcon from "../Icons/ChevronDownIcon";
import MenuV3 from "../MenuV3";
import SearchIcon from "../Icons/SearchIcon";
import CrossIcon from "../Icons/CrossIcon";

const MultiSelectDropdown = ({
  title,
  options = [],
  handleSelect = () => {},
  field,
  form,
  extraClass,
  bgColorClaSS = "bg-white",
  showIcons = false,
  dropdownWidth = "w-full",
  registerRef, // Prop to register the component's ref
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(field?.value || []);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const [isContainerFocused, setIsContainerFocused] = useState(false);
  const scrollContainerRef = useRef(null);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

 

  // Handle clicking the dropdown
  const toggleDropdown = () => {
    setOpen((prev) => {
      if (!prev && scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      return !prev;
    });
  };

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
        setIsContainerFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      if (!containerRef.current || !dropdownRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const spaceBelow = viewportHeight - containerRect.bottom;
      const spaceAbove = containerRect.top;

      if (spaceBelow < 240 && spaceAbove > spaceBelow) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [open]);

  const onSelect = (key) => {
    const previousScrollTop = scrollContainerRef.current.scrollTop;

    const selectedValues = field.value || [];
    const isSelected = selectedValues.includes(key);

    let newSelectedOptions;
    if (key === "all") {
      newSelectedOptions =
        selectedOptions.length === options.length ? [] : options.map((o) => o.key);
    } else {
      newSelectedOptions = isSelected
        ? selectedValues.filter((val) => val !== key)
        : [...selectedValues, key];
    }

    setSelectedOptions(newSelectedOptions);
    form.setFieldValue(field.name, newSelectedOptions);
    handleSelect(newSelectedOptions);

    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = previousScrollTop;
      }
    }, 0);
  };

  return (
    <div
      id={props.id}
      tabIndex="0"
      ref={containerRef}
      className="relative min-h-[40px] flex flex-col"
    >
      <div
        onClick={toggleDropdown}
        
        className={`w-full flex items-center justify-between rounded-lg cursor-pointer px-4 py-2 ${bgColorClaSS} ${extraClass} ${form.errors[field.name] && form.touched[field.name] ? 'border-red-500' : ''}`}
        style={{
          border: form.errors[field.name] && form.touched[field.name] ? '1px solid #f44336' : '1px solid #D1D5DB',
        }}
      >
        <div className="flex items-center w-full justify-between">
          <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-sm text-gray-400">
              {title}
              {selectedOptions.length > 0 ? "..." : ""}
            </span>
          </div>

          {selectedOptions.length > 0 && (
            <div className="flex items-center bg-[#DBEAFE] text-[#1447E6] text-sm font-semibold px-3 py-1 rounded-full ml-2">
              {selectedOptions.length}
              <button
                className="ml-2 text-[#1447E6] "
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setSelectedOptions([]);
                  form.setFieldValue(field.name, []);
                  handleSelect([]);
                }}
              >
                <CrossIcon className="w-4 h-4 " />
              </button>
            </div>
          )}

          <ChevronDownIcon
            className={`h-5 w-5 ml-2 transition-transform ${open ? "rotate-180 text-gray-700" : "text-gray-400"}`}
          />
        </div>
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className={`dropdown-menu ${dropdownPosition === "top" ? "top" : "bottom"} mt-2.5 `}
        >
          <div className="ml-[8px] px-[12px] flex items-center space-x-2 sticky top-0 bg-white z-10">
            <SearchIcon className="text-gray-500 h-[14px] w-[14px]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 text-sm outline-none bg-white"
            />
          </div>
          <div className="border-t border-gray-200 mx-2 bg-white z-5 shadow-sm"></div>

          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="overflow-y-auto px-2 py-2 hide-scrollbar"
            >
              <MenuV3
                options={filteredOptions}
                activeKey={selectedOptions}
                onOptionClick={onSelect}
                showIcons={showIcons}
                title={title}
                className="font-medium"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
