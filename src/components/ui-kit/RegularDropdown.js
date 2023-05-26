import React from 'react';

import { Form, OverlayTrigger } from "react-bootstrap";

import { nanoid } from 'nanoid';

import '../../styles/RegularDropdown.css'



const RegularDropdown = ({ onChange, value, controlId, overlay, innerData, label,
  overlayPosition = "top", formLabel = undefined, formClass = undefined, dropdownClass = undefined }) => {
  return (
    <>
      <OverlayTrigger placement={overlayPosition} overlay={overlay} key={nanoid()}>
        <Form.Group controlId={controlId} className={"regular-dropdown-form-group" + (formClass ? formClass : "")} key={nanoid()}>
          {formLabel ? <Form.Label className="regular-modal-form-label">{formLabel}</Form.Label> : <></>}
          <Form.Select
            value={value}
            onChange={onChange}
            className={"regular-dropdown-form-control " + (dropdownClass ? dropdownClass : "")}
          >
            <option key={nanoid()} value={undefined}>{label}</option>
            {innerData.map((option) => {
              return (
                <option
                  key={nanoid()}
                  value={option}
                >{option}</option>
              )
            })}
          </Form.Select>
        </Form.Group>
      </OverlayTrigger>
    </>
  )
};
export default RegularDropdown;