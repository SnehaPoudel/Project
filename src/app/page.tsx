"use client";
import React, { useState } from "react";
import AppDropdownV2 from './../components/AppDropdownV2/index';


export const kybStatus = [
  "PENDING",
  "IN_PROGRESS",
  "SUBMITTED",
  "APPROVED",
  "REJECTED",
];

export const getKybStatusOptions = [
  {
    key: "",
    label: "All",
    name: "",
  },
  ...kybStatus.map((status) => ({
    key: status,
    label: status,
    name: status,
  })),
];

const Page = () => {
  const [filterStates, setFilterStates] = useState({
    page: 1,
    status: "PENDING",
  });

  const handleKYBStatusSelect = (status) => {
    setFilterStates((prev) => ({
      ...prev,
      status: status,
      page: 1,
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">KYB Status Filter</h1>
      <AppDropdownV2
        title="KYB"
        options={getKybStatusOptions as any}
        extraClass="!w-[140px] text-neutral-500"
        bgColorClaSS="bg-none"
        size="xl"
        field={{ value: filterStates.status }}
        handleSelect={handleKYBStatusSelect as any}
      />
      <div className="mt-4">
        <p>
          <strong>Selected Status:</strong> {filterStates.status || "All"}
        </p>
      </div>
    </div>
  );
};

export default Page;
