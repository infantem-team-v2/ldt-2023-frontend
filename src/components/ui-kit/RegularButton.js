import React from "react";

import '../../styles/RegularButton.css'


const RegularButton = ({ text, onClick, className, onBlur, disabled = false, hidden = false }) => {
  return (
    <button
      className={`regular-button ${className}`}
      onClick={disabled ? () => { } : onClick}
      onBlur={onBlur}
      hiddden={hidden}

    ><p className={"m-1 p-0 " + (disabled ? "muted" : "")}>
        {text}
      </p>
    </button>
  );
};

export default RegularButton;