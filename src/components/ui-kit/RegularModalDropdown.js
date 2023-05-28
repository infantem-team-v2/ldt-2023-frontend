import React from 'react';

import { Form } from "react-bootstrap";

import { nanoid } from 'nanoid';

import '../../styles/RegularModalDropdown.css'



const RegularModalDropdown = ({ onChange, value, controlId, overlay, innerData, label,
  overlayPosition = "top", formLabel = undefined }) => {
  return (
    <>
      <Form.Group controlId={controlId} className="regular-modal-dropdown-form-group" key={nanoid()}>
        {formLabel ? <Form.Label className="regular-modal-form-label">{formLabel}</Form.Label> : <></>}
        <Form.Select
          value={value}
          onChange={onChange}
          className="regular-dropdown-form-control "
        >
          <option value={undefined} >{label}</option>
          {innerData ? innerData.map((option) => {
            return (
              <option
                key={nanoid()}
                value={option}
              >{option}</option>
            )
          }) : <></>}
        </Form.Select>
      </Form.Group>
    </>
  )
};
export default RegularModalDropdown;