
import { React } from 'react';

import { Form, OverlayTrigger } from "react-bootstrap";

import { nanoid } from 'nanoid';

import '../../styles/RegularCheckbox.css'

const RegularCheckbox = ({ onChange, value, label, controlId, overlay, overlayPosition = "top",
  formLabel = undefined, formClass = undefined, checkboxClass = undefined }) => {
  return (
    <OverlayTrigger placement={overlayPosition} overlay={overlay} key={nanoid()} >
      <Form.Group controlId={controlId} className="regular-checkbox-form-group" key={nanoid()}>
        {formLabel ? <Form.Label className="regular-modal-form-label" key={nanoid()}>{formLabel}</Form.Label> : <></>}
        {/* <Form.Check
          key={nanoid()}
          type="checkbox"
          label={label}
          className={"regular-checkbox-form-control " + (checkboxClass ? checkboxClass : "")}
        >
          <Form.Check.Input
            key={nanoid()}
            type="checkbox"
            checked={value}
            onChange={onChange}
          />
        </Form.Check> */}
        <div className="form-check" key={nanoid()}>
          <input
            key={nanoid()}
            className={"form-check-input regular-checkbox-form-control " + (checkboxClass ? checkboxClass : "")}
            type="checkbox"
            checked={value ? value : false}
            onChange={onChange}
          />
          <label className="form-check-label" key={nanoid()}>
            {label}
          </label>
        </div>
      </Form.Group>
    </OverlayTrigger>
  )
};

export default RegularCheckbox;