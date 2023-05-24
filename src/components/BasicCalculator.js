import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { nanoid } from 'nanoid';

import { Navigate } from 'react-router-dom';

import RegularButton from './ui-kit/RegularButton';
import ProgressBar from './ui-kit/ProgressBar';
import RegularInput from './ui-kit/RegularInput';

import '../styles/BasicCalculator.css';
import api from '../services/api';
import RegularSwitch from './ui-kit/RegularSwitch';
import RegularDropdown from './ui-kit/RegularDropdown';
import Swal from 'sweetalert2';

const BasicCalculator = (props) => {

  const [categories, setCategories] = useState([]);
  const [fields, setFields] = useState({});
  const [resultsElements, setResultsElements] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState();
  const [isAnimating, setIsAnimating] = useState(false);

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

  useEffect(() => {
    if (data) {
      console.log("1C", categories)
      console.log("1F", fields)
      console.log('rerender')
      setComponents();
      console.log("2C", categories)
      console.log("2F", fields)
    }
  }, [categories]);


  const setInitialFields = () => {
    const fieldsNames = data.categories.map((category) => {
      return category.elements.map((element) => element.field_id)
    });
    const newFields = {};

    fieldsNames.forEach((element) => {
      newFields[element] = undefined;
    });
    setFields(newFields);
  }

  const setInitialCategories = () => {
    const initialsCategories = data.categories.map((category) => {
      return { cgId: category.category_id, filled: false }
    })
    setCategories(initialsCategories);
  }

  const setComponents = () => {
    const innerCategories = data.categories.map((category) => {
      return handleCategory(category)
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
    setCategories({ ...newCategories });
    if (newStep > categories.length || newStep > 4) {
      const postedData = {}
      api.post("/calc/base", postedData).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          <Navigate to={"/report" + (response.data.id ? response.data.id : 1)} replace={true} />
        }
      }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Что-то пошло не так!',
        })
      });
      return
    } else {
      setCurrentStep(newStep);
    }

  };


  const isHidden = (categoryId) => {
    try {
      if (categories[currentStep - 1]['cgId'] == categoryId) {
        return false
      }
      return true
    } catch (err) {
      return true
    }
  }

  const handleCategory = (category) => {
    const hidden = isHidden(category.category_id)
    if (hidden) {
      return <div key={nanoid()}></div>
    }
    return (
      <Form
        className={'calculator-category animated-div' + (isAnimating ? 'animate' : "")}
        key={nanoid()} id={category.category_id} hidden={hidden}>
        <Form.Label>{category.category}</Form.Label>
        <div className='d-flex gap-3' key={nanoid()}>
          {category.elements.map((element) => {
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
        </div>

        <div className='calculator-control-block'>
          {currentStep === categories.length ? <p className='p-logo calculator-sign'>
            Нажимая на кнопку вы принимайте условия <a href="https://www.google.com/">пользовательского соглашения</a>
          </p> : <></>}
          <RegularButton
            text="Submit"
            onClick={handleNextStep}
          />
        </div>
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
        <OverlayTrigger placement="top" overlay={renderTooltip(element.comment)} key={nanoid()}>
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
        <OverlayTrigger placement="top" overlay={renderTooltip(element.comment)} key={nanoid()}>
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
        {resultsElements}
      </div>

    </>
  );
};


export default BasicCalculator;