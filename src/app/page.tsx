"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import MultiSelectDropdown from "../components/MultiSelectDropdown";

// List of KYB status options
export const kybStatus = [
  "PENDING",
  "IN_PROGRESS",
  "SUBMITTED",
  "APPROVED",
  "REJECTED",
  "REVIEW_REQUIRED",
  "RESUBMISSION_REQUIRED",
  "ON_HOLD",
  "ESCALATED",
  "EXPIRED",
  "CANCELLED",
  "VERIFIED",
  "UNVERIFIED",
  "NEEDS_REVIEW",
  "SUSPENDED",
  "UNDER_INVESTIGATION",
  "DOCUMENTS_REQUIRED",
  "WAITING_FOR_VERIFICATION",
  "KYC_PENDING",
  "KYC_COMPLETED",
  "AML_CHECK_PENDING",
  "AML_CHECK_APPROVED",
  "COMPLIANCE_CHECK_PENDING",
  "COMPLIANCE_CHECK_APPROVED",
  "FRAUD_ALERT",
];

// Convert KYB status options into dropdown-compatible format
export const getKybStatusOptions = kybStatus.map((status) => ({
  key: status,
  label: status,
  name: status,
}));

// List of "Where did you hear about us?" options
export const hearAboutUsList = [
  "Social Media",
  "Google Search",
  "Friend or Referral",
  "Event or Conference",
  "News Article",
  "Others",
];

// Convert "Where did you hear about us?" options into dropdown-compatible format
export const getHearAboutUsOptions = hearAboutUsList.map((source) => ({
  key: source.toLowerCase().replace(/\s+/g, "_"), // Generate a unique key by converting spaces to underscores
  label: source,
  name: source,
}));

// Validation schema
const validationSchema = Yup.object({
  kybStatus: Yup.array().min(1, "Select at least one KYB status"),
  hearAboutUs: Yup.array().min(1, "Select at least one option"),
});

const Page = () => {
  const [selectedHearAboutUsOptions, setSelectedHearAboutUsOptions] = useState([]);

  return (
    <div className="p-6 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-[80px] rounded-lg shadow-lg min-h-[300px] flex flex-col gap-6">
        <h1 className="text-xl font-semibold">Multi-Select Form</h1>

        {/* Formik Form */}
        <Formik
          initialValues={{
            kybStatus: [],
            hearAboutUs: [],
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form Submitted:", values);
            alert(`Selected KYB Status: ${values.kybStatus.join(", ")}\nSelected Sources: ${values.hearAboutUs.join(", ")}`);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-6">
              {/* KYB Status Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  KYB Status
                  <span className="text-red-500"> *</span>
                </label>
                <Field
                  name="kybStatus"
                  component={MultiSelectDropdown}
                  title="Select KYB Status"
                  options={getKybStatusOptions}
                  extraClass={`!w-[300px] h-[40px] text-neutral-500 ${errors.kybStatus && touched.kybStatus ? "border-red-500" : ""}`}
                  bgColorClaSS="bg-none"
                  dropdownWidth="w-full"
                />
                {errors.kybStatus && touched.kybStatus && (
                  <p className="text-red-500 text-sm">{errors.kybStatus}</p>
                )}
              </div>

              {/* Where did you hear about us? Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  How did you hear about us?
                  <span className="text-red-500"> *</span>
                </label>
                <Field
                  name="hearAboutUs"
                  component={MultiSelectDropdown}
                  title="Select How did you hear about us"
                  options={getHearAboutUsOptions}
                  extraClass={`!w-[300px] h-[40px] text-neutral-500 ${errors.hearAboutUs && touched.hearAboutUs ? "border-red-500" : ""}`}
                  bgColorClaSS="bg-none"
                  dropdownWidth="w-full"
                  placeholder={
                    selectedHearAboutUsOptions.length > 0
                      ? `${selectedHearAboutUsOptions.length} selected...`
                      : "How did you hear about us?"
                  }
                />
                {errors.hearAboutUs && touched.hearAboutUs && (
                  <p className="text-red-500 text-sm">{errors.hearAboutUs}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#171717] text-white text-[14px] px-6 py-2 h-[36px] rounded-lg hover:bg-[#404040] transition-all flex items-center justify-center"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Page;
