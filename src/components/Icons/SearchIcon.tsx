import React from 'react';

function SearchIcon({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" // Default width
      height="24" // Default height
      viewBox="0 0 24 24"
      fill="none"
      className={className} // Dynamically add className for height/width control
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M10.8571 3.71429C6.91225 3.71429 3.71429 6.91225 3.71429 10.8571C3.71429 14.802 6.91225 18 10.8571 18C14.802 18 18 14.802 18 10.8571C18 6.91225 14.802 3.71429 10.8571 3.71429ZM2 10.8571C2 5.96548 5.96548 2 10.8571 2C15.7488 2 19.7143 5.96548 19.7143 10.8571C19.7143 12.9943 18.9574 14.9547 17.697 16.4848L21.749 20.5368C22.0837 20.8715 22.0837 21.4142 21.749 21.749C21.4142 22.0837 20.8715 22.0837 20.5368 21.749L16.4848 17.697C14.9547 18.9574 12.9943 19.7143 10.8571 19.7143C5.96548 19.7143 2 15.7488 2 10.8571Z" 
        fill="#525252"
      />
    </svg>
  );
}

export default SearchIcon;
