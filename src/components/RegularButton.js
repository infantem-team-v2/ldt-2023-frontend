import React from "react";

import '../styles/RegularButton.css'


const RegularButton = ({ text, onClick, className }) => {
  return (
    <button className={`regular-button ${className}`} onClick={onClick}>{text}</button>
  );
};

export default RegularButton;