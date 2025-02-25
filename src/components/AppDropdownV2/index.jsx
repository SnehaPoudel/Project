// AppDropdownV2/index.jsx

// import { getDropdownMenuV2 } from 'components/Atomic/atoms/MenuV2';

"use client"
import React, { useState, useEffect, useRef } from 'react';
import ChevronDownIcon from '../Icons/ChevronDownIcon';
import { getDropdownMenuV2 } from './../MenuV2/index';

const AppDropdownV2 = ({
  title,
  // The raw list of options (each with key, label, icon, and/or subtitle).
  options = [],
  icon,
  // Called when a new option is selected.
  handleSelect = () => {},
  // Optional custom menu renderer. It should be a function that returns JSX when given an object with keys:
  // { options, title, activeKey, onOptionClick }.
  menuRenderer,
  // For Formik integration.
  field,
  form,
  // Whether to display the dropdown chevron.
  isChangeable = true,
  disabled = false,
  // Any additional classes to add to the outer container.
  extraClass = '',
  // If an error exists for this field, border color will be red-500.
  error,
  // Additional flag (e.g. for different padding/layout). Adjust as needed.
  select,
  // Props passed to the default menu renderer:
  hideSelectAll = false,
  showSearch = false,
  showIcons = false,
  showSubtitles = false,
  dropdownWidth = 'w-full',
  // New size prop: default remains as before; "xl" gives a taller input.
  size = 'default',
  bgColorClaSS = 'bg-white',
  ...props
}) => {
  // Whether the dropdown menu is open.
  const [open, setOpen] = useState(false);
  // The currently selected option (an object with key and label at a minimum).
  const [selectedOption, setSelectedOption] = useState({ key: '', label: '' });
  // The current search query (if showSearch is true).
  const [searchQuery, setSearchQuery] = useState('');
  // The list of options filtered by the search query.
  const [filteredOptions, setFilteredOptions] = useState(options);
  // Whether to display the dropdown menu above (if there isn't enough room below).
  const [positionAbove, setPositionAbove] = useState(false);

  // A ref on the entire dropdown container.
  const containerRef = useRef(null);

  // Sync local state with the Formik field value (if using Formik).
  useEffect(() => {
    if (field && field.value) {
      const selected = options.find((item) => item.key === field.value);
      if (selected) {
        setSelectedOption(selected);
      }
    } else {
      setSelectedOption({ key: '', label: '' });
    }
  }, [field?.value, options]);

  // Update filtered options when the search query changes.
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    const filteredResult = options.filter(
      (option) =>
        option.label?.toLowerCase().includes(query) ||
        option.key?.toLowerCase().includes(query) ||
        option.subtitle?.toString()?.toLowerCase().includes(query)
    );
    setFilteredOptions(filteredResult);
  }, [searchQuery, options]);

  // Close the dropdown if a click occurs outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update the dropdown menu position when open.
  useEffect(() => {
    if (!open) return;
    const updatePosition = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      const estimatedDropdownHeight = 300; // adjust if needed
      if (spaceBelow >= estimatedDropdownHeight) {
        setPositionAbove(false);
      } else if (spaceAbove >= estimatedDropdownHeight) {
        setPositionAbove(true);
      } else {
        setPositionAbove(spaceAbove > spaceBelow);
      }
    };

    // Update immediately when open.
    updatePosition();
    window.addEventListener('resize', updatePosition);
    document.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('scroll', updatePosition, true);
    };
  }, [open]);

  // When an option is selected.
  const onSelect = (key) => {
    if (selectedOption.key !== key) {
      const selectedItem = options.find((item) => item.key === key);
      setSelectedOption(selectedItem || { key: '', label: '' });
      if (field && form) {
        form.setFieldValue(field.name, selectedItem ? selectedItem.key : '');
      }
      handleSelect(selectedItem ? selectedItem.key : '');
    }
    // Reset the search and close the menu.
    setSearchQuery('');
    setFilteredOptions(options);
    setOpen(false);
  };

  // Toggle dropdown open/closed (unless disabled).
  const toggleDropdown = () => {
    if (disabled) return;
    setOpen(!open);
  };

  // Define input area height based on size.
  const inputHeightClass =
    size === 'xl'
      ? select
        ? 'h-12 py-2'
        : 'h-12'
      : select
      ? 'h-10 py-1.5'
      : 'h-10';

  return (
    <div
      id={props.id} // Set the id from the Field
      tabIndex="0" // Make the container focusable
      ref={containerRef}
      onBlur={(e) => {
        if (field && field.onBlur) {
          field.onBlur(e); // This properly notifies Formik that this field lost focus
        }
      }}
      className={`relative`}
    >
      {/* "Input" area – shows the current selection and the chevron */}
      <div
        onClick={toggleDropdown}
        className={`w-full flex items-center justify-between px-4 border border-[#D7DADC] rounded-md  ${extraClass} cursor-pointer ${inputHeightClass} ${bgColorClaSS}  ${
          disabled ? '!cursor-not-allowed ' : ''
        } ${
          error
            ? 'border-error'
            : open
            ? 'border-neutral-800'
            : 'border-[#D7DADC]'
        }`}
      >
        <div className="flex items-center">
          {selectedOption.key ? (
            <div className="flex items-center justify-center gap-2">
              {showIcons && <>{selectedOption.icon}</>}
              <span className="text-sm text-neutral-900">
                {selectedOption.label}
              </span>
            </div>
          ) : (
            <>
              {icon && <span className="mr-2">{icon}</span>}
              <span className="text-sm text-[#7B8698] ">{title}</span>
            </>
          )}
        </div>
        {isChangeable && (
          <ChevronDownIcon
            className={`h-5 w-5 transition-transform duration-200 ${
              open ? 'rotate-180 text-neutral-800' : 'text-[#D7DADC]'
            }`}
          />
        )}
      </div>

      {/* Dropdown menu */}
      {open && (
        <div
          className={`app-drop-shadow absolute z-10 bg-white rounded-md ${
            positionAbove ? 'bottom-full mb-4' : 'top-full mt-4'
          } ${dropdownWidth}`}
          style={{
            filter: 'drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.12))',
          }}
        >
          {showSearch && (
            <div className="px-3 pt-2.5 flex items-center">
              <div className="flex items-center justify-center">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${title}...`}
                className="w-full px-2 py-1 text-sm focus:border-none focus:outline-none"
              />
            </div>
          )}
          <div className="custom-scrollbar-none my-2.5 mx-2.5 max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              // Render via a custom menu renderer if provided, else use our default getDropdownMenuV2.
              menuRenderer ? (
                menuRenderer({
                  options: filteredOptions,
                  title,
                  activeKey: selectedOption.key,
                  showIcons,
                  showSubtitles,
                  onOptionClick: onSelect,
                })
              ) : (
                getDropdownMenuV2({
                  options: filteredOptions,
                  title,
                  hideSelectAll,
                  showIcons,
                  showSubtitles,
                  activeKey: selectedOption.key,
                  onOptionClick: onSelect,
                })
              )
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

export default AppDropdownV2;