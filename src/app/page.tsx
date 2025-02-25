// page.tsx

"use client";
import React, { useState } from "react";
import MultiSelectDropdown from './../components/MultiSelectDropdown';

// List of KYB status options
export const kybStatus = [
  "PENDING",
  "IN_PROGRESS",
  "SUBMITTED",
  "APPROVED",
  "REJECTED",
];

// Convert KYB status options into dropdown-compatible format
export const getKybStatusOptions = kybStatus.map((status) => ({   
  key: status,
  label: status,
  name: status,
}));

const Page = () => {
  // State to manage selected filters, including pagination and status selection
  const [filterStates, setFilterStates] = useState<{ page: number; status: string[] }>({
    page: 1,
    status: [],
  });

  /**
   * Handles the selection of KYB statuses from the dropdown.
   * If 'all' is selected, it sets all statuses, otherwise, updates the selected statuses.
   */
  const handleKYBStatusSelect = (statuses) => {
    if (statuses.includes("all")) {
      setFilterStates((prev) => ({
        ...prev,
        status: kybStatus,
        page: 1,
      }));
    } else {
      setFilterStates((prev) => ({
        ...prev,
        status: statuses,
        page: 1,
      }));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">KYB Status Filter</h1>
      {/* MultiSelectDropdown component to select KYB statuses */}
      <MultiSelectDropdown
        title="KYB"
        options={getKybStatusOptions as any} // Provide KYB status options
        extraClass="!w-full text-neutral-500" 
        bgColorClaSS="bg-none"
        size="xl"
        showIcons={false} 
        dropdownWidth="w-full" 
        field={{ value: filterStates.status }} // Bind the selected statuses
        handleSelect={handleKYBStatusSelect as any} // Handle status selection
      />
      <div className="mt-4">
        <p>
          <strong>Selected Status:</strong> {filterStates.status.length === 0 ? "None" : filterStates.status.join(', ')}
        </p>
      </div>
    </div>
  );
};

export default Page;
