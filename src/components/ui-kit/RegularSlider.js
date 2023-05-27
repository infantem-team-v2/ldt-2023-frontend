
import { React } from 'react';

import { Form, OverlayTrigger } from "react-bootstrap";

import { nanoid } from 'nanoid';

import '../../styles/RegularCheckbox.css'


const RegularSlider = ({ onChange, value, label, controlId, overlay, overlayPosition = "top", hidden,
  formLabel = undefined, }) => {
  return (
    <OverlayTrigger placement={overlayPosition} overlay={overlay} >
      <Form.Group controlId={controlId} className="" hidden={hidden}>
        {formLabel ? <Form.Label className="regular-modal-form-label" >{formLabel}{value}</Form.Label> : <></>}
        <Form.Range
          label={label}
          value={value}
          max={10000}
          min={0}
          step={50}
          onChange={onChange}
          className={"regular-slider-check"}
        />
      </Form.Group>
    </OverlayTrigger>
  )
};

export default RegularSlider;