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
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [positionAbove, setPositionAbove] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (field && field.value) {
      const selected = options.filter((item) => field.value.includes(item.key));
      setSelectedOptions(selected);
    } else {
      setSelectedOptions([]);
    }
  }, [field?.value, options]);

  useEffect(() => {
    const selected = selectedOptions.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const unselected = options.filter(
      (option) =>
        !selectedOptions.some((selected) => selected.key === option.key) &&
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOptions([...selected, ...unselected]);
  }, [options, searchQuery, selectedOptions]);

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
  };

  return (
    <div id={props.id} tabIndex="0" ref={containerRef} className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        ref={inputRef}
        className={`w-full flex items-center justify-between flex-wrap rounded-lg cursor-pointer transition-all duration-300 
          ${bgColorClaSS} ${extraClass} px-4 py-2 border border-gray-300 shadow-sm`}
      >
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
              {selectedOptions.length > 6 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAll(!showAll);
                  }}
                  className="text-blue-600 bg-blue-100 text-sm font-medium px-2 py-1 rounded-md hover:bg-blue-50 transition"
                >
                  {showAll ? "Less" : `+${selectedOptions.length - 6} More`}
                </button>
              )}
            </>
          ) : (
            <span className="text-sm text-gray-500">{title}</span>
          )}
        </div>
        <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180 text-gray-700" : "text-gray-400"}`} />
      </div>
      {open && (
        <div className={`absolute z-10 bg-white rounded-md shadow-lg ${positionAbove ? "bottom-full mb-2" : "top-full mt-2"} ${dropdownWidth}`}>
          <div className="p-2 border-b border-gray-300  rounded-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 text-sm outline-none bg-white rounded-md border border-gray-300"
            />
          </div>
          <div className="my-2.5 mx-2.5">
            <MenuV3
              options={filteredOptions}
              activeKey={selectedOptions.map((option) => option.key)}
              onOptionClick={onSelect}
              showIcons={showIcons}
              title={title}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
