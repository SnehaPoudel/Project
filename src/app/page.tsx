"use client";
import React, { useState } from "react";
import MultiSelectDropdown from './../components/MultiSelectDropdown';

export const kybStatus = [
  "PENDING",
  "IN_PROGRESS",
  "SUBMITTED",
  "APPROVED",
  "REJECTED",
];

export const getKybStatusOptions = kybStatus.map((status) => ({   
  key: status,
  label: status,
  name: status,
}));

const Page = () => {
  const [filterStates, setFilterStates] = useState<{ page: number; status: string[] }>({
    page: 1,
    status: [],
  });

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
      <MultiSelectDropdown
        title="KYB"
        options={getKybStatusOptions as any}
        extraClass="!w-full text-neutral-500"
        bgColorClaSS="bg-none"
        size="xl"
        showIcons={false} 
        dropdownWidth="w-full" 
        field={{ value: filterStates.status }}
        handleSelect={handleKYBStatusSelect as any}
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