"use client";
import React, { useState, useEffect, useRef } from "react";
import ChevronDownIcon from "../Icons/ChevronDownIcon";
import MenuV3 from "../MenuV3";

const MultiSelectDropdown = ({
  title,
  options = [],
  handleSelect = () => {},
  field,
  form,
  extraClass = "",
  bgColorClaSS = "bg-white",
  size = "default",
  showIcons = false,
  dropdownWidth = "w-full",
  ...props
}) => {
  // State variables
  const [open, setOpen] = useState(false); // Controls dropdown visibility
  const [selectedOptions, setSelectedOptions] = useState([]); // Stores selected options
  const [filteredOptions, setFilteredOptions] = useState(options); // Stores filtered options based on search
  const [positionAbove, setPositionAbove] = useState(false); // Determines dropdown position
  const [showAll, setShowAll] = useState(false); // Controls display of additional selected items
  const [searchQuery, setSearchQuery] = useState(""); // Stores search input value

  // Refs for handling click outside and focus behavior
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Effect to sync selected options with form field values
  useEffect(() => {
    if (field && field.value) {
      const selected = options.filter((item) => field.value.includes(item.key));
      setSelectedOptions(selected);
    } else {
      setSelectedOptions([]);
    }
  }, [field?.value, options]);

  // Effect to filter options based on search query
  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [options, searchQuery]);

  // Effect to close dropdown when clicking outside
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

  // Effect to adjust dropdown position based on available space
  useEffect(() => {
    if (!open) return;
    const updatePosition = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      const estimatedDropdownHeight = 300;

      if (spaceBelow >= estimatedDropdownHeight) {
        setPositionAbove(false);
      } else if (spaceAbove >= estimatedDropdownHeight) {
        setPositionAbove(true);
      } else {
        setPositionAbove(spaceAbove > spaceBelow);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    document.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  // Function to handle selection and deselection of options
  const onSelect = (key) => {
    if (key === "all") {
      const allKeys = options.map((option) => option.key);
      if (selectedOptions.length === options.length) {
        setSelectedOptions([]);
        if (field && form) {
          form.setFieldValue(field.name, []);
        }
        handleSelect([]);
      } else {
        setSelectedOptions(options);
        if (field && form) {
          form.setFieldValue(field.name, allKeys);
        }
        handleSelect(allKeys);
      }
    } else {
      const selectedItem = options.find((item) => item.key === key);
      if (selectedItem) {
        setSelectedOptions((prev) => {
          const isSelected = prev.some((item) => item.key === key);
          const newSelectedOptions = isSelected
            ? prev.filter((item) => item.key !== key)
            : [...prev, selectedItem];

          if (field && form) {
            form.setFieldValue(
              field.name,
              newSelectedOptions.map((item) => item.key)
            );
          }
          handleSelect(newSelectedOptions.map((item) => item.key));
          return newSelectedOptions;
        });
      }
    }
    setFilteredOptions(options);
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div id={props.id} tabIndex="0" ref={containerRef} className="relative w-full">
      {/* Dropdown input box */}
      <div
        onClick={toggleDropdown}
        ref={inputRef}
        className={`w-full flex items-center justify-between flex-wrap rounded-lg cursor-pointer transition-all duration-300 
          ${bgColorClaSS} ${extraClass} px-4 py-2 border border-gray-300 shadow-sm`}
      >
        {/* Selected options display */}
        <div className="flex flex-wrap gap-2 flex-1">
          {selectedOptions.length > 0 ? (
            <>
              {selectedOptions.slice(0, showAll ? selectedOptions.length : 6).map((option) => (
                <span
                  key={option.key}
                  className="bg-blue-100 text-blue-600 text-sm font-medium px-2 py-1 rounded-md flex items-center"
                >
                  {option.label}
                  <button
                    className="ml-2 text-blue-700 hover:text-blue-900"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(option.key);
                    }}
                  >
                    ✕
                  </button>
                </span>
              ))}
              {!showAll && selectedOptions.length > 6 && (
                <button
                  className="bg-blue-100 text-blue-600 text-sm font-medium px-2 py-1 rounded-md flex items-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAll(true);
                    setOpen(true);
                  }}
                >
                  +{selectedOptions.length - 6} More
                </button>
              )}
              {showAll && (
                <button
                  className="bg-blue-100 text-blue-600 text-sm font-medium px-2 py-1 rounded-md flex items-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAll(false);
                  }}
                >
                  Less
                </button>
              )}
            </>
          ) : (
            <span className="text-sm text-gray-500">{title}</span>
          )}
        </div>
        <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180 text-gray-700" : "text-gray-400"}`} />
      </div>
      {/* Dropdown options */}
      {open && <MenuV3 options={filteredOptions} activeKey={selectedOptions.map((option) => option.key)} onOptionClick={onSelect} showIcons={showIcons} title={title} />}
    </div>
  );
};

export default MultiSelectDropdown;
