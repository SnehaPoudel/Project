"use client";

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
  extraClass = "",
  bgColorClaSS = "bg-white",
  showIcons = false,
  dropdownWidth = "w-full",
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(field?.value || []);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef(null);
  const containerRef = useRef(null);

  // Update filtered options when search query changes
  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle option selection
  const onSelect = (key) => {
    if (!scrollContainerRef.current) return;
    
    // Save the current scroll position
    const previousScrollTop = scrollContainerRef.current.scrollTop;
  
    const selectedValues = field.value || [];
    const isSelected = selectedValues.includes(key);
    
    let newSelectedOptions;
    if (key === "all") {
      newSelectedOptions = selectedOptions.length === options.length ? [] : options.map((o) => o.key);
    } else {
      newSelectedOptions = isSelected
        ? selectedValues.filter((val) => val !== key)
        : [...selectedValues, key];
    }
  
    setSelectedOptions(newSelectedOptions);
    form.setFieldValue(field.name, newSelectedOptions);
    handleSelect(newSelectedOptions);
  
    // Restore scroll position after the update
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = previousScrollTop;
      }
    }, 0);
  };
  
  return (
    <div id={props.id} tabIndex="0" ref={containerRef} className="relative min-h-[40px] flex flex-col">
      {/* Select Box */}
      <div
        onClick={() => {
          setOpen((prev) => {
            if (!prev && scrollContainerRef.current) {
              scrollContainerRef.current.scrollTop = 0; // Preserve scroll position
            }
            return !prev;
          });
        }}
        className={`w-full flex items-center justify-between rounded-lg cursor-pointer border border-gray-300 px-4 py-2 ${bgColorClaSS} ${extraClass}`}
      >
        <div className="flex items-center w-full justify-between">
          <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-sm text-gray-400">{title}{selectedOptions.length > 0 ? "..." : ""}</span>
          </div>
          
          {selectedOptions.length > 0 && (
            <div className="flex items-center bg-[#DBEAFE] text-[#1447E6] text-sm font-semibold px-3 py-1 rounded-full ml-2">
              {selectedOptions.length}
              <button
                className="ml-2 text-[#1447E6] hover:text-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault(); // Prevent scrolling to the top
                  setSelectedOptions([]);
                  form.setFieldValue(field.name, []);
                  handleSelect([]);
                }}
              >
                <CrossIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <ChevronDownIcon className={`h-5 w-5 ml-2 transition-transform ${open ? "rotate-180 text-gray-700" : "text-gray-400"}`} />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className={`absolute z-10 bg-white rounded-md shadow-lg top-full mt-2 ${dropdownWidth} overflow-visible`}>
          {/* Search Input */}
          <div className="ml-[8px] px-[12px] flex items-center space-x-2">
            <SearchIcon className="text-gray-500 h-[14px] w-[14px]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 text-sm outline-none bg-white"
            />
          </div>
          <div className="border-t border-gray-200 mx-2"></div>

          {/* Options List */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="max-h-60 overflow-y-auto px-2 py-2 scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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