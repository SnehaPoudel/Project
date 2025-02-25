import React, { useState, useEffect, useRef } from 'react';
import ChevronDownIcon from '../Icons/ChevronDownIcon';
import MenuV3 from './../MenuV3';

const MultiSelectDropdown = ({
  title,
  options = [],
  handleSelect = () => {},
  field,
  form,
  extraClass = '',
  bgColorClaSS = 'bg-white',
  size = 'default',
  showIcons = false,
  dropdownWidth = 'w-full',
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [positionAbove, setPositionAbove] = useState(false);
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
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    window.addEventListener('resize', updatePosition);
    document.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('scroll', updatePosition, true);
    };
  }, [open]);

  const onSelect = (key) => {
    if (key === 'all') {
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
      const selectedItem = options.find((item) => item.key === key);   // Checks if the selected item is already in the selectedOptions array.
      if (selectedItem) {
        setSelectedOptions((prev) => {
          const isSelected = prev.some((item) => item.key === key);
          const newSelectedOptions = isSelected                          
            ? prev.filter((item) => item.key !== key)            // If selected, remove it
            : [...prev, selectedItem];                //If not selected, add it
          if (field && form) {
            form.setFieldValue(
              field.name,
              newSelectedOptions.map((item) => item.key)
            );
          }
          handleSelect(newSelectedOptions.map((item) => item.key));   // updated selection
          return newSelectedOptions;
        });
      }
    }
    setFilteredOptions(options);
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const inputHeightClass =
    size === 'xl'
      ? 'h-12'
      : 'h-10';

  return (
    <div
      id={props.id}
      tabIndex="0"
      ref={containerRef}
      className={`relative w-full`}
    >
      <div
        onClick={toggleDropdown}
        ref={inputRef}
        className={`w-full flex items-center justify-between px-4 border border-[#D7DADC] rounded-md ${extraClass} cursor-pointer ${inputHeightClass} ${bgColorClaSS}`}
      >
        <div className="flex items-center w-full overflow-hidden">
          {selectedOptions.length > 0 ? (
            <div className="flex items-center justify-start gap-2 flex-wrap w-full">
              {selectedOptions.map((option) => (
                <span
                  key={option.key}
                  className="bg-blue-100 text-blue-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  {option.label}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-sm text-[#7B8698] truncate">{title}</span>
          )}
        </div>
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform duration-200 ${
            open ? 'rotate-180 text-neutral-800' : 'text-[#D7DADC]'
          }`}
        />
      </div>

      {open && (
        <div
          className={`app-drop-shadow absolute z-10 bg-white rounded-md ${
            positionAbove ? 'bottom-full mb-4' : 'top-full mt-4'
          } ${dropdownWidth}`}
          style={{
            filter: 'drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.12))',
          }}
        >
          <div className="custom-scrollbar-none my-2.5 mx-2.5 max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              <MenuV3
                options={filteredOptions}
                activeKey={selectedOptions.map((option) => option.key)}
                onOptionClick={onSelect}
                showIcons={showIcons}
                title={title} // Pass the title to MenuV3
              />
            ) : (
              <div className="px-4 py-2 text-center text-sm text-gray-600">
                Options not available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;