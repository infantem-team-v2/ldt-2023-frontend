import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { nanoid } from 'nanoid';

import RegularButton from './ui-kit/RegularButton';
import ProgressBar from './ui-kit/ProgressBar';

import exampleData from './exampleData.json';

import '../styles/BasicCalculator.css';
import api from '../services/api';

const BasicCalculator = (props) => {

  const [fields, setFields] = useState({});
  const [resultsElements, setResultsElements] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState();

  useEffect(() => {
    api.get("/ui/calc/element/active").then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setData(response.data);
      }
    }).catch((err) => {
      console.log(err);
      setData(exampleData)
    }
    );
  }, []);



  useEffect(() => {
    if (data) {
      setInitialFields();
      setComponents();
    }
  }, [data]);

  useEffect(() => {
    const numberOfSteps = Object.values(fields).filter((field) => field !== undefined).length;
    setCurrentStep(numberOfSteps);
  }, [fields]);

  const setInitialFields = () => {
    const fieldsNames = data.elements.map((element) => element.field_id);
    const newFields = {};

    fieldsNames.forEach((element) => {
      newFields[element] = undefined;
    });
    setFields(newFields);
  }

  const setComponents = () => {
    setResultsElements(
      <>
        {data.elements.map((element) => {
          const type = element.type;
          switch (type) {
            case 'dropdown':
              return handleDropdown(element);
            case 'input':
              return handleInput(element);
            case "dropdown_multiselect":
              return handleDropdownMultiselect(element);
            case 'checkbox':
              return handleCheckbox(element);
            case 'range':
              return handleSlider(element);
            default:
              return null;
          }
        })}
      </>
    )
  }


  const updateFieldsStates = (fieldId, newValue) => {
    setFields(prevState => {
      return {
        ...prevState,
        [fieldId]: newValue
      }
    });
  };



  const renderTooltip = (hint) => (
    <Tooltip id="hint-tooltip"  >
      {hint}
    </Tooltip>
  );

  const handleDropdown = (element) => {
    const fieldId = element.field_id;
    return (
      <Form.Group key={nanoid()}>
        <OverlayTrigger placement="top" overlay={renderTooltip(element.comment)} >
          <Form.Select
            value={fields[fieldId]}
            onChange={(e) => { e.preventDefault(); updateFieldsStates(fieldId, e.target.value) }}
          >
            {element.options.map((option) => {
              return (
                <option
                  key={nanoid()}
                  value={option}
                >
                  {option}
                </option>
              )
            })}
          </Form.Select>
        </OverlayTrigger>
      </Form.Group>
    )
  };

  const handleInput = (element) => {
    const fieldId = element.field_id;
    return (
      <Form.Group key={nanoid()}>
        <OverlayTrigger placement="top" overlay={renderTooltip(element.comment)} >
          <Form.Control
            type={element.input_type ? element.input_type : "text"}
            name={element.field}
            value={fields[fieldId]}
            onChange={(e) => { e.preventDefault(); updateFieldsStates(fieldId, e.target.value) }}
          />
        </OverlayTrigger>
      </Form.Group>
    )
  };

  const handleCheckbox = (element) => {
    const fieldId = element.field_id;
    return (
      <Form.Group key={nanoid()}>
        <OverlayTrigger placement="top" overlay={renderTooltip(element.comment)} >
          <Form.Check
            type="switch"
            id={fieldId}
            label={element.field}
            value={fields[fieldId]}
            onChange={(e) => { e.preventDefault(); updateFieldsStates(fieldId, e.target.value) }}
          />
        </OverlayTrigger>
      </Form.Group>
    )

  };
  const handleSlider = (element) => {
    const fieldId = element.field_id;
    return (
      <Form.Group key={nanoid()}>
        <OverlayTrigger placement="top" overlay={renderTooltip(element.comment)} >
          <Form.Range
            type="range"
            id={fieldId}
            label={element.field}
            value={fields[fieldId]}
            min={element.range_min}
            max={element.range_max}
            onChange={(e) => { e.preventDefault(); updateFieldsStates(fieldId, e.target.value) }}
          />
        </OverlayTrigger>
      </Form.Group>
    )
  };

  const handleDropdownMultiselect = (element) => {
    const fieldId = element.field_id;
    return (
      <Form.Group key={nanoid()}>
        <OverlayTrigger placement="top" overlay={renderTooltip(element.comment)} >
          <Form.Select
            value={fields[fieldId]}
            onChange={(e) => { e.preventDefault(); updateFieldsStates(fieldId, e.target.value) }}
          >
            {element.options.map((option) => {
              return (
                <option
                  key={nanoid()}
                  value={option}
                >{option}</option>
              )
            })}
          </Form.Select>
        </OverlayTrigger>
      </Form.Group>
    )
  };


  return (
    <>
      <ProgressBar range={data ? data.elements.length : 10} current={currentStep} />
      <div className='mb-4 '>
        <Form >
          {resultsElements}
          <div className='calculator-control-block'>
            <p className='p-logo calculator-sign'>
              Нажимая на кнопку вы принимайте условия <a href="https://www.google.com/">пользовательского соглашения</a>
            </p>
            <RegularButton
              text="Submit"
              onClick={(e) => { e.preventDefault(); console.log(e); console.log(fields) }}
            />
          </div>
        </Form>
      </div>

    </>
  );
};

export default BasicCalculator;
