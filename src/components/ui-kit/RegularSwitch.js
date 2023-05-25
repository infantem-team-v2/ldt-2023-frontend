import { Form, OverlayTrigger } from "react-bootstrap";

import { nanoid } from 'nanoid';

import '../../styles/RegularSwitch.css'



const RegularSwitch = ({ onChange, value, label, controlId, overlay, overlayPosition = "top", formLabel = undefined, formClass = undefined, switchClass = undefined }) => {

  return (
    <>
      <OverlayTrigger placement={overlayPosition} overlay={overlay} key={nanoid()} >
        <Form.Group controlId={controlId} className="regular-switch-form-group" key={nanoid()}>
          {formLabel ? <Form.Label className="regular-modal-form-label" key={nanoid()}>{formLabel}</Form.Label> : <></>}
          <Form.Check
            key={nanoid()}
            type="switch"
            label={label}
            onClick={onChange}
            className={"regular-switch-form-control " + (switchClass ? switchClass : "")}
          />
        </Form.Group>
      </OverlayTrigger>
    </>
  );
};

export default RegularSwitch;