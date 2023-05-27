import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { nanoid } from 'nanoid';

import { useNavigate } from 'react-router-dom';

import RegularButton from './ui-kit/RegularButton';
import ProgressBar from './ui-kit/ProgressBar';
import RegularInput from './ui-kit/RegularInput';
import RegularMultipleDropdown from './ui-kit/RegularMultipleDropdown';
import RegularCheckbox from './ui-kit/RegularCheckbox';
import RegularSwitch from './ui-kit/RegularSwitch';
import RegularDropdown from './ui-kit/RegularDropdown';

import '../styles/BasicCalculator.css';
import api from '../services/api';
import Swal from 'sweetalert2';
import HandleElementComponent from './HandleElementComponent';
import HandleCategoryComponent from './HandleCategoryComponent';


const BasicCalculator = () => {

  const [categories, setCategories] = useState([]);
  const [fields, setFields] = useState({});
  const [isCategories, setIsCategories] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState();


  const navigate = useNavigate();


  // getting initial data

  useEffect(() => {
    api.get("/ui/calc/element/active").then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setData(response.data);
      }
    }).catch((err) => { return err; });
  }, []);


  // firs render
  useEffect(() => {
    if (data) {
      setInitialCategories(data);
      setInitialFields(data);
    }
  }, [data]);

  // rerendering components
  useEffect(() => {
    if (data) {
      setIsCategories(true);
    }
  }, [currentStep, categories]);



  const setInitialCategories = (data) => {
    const initialsCategories = data.categories.map(category => category.category_id)
    setCategories(initialsCategories);
  }

  const setInitialFields = (data) => {
    const newFields = {};

    data.categories.forEach((category) => {
      category.elements.forEach((element) => {
        newFields[element.field_id] = undefined;
      })
    });

    setFields(newFields);
  }






  const updateFieldsStates = (fieldId, newValue) => {
    setFields(prevState => {
      return {
        ...prevState,
        [fieldId]: newValue
      }
    });
  };
  const updateFiedlsStatesBoolean = (fieldId) => {
    setFields(prevState => {
      return {
        ...prevState,
        [fieldId]: !prevState[fieldId]
      }
    });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const newStep = currentStep + 1
    if (newStep > categories.length) {
      let postedData = {};
      Object.keys(fields).forEach((key) => {
        if (fields[key] !== undefined) {
          postedData[key] = fields[key];
        } else {
          postedData[key] = null;
        }
      });
      api.post("/calc/base", postedData).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          const id = response.data.id ? response.data.id : '1';
          navigate(`/report/${id}`);
        }
      }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Что-то пошло не так!',
        })
      });
    } else {
      setCurrentStep(newStep);
    }

  };


  const isHidden = (categoryId) => {
    try {
      if (categories[currentStep - 1] === categoryId) {
        return false;
      }
      return true;
    } catch (err) {
      return true;
    }
  }

  // const handleInnerElements = (element) => {
  //   const type = element.type;
  //   switch (type) {
  //     case 'dropdown':
  //       return handleDropdown(element);
  //     case 'input':
  //       return handleInput(element);
  //     case "dropdown_multiselect":
  //       return handleDropdownMultiselect(element);
  //     case 'checkbox':
  //       return handleCheckbox(element);
  //     case 'range':
  //       return handleSlider(element);
  //     default:
  //       return null;
  //   }
  // }

  // const handleCategory = (category) => {
  //   const hidden = isHidden(category.category_id);
  //   if (hidden) {
  //     return (<div key={nanoid()}></div>);
  //   } else {
  //     return (
  //       <Form
  //         className='calculator-category'
  //         key={nanoid()}
  //         id={category.category_id}
  //       >
  //         <h2>{category.category}</h2>
  //         <div className='calculator-div-categories' key={nanoid()}>
  //           {category.elements.map((element) => handleInnerElements(element))}
  //         </div>

  //         <div className='calculator-control-block'>
  //           {currentStep === categories.length ? <p className='p-logo calculator-sign'>
  //             Нажимая на кнопку вы принимайте условия <a href="/documents">пользовательского соглашения</a>
  //           </p> : <></>}
  //           <RegularButton
  //             className='mt-2'
  //             text={currentStep === categories.length ? 'Получить результат' : 'Далее'}
  //             onClick={handleNextStep}
  //           />
  //         </div>
  //       </Form>
  //     );
  //   }
  // }


  // --------------------------------------------------
  // handlers for different types of elements
  // --------------------------------------------------

  const renderTooltip = (hint) => (
    <Tooltip id="hint-tooltip"  >
      {hint}
    </Tooltip>
  );

  // const handleDropdown = (element) => {
  //   const fieldId = element.field_id;
  //   return (
  //     <RegularDropdown
  //       controlId={fieldId}
  //       label={element.field}
  //       value={fields[fieldId]}
  //       onChange={(e) => { e.preventDefault(); updateFieldsStates(fieldId, e.target.value) }}
  //       overlay={renderTooltip(element.comment)}
  //       innerData={element.options}
  //     />
  //   )
  // };

  // const handleInput = (element) => {
  //   const fieldId = element.field_id;
  //   const type = element.options[0] ? element.options[0] : 'text';
  //   return (
  //     <RegularInput
  //       controlId={fieldId}
  //       label={element.field}
  //       type={type}
  //       value={fields[fieldId]}
  //       onChange={(e) => { updateFieldsStates(fieldId, e.target.value) }}
  //       overlay={renderTooltip(element.comment)}
  //     />
  //   )
  // };

  const handleCheckbox = (element) => {
    const fieldId = element.field_id;
    return (
      <RegularCheckbox
        controlId={fieldId}
        label={element.comment}
        formLabel={element.field}
        value={fields[fieldId]}
        onChange={() => { updateFiedlsStatesBoolean(fieldId) }}
        overlay={renderTooltip(element.comment)}
      />
    )
  };

  const handleSwitch = (element) => {
    const fieldId = element.field_id;
    return (
      <RegularSwitch
        controlId={fieldId}
        label={element.field}
        onChange={() => { updateFiedlsStatesBoolean(fieldId) }}
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
            onChange={(e) => { updateFieldsStates(fieldId, e.target.value) }}
          />
        </OverlayTrigger>
      </Form.Group>
    )
  };

  const handleDropdownMultiselect = (element) => {
    const fieldId = element.field_id;
    fields[fieldId] = fields[fieldId] ? fields[fieldId] : [];
    return (
      <RegularMultipleDropdown
        controlId={fieldId}
        label={element.field}
        selectedOptions={fields[fieldId]}
        setSelectedOptions={(values) => { updateFieldsStates(fieldId, values) }}
        overlay={renderTooltip(element.comment)}
        innerData={element.options}
      />
    )
  };

  // --------------------------------------------------

  return (
    <>
      <ProgressBar range={data ? data.categories.length : 6} current={currentStep} />
      <div className='mb-4 '>
        {isCategories ? data.categories.map((category) => (<HandleCategoryComponent
          handleNextStep={handleNextStep}
          currentStep={currentStep}
          categories={categories}
          category={category}
          fields={fields}
          isHidden={isHidden}
          renderTooltip={renderTooltip}
          updateFieldsStates={updateFieldsStates}
        />)) : <></>}
      </div>

    </>
  );
};


export default BasicCalculator;