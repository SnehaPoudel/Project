
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
  // "Select All" option (if not hidden)
  const allSelected = activeKey.length === options.length;
  const selectedOptions = options.filter(option => activeKey.includes(option.key));
  const unselectedOptions = options.filter(option => !activeKey.includes(option.key));

  const optionsList = [];

  if (!hideSelectAll) {
    optionsList.push(
      <div
        key="all"
        onClick={() => onOptionClick('all')}
        className="flex items-center justify-between h-[40px] px-3 py-2 cursor-pointer select-none hover:bg-gray-100 text-sm text-gray-600"
      >
        <div className="flex items-center gap-2.5">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() => onOptionClick('all')}
            onClick={(e) => e.stopPropagation()}
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          />
          <span>Select All</span>
        </div>
      </div>
    );
    optionsList.push(<div key="divider-1" className="border-t border-gray-200 my-1"></div>);
  }

  // Map selected options
  selectedOptions.forEach(option => {
    const isActive = activeKey.includes(option.key);
    optionsList.push(
      <div
        key={option.key}
        onClick={() => onOptionClick(option.key)}
        className={`flex items-center justify-between px-3 p-2 gap-2.5 cursor-pointer select-none rounded-[4px] font-normal`}
      >
        <div className="flex h-6 items-center gap-2.5">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => onOptionClick(option.key)}
            onClick={(e) => e.stopPropagation()}
            className="form-checkbox h-[16px] w-[16px] text-blue-600 transition duration-150 ease-in-out"
          />
          {showIcons && option.icon && <div>{option.icon}</div>}
          <div className={`text-sm text-neutral-800 ${isActive ? '!text-blue-600 !font-medium' : 'hover:text-neutral-900'}`}>{option.label}</div>
        </div>
        {showSubtitles && option.subtitle && (
          <div className={clsx('text-sm text-neutral-600', { '!text-blue-600 !font-medium': isActive })}>{option.subtitle}</div>
        )}
      </div>
    );
  });

  if (selectedOptions.length > 0 && unselectedOptions.length > 0) {
    optionsList.push(<div key="divider-2" className="border-t border-gray-200 my-1"></div>);
  }

  // Map unselected options
  unselectedOptions.forEach(option => {
    optionsList.push(
      <div
        key={option.key}
        onClick={() => onOptionClick(option.key)}
        className="flex items-center justify-between h-[40px] px-3 py-2 cursor-pointer select-none hover:bg-neutral-100 text-sm text-neutral-800"
      >
        <div className="flex items-center gap-2.5">
          <input
            type="checkbox"
            checked={activeKey.includes(option.key)}
            onChange={() => onOptionClick(option.key)}
            onClick={(e) => e.stopPropagation()}
            className="form-checkbox h-[16px] w-[16px] text-blue-600 transition duration-150 ease-in-out"
          />
          {showIcons && option.icon && <div>{option.icon}</div>}
          <span>{option.label}</span>
        </div>
        {showSubtitles && option.subtitle && (
        <div className="text-sm text-neutral-600">{option.subtitle}</div> 
      )}
      </div>
    );
  });

  return <div >{optionsList}</div>;
};

export default MenuV3;
