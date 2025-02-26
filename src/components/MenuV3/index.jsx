"use client";
import React from 'react';
import clsx from 'clsx';

/**
 * Renders the dropdown menu items using Tailwind CSS.
 *
 * @param {Object} params
 * @param {Array} params.options - The (filtered) list of option objects. Each option may have:
 *   - key (string): unique key,
 *   - label (string): the primary label,
 *   - icon (JSX element): optional icon,
 *   - subtitle (string): optional subtitle.
 * @param {string} params.title - Used to display the "All …" option.
 * @param {boolean} [params.hideSelectAll=false] - If true, do NOT include the "All …" option.
 * @param {boolean} [params.showIcons=false] - If true, show the option's icon.
 * @param {boolean} [params.showSubtitles=false] - If true, show the option's subtitle.
 * @param {Array} [params.activeKey=[]] - The keys of the currently selected options.
 * @param {function} [params.onOptionClick] - Called with the option key when an option is clicked.
 *
 * @returns {Array} Array of JSX elements representing the menu items.
 */
const MenuV3 = ({
  options = [],
  title,
  hideSelectAll = false,
  showIcons = false,
  showSubtitles = false,
  activeKey = [],
  onOptionClick = () => {},
}) => {
  // Map each option into a clickable div.
  const optionsList = options.map((option) => {
    const isActive = activeKey.includes(option.key);
    return (
      <div
        key={option.key}
        onClick={() => onOptionClick(option.key)}
        className={`flex items-center justify-between gap-2.5 px-3 py-2 cursor-pointer select-none rounded-[4px] font-normal bg-[#FAFAFA]
          ${isActive ? '!bg-blue-100' : 'hover:bg-neutral-100'}`}
      >
        <div className="flex h-6 items-center gap-2.5">
          {/* Checkbox to indicate selection */}
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => onOptionClick(option.key)}
            onClick={(e) => e.stopPropagation()} // Prevent event bubbling to parent div
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          />
          {/* Optional icon display */}
          {showIcons && option.icon && <div>{option.icon}</div>}
          {/* Option label with conditional styling based on selection */}
          <div
            className={`text-sm text-neutral-800 ${
              isActive
                ? '!text-blue-600 !font-medium'
                : 'hover:text-neutral-900'
            }`}
          >
            {option.label}
          </div>
        </div>
        {/* Optional subtitle display */}
        {showSubtitles && option.subtitle && (
          <div
            className={clsx('text-sm text-neutral-600', {
              '!text-blue-600 !font-medium': isActive,
            })}
          >
            {option.subtitle}
          </div>
        )}
      </div>
    );
  });

  // "Select All" option (if not hidden)
  if (!hideSelectAll) {
    const allSelected = activeKey.length === options.length;
    optionsList.unshift(
      <div
        key="all"
        onClick={() => onOptionClick('all')}
        className="flex items-center justify-between px-3 py-2 cursor-pointer select-none hover:bg-gray-100 text-sm text-gray-600 bg-[#FAFAFA]"
      >
        <div className="flex items-center gap-2.5">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() => onOptionClick('all')}
            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          />
          <span>SELECT ALL</span>
        </div>
      </div>
    );
  }
  
  return <div className="py-2">{optionsList}</div>;
};

export default MenuV3;