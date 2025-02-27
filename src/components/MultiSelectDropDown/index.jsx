"use client";
import React, { useState, useEffect, useRef } from "react";
import ChevronDownIcon from "../Icons/ChevronDownIcon";
import MenuV3 from "../MenuV3";
import SearchIcon from "../Icons/SearchIcon";

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
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollContainerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (field?.value) {
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
    if (!scrollContainerRef.current) return;
    const previousScrollTop = scrollContainerRef.current.scrollTop;

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
        setSelectedOptions((prev = []) => {
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

    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = previousScrollTop;
      }
    }, 0);
  };

  // Function to scroll to the top
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  // Show scroll button only when scrolling
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setShowScrollButton(scrollContainerRef.current.scrollTop > 50);
    }
  };

  return (
    <div id={props.id} tabIndex="0" ref={containerRef} className="relative w-full min-h-[50px] flex flex-col">
      <div
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between flex-wrap rounded-lg cursor-pointer transition-all duration-300 
          ${bgColorClaSS} ${extraClass} px-4 py-2 border border-gray-300 shadow-sm`}
      >
        <div className="flex flex-wrap gap-2 flex-1">
          {selectedOptions.length > 0 ? (
            <>
              <span className="text-sm text-gray-400 px-1 py-1">Select KYB status</span>
              <div className="flex items-center bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full ml-auto">
                {selectedOptions.length}
                <button
                  className="ml-2 text-white hover:text-gray-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOptions([]);
                    if (field && form) {
                      form.setFieldValue(field.name, []);
                    }
                    handleSelect([]);
                  }}
                >
                  ✕
                </button>
              </div>
            </>
          ) : (
            <span className="text-sm text-gray-500">{title}</span>
          )}
        </div>

        <ChevronDownIcon className={`h-5 w-5 ml-2 transition-transform duration-200 ${open ? "rotate-180 text-gray-700" : "text-gray-400"}`} />
      </div>

      {open && (
        <div className={`absolute z-10 bg-white rounded-md shadow-lg top-full mt-2 ${dropdownWidth} overflow-visible`}>
          <div className="p-2 rounded-md">
            
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 text-sm outline-none bg-white rounded-md border border-gray-300 focus:border-blue-700 focus:border-2"
            />
          </div>
          <div className="border-t border-gray-200 mx-2"></div>
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="max-h-60 overflow-y-auto scrollbar-hide px-2 py-2"
              onScroll={handleScroll}
            >
              <MenuV3
                options={filteredOptions}
                activeKey={selectedOptions.map((option) => option.key)}
                onOptionClick={onSelect}
                showIcons={showIcons}
                title={title}
              />
            </div>
            
            {showScrollButton && (
              <button
                onClick={scrollToTop}
                className="absolute bottom-3 right-3 bg-blue-600 w-8 h-8 flex items-center justify-center rounded-full shadow-lg z-20 hover:bg-blue-500"
              >
                <ChevronDownIcon className="h-4 w-4 transform rotate-180 text-gray-200" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;