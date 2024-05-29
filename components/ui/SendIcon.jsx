import React from "react";
export const SendIcon = ({size, height, width, ...props}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             width="28"
             height="28"
             fill="none"
             viewBox="0 0 24 24"
             stroke="#000000"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             {...props}
             >
            <path d="M10 9l-6 6 6 6"/>
            <path d="M20 4v7a4 4 0 0 1-4 4H5"/>
        </svg>
    );
};
