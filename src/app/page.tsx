"use client";
import React, { useState, useRef } from "react";
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
  key: source.toLowerCase().replace(/\s+/g, "_"),
  label: source,
  name: source,
}));

// Validation schema
const validationSchema = Yup.object({
  kybStatus: Yup.array().min(1, "Select at least one KYB status"),
  hearAboutUs: Yup.array().min(1, "Select at least one source"),
});

const Page = () => {
  const [selectedHearAboutUsOptions, setSelectedHearAboutUsOptions] = useState([]);
  
  // Track dropdown open states
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({
    kybStatus: false,
    hearAboutUs: false
  });
  
  // Use refs instead of state for dropdown refs to avoid re-render on each update
  const dropdownRefs = useRef<Record<string, any>>({
    kybStatus: null,
    hearAboutUs: null,
  });

  // Function to handle label clicks
  const handleLabelClick = (fieldName: string) => {
    const ref = dropdownRefs.current[fieldName];
    
    // Update the state to track if dropdown is open or closed
    setDropdownStates(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
    
    // If dropdown is already open, close it
    if (dropdownStates[fieldName]) {
      if (ref && typeof ref.closeDropdown === 'function') {
        ref.closeDropdown();
      }
    } 
    // If dropdown is closed, open it
    else {
      if (ref && typeof ref.openDropdown === 'function') {
        ref.openDropdown();
      } else if (ref && typeof ref.toggleDropdown === 'function') {
        ref.toggleDropdown();
      }
    }
  };

  // Function to register both the ref and the initial state
  const registerDropdownRef = (fieldName: string, ref: any) => {
    dropdownRefs.current[fieldName] = ref;
    
    // When a dropdown opens or closes on its own, update our tracking state
    if (ref && typeof ref.onStateChange === 'function') {
      ref.onStateChange = (isOpen: boolean) => {
        setDropdownStates(prev => ({
          ...prev,
          [fieldName]: isOpen
        }));
      };
    }
  };

  return (
    <div className="p-6 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-[80px] rounded-lg shadow-lg max-w-[460px] min-h-[300px] flex flex-col gap-6">
        <h1 className="text-xl font-semibold">Multi-Select Form</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sunt modi pariatur, voluptatem natus culpa. Fugiat eveniet inventore tempora harum. Exercitationem consectetur ducimus molestiae rem? Velit placeat nobis ad quas?
          
        </p>
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
                <div
                  onClick={() => handleLabelClick("kybStatus")}
                  className="block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  KYB Status
                  <span className="text-red-500"> *</span>
                </div>
                <Field
                  name="kybStatus"
                  component={MultiSelectDropdown}
                  title="Select KYB Status"
                  options={getKybStatusOptions}
                  extraClass={`!w-[300px] h-[40px] text-neutral-500 ${errors.kybStatus && touched.kybStatus ? "border-red-500" : ""} no-scrollbar`}
                  bgColorClaSS="bg-none"
                  dropdownWidth="w-full"
                  registerRef={(ref: any) => registerDropdownRef("kybStatus", ref)}
                />
                {errors.kybStatus && touched.kybStatus && (
                  <p className="text-red-500 text-xs">{errors.kybStatus}</p>
                )}
              </div>

              {/* Where did you hear about us? Dropdown */}
              <div className="flex flex-col gap-2">
                <div
                  onClick={() => handleLabelClick("hearAboutUs")}
                  className="block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  How did you hear about us?
                  <span className="text-red-500"> *</span>
                </div>
                <Field
                  name="hearAboutUs"
                  component={MultiSelectDropdown}
                  title="Select How did you hear about us"
                  options={getHearAboutUsOptions}
                  extraClass={`!w-[300px] h-[40px] text-neutral-500 ${errors.hearAboutUs && touched.hearAboutUs ? "border-red-500" : ""} no-scrollbar`}
                  bgColorClaSS="bg-none"
                  dropdownWidth="w-full"
                  placeholder={
                    selectedHearAboutUsOptions.length > 0
                      ? `${selectedHearAboutUsOptions.length} selected...`
                      : "How did you hear about us?"
                  }
                  registerRef={(ref: any) => registerDropdownRef("hearAboutUs", ref)}
                />
                {errors.hearAboutUs && touched.hearAboutUs && (
                  <p className="text-red-500 text-xs">{errors.hearAboutUs}</p>
                )}
              </div>
              

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#171717] text-white text-[14px] px-4 py-2 h-[36px] rounded-lg hover:bg-[#404040] transition-all flex items-center justify-center"
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