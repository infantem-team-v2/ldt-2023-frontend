import React from "react";
import { Form, OverlayTrigger } from "react-bootstrap";

import { nanoid } from 'nanoid';

import '../../styles/RegularModalForm.css'

const RegularInput = ({ controlId, label, type, placeholder, value, onChange, errorHandler,
  size, renderInputError, className, overlay, overlayPosition = 'top' }) => {

  return (<>
    <OverlayTrigger placement={overlayPosition} overlay={overlay} >
      <Form.Group controlId={controlId} className="regular-input-form-group" key={nanoid()}>
        <Form.Label className="regular-modal-form-label">{label}</Form.Label>
        <Form.Control
          className={`regular-input-form-control ${className ? className : ""} `}
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
    </OverlayTrigger>
  </>);
};

export default RegularInput;