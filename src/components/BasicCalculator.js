import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import RegularButton from './ui-kit/RegularButton';
import ProgressBar from './ui-kit/ProgressBar';
import RegularMultipleDropdown from './ui-kit/RegularMultipleDropdown';
import RegularCheckbox from './ui-kit/RegularCheckbox';
import RegularDropdown from './ui-kit/RegularDropdown';
import DistrictsMap from './DistrictsMap';

import '../styles/BasicCalculator.css';
import api from '../services/api';
import Swal from 'sweetalert2';
import RegularSlider from './ui-kit/RegularSlider';
import RegularInput from './ui-kit/RegularInput';


const BasicCalculator = () => {

  const [fields, setFields] = useState({
    organization_type: undefined,
    industry: undefined,
    workers_quantity: undefined,
    county: undefined,
    land_area: undefined,
    building_area: undefined,
    machine_names: [],
    machine_quantities: [],
    patent_type: "Нет патента",
    bookkeeping: false,
    tax_system: undefined,
    operations: undefined,
    other_needs: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [innerData, setInnerData] = useState({
    machine_names: [],
    industry: [],
    other_needs: [],
  });


  const navigate = useNavigate();


  // getting initial data

  useEffect(() => {
    api.get("/ui/calc/element").then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setInnerData(response.data.data);
      }
    }).catch((err) => { return err; });
  }, []);

  useEffect(() => {
    setIsDataLoaded(true);
  }, [innerData]);



  const handleNextStep = (e) => {
    e.preventDefault();
    const newStep = currentStep + 1
    if (newStep > 4) {
      console.log(fields)
      api.post("/calc/base", fields).then((response) => {
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





  // --------------------------------------------------
  // handlers for different types of elements
  // --------------------------------------------------

  const renderTooltip = (hint) => (
    <Tooltip id="hint-tooltip"  >
      {hint}
    </Tooltip>
  );




  return (
    <>

      <ProgressBar range={4} current={currentStep} />
      {isDataLoaded ? <>
        <div className='mb-4' >
          <div className='calculator-category-container' hidden={!(currentStep === 1)}>
            <h1 className='calculator-category-title'>Общее</h1>
            <div className='calculator-category-content'>
              <RegularDropdown
                controlId='organization_type'
                label='Тип организации'
                value={fields.organization_type}
                onChange={(e) => { setFields({ ...fields, organization_type: e.target.value }) }}
                innerData={["OOO", "ИП"]}
                overlay={renderTooltip('Тип организации')}
                formLabel={"Тип организации"}
              />
              <RegularDropdown
                controlId='industry'
                label='Отрасль'
                value={fields.industry}
                onChange={(e) => { setFields({ ...fields, industry: e.target.value }) }}
                innerData={innerData.industry}
                overlay={renderTooltip('Отрасль')}
                formLabel={"Отрасль"}
              />
              <RegularInput
                controlId='employees'
                label='Количество сотрудников'
                value={fields.workers_quantity ? fields.workers_quantity : ""}
                placeholder={"Введите количество сотрудников (чел)"}
                onChange={(e) => { setFields({ ...fields, workers_quantity: e.target.value }) }}
                overlay={renderTooltip('Количество сотрудников')}
                formLabel={"Количество сотрудников"}
                className={"calculator-input"}
              />

              <RegularButton
                text={"Далее"}
                onClick={handleNextStep}
                className="calculator-next-button"

              />
            </div>
          </div>
          <div className='calculator-category-container' hidden={!(currentStep === 2)}>
            <h1 className='calculator-category-title'>Территория</h1>
            <div className='calculator-category-content'>
              <RegularDropdown
                controlId='district'
                value={fields.county}
                onChange={(e) => { setFields({ ...fields, county: e.target.value }) }}
                innerData={[
                  "Центральный", "Северный", "Северо-Восточный", "Восточный",
                  "Юго-Восточный", "Южный", "Юго-Западный", "Западный",
                  "Северо-Западный", "Зеленоградский", "Троицкий", "Новомосковский",
                ]}
                overlay={renderTooltip('Вы можете выбрать округ из списка или кликнуть на карте')}
                formLabel={"Административный округ"}
              />
              <DistrictsMap choosenDistrict={fields.county} setChoosenDistrict={(value) => setFields({ ...fields, county: value })} />
              <RegularButton
                text={"Далее"}
                onClick={handleNextStep}
              />
            </div>
          </div>
          <div className='calculator-category-container' hidden={!(currentStep === 3)}>
            <h1 className='calculator-category-title'>Здание</h1>
            <div className='calculator-category-content'>
              <RegularInput
                controlId='building_area'
                label='Площадь здания'
                value={fields.land_area ? fields.land_area : ""}
                placeholder={"Введите площадь здания (м2)"}
                onChange={(e) => { setFields({ ...fields, land_area: e.target.value }) }}
                overlay={renderTooltip('')}
                formLabel={"Площадь здания"}
                className={"calculator-input"}
                type={"number"}
              />
              <RegularInput
                controlId='construction_area'
                label='Площадь застройки'
                value={fields.building_area ? fields.building_area : ""}
                placeholder={"Введите площадь застройки (м2)"}
                onChange={(e) => { setFields({ ...fields, building_area: e.target.value }) }}
                overlay={renderTooltip('')}
                formLabel={"Площадь застройки"}
                className={"calculator-input"}
                type={"number"}
              />


              <RegularMultipleDropdown
                controlId='machines'
                label='Оборудование'
                selectedOptions={fields.machine_names}
                setSelectedOptions={(value) => setFields({ ...fields, machine_names: value })}
                innerData={innerData.machine_names}
                overlay={renderTooltip('вы можете выбрать несколько вариантов оборудования')}
                formLabel={"Оборудование"}
              />
              <RegularMultipleDropdown
                controlId='other-needs'
                label='Иные потребности'
                selectedOptions={fields.other_needs}
                setSelectedOptions={(value) => setFields({ ...fields, other_needs: value })}
                innerData={[
                  "Системы теплоснабжения",
                  "Системы вентиляции",
                  "Системы кондиционирования",
                  "Системы водоснабжения",
                  "Системы канализации"]}
                overlay={renderTooltip('вы можете выбрать несколько дополнительных потребностей')}
                formLabel={"Иные потребности"}
              />
              <RegularButton
                text={"Далее"}
                onClick={handleNextStep}
              />
            </div>
          </div>
          <div className='calculator-category-container' hidden={!(currentStep === 4)}>
            <h1 className='calculator-category-title'>Отчисления</h1>
            <div className='calculator-category-content'>
              <RegularDropdown
                controlId='tax-system'
                label='Налоговая система'
                value={fields.tax_system}
                onChange={(e) => { setFields({ ...fields, tax_system: e.target.value }) }}
                innerData={['ОСН', 'УСН6%', 'УСН15%', 'ЕСНХ']}
                overlay={renderTooltip('Налоговая система')}
                formLabel={"Налоговая система"}
              />
              <RegularCheckbox
                controlId='accounting'
                label='Бухгалтерия'
                value={fields.bookkeeping}
                onChange={(e) => { setFields({ ...fields, bookkeeping: e.target.checked }) }}
                overlay={renderTooltip('Нужна ли вам бухгалтерия (да/нет)')}
                formLabel={"Бухгалтерия"}
              />
              <RegularSlider
                controlId='accounting-operations'
                label='Количество бухгалтерских операций'
                value={fields.operations}
                onChange={(e) => { setFields({ ...fields, operations: e.target.value }) }}
                overlay={renderTooltip('Количество бухгалтерских операций в месяц')}
                formLabel={"Количество бухгалтерских операций: "}
                hidden={(!fields.bookkeeping)}
              />

              <RegularButton
                text={"Рассчитать инвестиции"}
                onClick={handleNextStep}
              />


            </div>
          </div>

        </div>

      </> : <div className='mt-5 d-flex justify-content-center align-items-center' >
        <div className="spinner-border regular-spinner" role="status" />
      </div>}

    </>
  );
};

export default BasicCalculator;
