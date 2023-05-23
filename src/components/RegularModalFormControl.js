import React from "react";
import { Form } from "react-bootstrap";

import '../styles/RegularModalFormControl.css'

const RegularModalFormControl = ({ controlId, label, type, placeholder, value, onChange, errorHandler, size, renderInputError, className }) => {

  return (<>
    <Form.Group controlId={controlId} className="regular-modal-form-group">
      <Form.Label className="regular-modal-form-label">{label}</Form.Label>
      <Form.Control
        className={`regular-modal-form-control ${className ? className : ""} `}
        size={size ? size : "m"}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Form.Control.Feedback type="invalid">
        {errorHandler}
      </Form.Control.Feedback>
      {renderInputError}
    </Form.Group>
  </>);
};

export default RegularModalFormControl;