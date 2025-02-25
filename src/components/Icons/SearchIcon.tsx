import React from 'react';

function SearchIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        stroke="currentCOlor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.417 11.083a4.667 4.667 0 100-9.333 4.667 4.667 0 000 9.333zM12.25 12.25L9.713 9.712"
      ></path>
    </svg>
  );
}

export default SearchIcon;