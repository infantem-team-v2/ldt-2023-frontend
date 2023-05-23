import React from "react";

import '../styles/RegularButton.css'


const RegularButton = ({ text, onClick, className, onBlur }) => {
  return (
    <button className={`regular-button ${className}`} onClick={onClick} onBlur={onBlur}>{text}</button>
  );
};

export default RegularButton;