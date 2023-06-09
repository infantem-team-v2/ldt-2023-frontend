import React from 'react';
import { ButtonGroup, Dropdown, Form, OverlayTrigger } from 'react-bootstrap';

import { nanoid } from 'nanoid';

import '../../styles/RegularMultipleDropdown.css';

const RegularMultipleDropdown = ({ selectedOptions, setSelectedOptions, controlId, overlay, innerData, label,
  overlayPosition = "top", formLabel = undefined, formClass = undefined, }) => {


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
    <OverlayTrigger placement={overlayPosition} overlay={overlay}  >
      <Form.Group controlId={controlId} className={"regular-multiple-dropdown-form-group"} >
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle id="dropdown-basic" className='multi-dropdown-toggle'>
            {formLabel ? formLabel : "Выберите из списка"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Form>
              {innerData.map((option, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
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
