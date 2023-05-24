import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { nanoid } from 'nanoid';

import RegularButton from './ui-kit/RegularButton';
import ProgressBar from './ui-kit/ProgressBar';
import RegularInput from './ui-kit/RegularInput';

import '../styles/BasicCalculator.css';
import api from '../services/api';
import RegularSwitch from './ui-kit/RegularSwitch';
import RegularDropdown from './ui-kit/RegularDropdown';

const BasicCalculator = (props) => {

  const [categories, setCategories] = useState([]);
  const [fields, setFields] = useState({});
  const [resultsElements, setResultsElements] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState();

  useEffect(() => {
    api.get("/ui/calc/element/active").then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setData(response.data);
      }
    }).catch((err) => {
      console.log(err);
    }
    );
  }, []);



  useEffect(() => {
    if (data) {
      setInitialFields();
      setInitialCategories();
      setComponents();
    }
  }, [data]);


  const setInitialFields = () => {
    const fieldsNames = data.categories.map((category) => {
      return category.elements.map((element) => element.field_id)
    });
    const newFields = {};

    fieldsNames.forEach((element) => {
      newFields[element] = null;
    });
    setFields(newFields);
  }

  const setInitialCategories = () => {
    const initialsCategories = data.categories.map((category) => {
      return { cgId: category.category_id, filled: false }
    })
    setCategories(initialsCategories)
  }

  const setComponents = () => {
    const innerCategories = data.categories.map((category) => {
      const innerElements = category.elements.map((element) => {
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
      })
      return handleCategory(category, innerElements)
    });
    setResultsElements(innerCategories);
  }



  const updateFieldsStates = (fieldId, newValue) => {
    setFields(prevState => {
      return {
        ...prevState,
        [fieldId]: newValue
      }
    });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const newStep = currentStep + 1
    const currentCategory = categories[currentStep - 1]
    currentCategory["filled"] = true
    let newCategories = categories
    newCategories[currentStep - 1] = currentCategory
    setCategories(newCategories);
    setCurrentStep(newStep);
  };

  const isHidden = (categoryId) => {
    if (categories[currentStep - 1]['cgId'] == categoryId) {
      return false
    }
    return true
  }

  const handleCategory = (category, innerElement) => {
    const hidden = isHidden(category.category_id);
    return (
      <Form className='calculator-category' key={nanoid()} id={category.category_id} hidden={hidden}>
        <h1>{category.category}</h1>
        {innerElement}
        <RegularButton
          text="Submit"
          onClick={handleNextStep}
        />
      </Form>
    )
  }

  const renderTooltip = (hint) => (
    <Tooltip id="hint-tooltip"  >
      {hint}
    </Tooltip>
  );

  const handleDropdown = (element) => {
    const fieldId = element.field_id;
    return (
      <RegularDropdown
        controlId={fieldId}
        label={element.field}
        value={fields[fieldId]}
        onChange={(e) => { e.preventDefault(); updateFieldsStates(fieldId, e.target.value) }}
        overlay={renderTooltip(element.comment)}
        innerData={element.options}
      />
    )
  };

  const handleInput = (element) => {
    const fieldId = element.field_id;
    return (
      <RegularInput
        controlId={fieldId}
        label={element.field}
        type={element.input_type ? element.input_type : "text"}
        value={fields[fieldId]}
        onChange={(e) => { e.preventDefault(); updateFieldsStates(fieldId, e.target.value) }}
        overlay={renderTooltip(element.comment)}
      />
    )
  };

  const handleCheckbox = (element) => {
    const fieldId = element.field_id;
    return (
      <RegularSwitch
        controlId={fieldId}
        label={element.field}
        value={fields[fieldId]}
        onChange={(e) => { e.preventDefault(); updateFieldsStates(fieldId, e.target.value) }}
        overlay={renderTooltip(element.comment)}
      />
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
      <ProgressBar range={data ? data.categories.length : 10} current={currentStep} />
      <div className='mb-4 '>
        <div >
          {resultsElements}
          <div className='calculator-control-block'>
            <p className='p-logo calculator-sign'>
              Нажимая на кнопку вы принимайте условия <a href="https://www.google.com/">пользовательского соглашения</a>
            </p>
            {/* <RegularButton
              text="Submit"
              onClick={(e) => { e.preventDefault(); console.log(e); console.log(fields) }}
            /> */}
          </div>
        </div>
      </div>

    </>
  );
};


export default BasicCalculator;