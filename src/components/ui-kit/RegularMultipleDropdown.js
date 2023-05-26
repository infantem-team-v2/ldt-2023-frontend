import React, { useState } from 'react';
import { ButtonGroup, Dropdown, Form, OverlayTrigger } from 'react-bootstrap';

import { nanoid } from 'nanoid';

import '../../styles/RegularMultipleDropdown.css';

const RegularMultipleDropdown = ({ onChange, value, controlId, overlay, innerData, label,
  overlayPosition = "top", formLabel = undefined, formClass = undefined, dropdownClass = undefined }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (optionValue) => {
    const newSelectedOptions = [...selectedOptions];
    if (newSelectedOptions.includes(optionValue)) {
      newSelectedOptions.splice(newSelectedOptions.indexOf(optionValue), 1);
    } else {
      newSelectedOptions.push(optionValue);
    }
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <OverlayTrigger placement={overlayPosition} overlay={overlay} key={nanoid()}>
      <Form.Group controlId={controlId} className={"regular-dropdown-form-group" + (formClass ? formClass : "")} key={nanoid()}>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" className='multi-dropdown-toggle'>
            {formLabel ? formLabel : "Выберите из списка"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Form>
              {innerData.map((option, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={option}
                  //selectedOptions.includes(option)
                  checked={value}
                  //() => handleOptionChange(option)
                  onChange={onChange}
                  className='regular-multiple-dropdown-checkbox'
                />
              ))}
            </Form>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
    </OverlayTrigger>
  );
};

export default RegularMultipleDropdown;
