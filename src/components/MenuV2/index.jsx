
"use client"
// MenuV2/index.jsx
// getDropdownMenuV2.js
import clsx from 'clsx';
import React from 'react';



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
 * @param {string} [params.activeKey=''] - The key of the currently selected option.
 * @param {function} [params.onOptionClick] - Called with the option key when an option is clicked.
 *
 * @returns {Array} Array of JSX elements representing the menu items.
 */
export const getDropdownMenuV2 = ({
  options = [],
  title,
  hideSelectAll = true,
  showIcons = false,
  showSubtitles = false,
  activeKey = '',
  onOptionClick = () => {},
}) => {
  // Map each option into a clickable div.
  const optionsList = options.map((option) => {
    const isActive = option.key === activeKey;
    return (
      <div
        key={option.key}
        onClick={() => onOptionClick(option.key)}
        className={`flex items-center justify-between gap-2.5 px-3 py-2 cursor-pointer select-none rounded-[4px] font-normal bg-[#FAFAFA]
          ${isActive ? '!bg-blue-100' : 'hover:bg-neutral-100'}`}
      >
        <div className="flex h-6 items-center gap-2.5">
          {showIcons && option.icon && <div>{option.icon}</div>}
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

  if (hideSelectAll) {
    optionsList.unshift(
      <div
        key=""
        onClick={() => onOptionClick('')}
        className="flex justify-center px-4 py-2 cursor-pointer select-none hover:bg-gray-100 text-sm text-gray-600"
      >
        {`All ${title}`}
      </div>
    );
  }
  return optionsList;
};