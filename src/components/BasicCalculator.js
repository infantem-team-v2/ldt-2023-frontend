import React, { useState, useEffect } from 'react';
import { Tooltip, Form } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import RegularButton from './ui-kit/RegularButton';
import ProgressBar from './ui-kit/ProgressBar';
import RegularMultipleDropdown from './ui-kit/RegularMultipleDropdown';
import RegularCheckbox from './ui-kit/RegularCheckbox';
import RegularSwitch from './ui-kit/RegularSwitch';
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
    employees: undefined,
    district: undefined,
    area: undefined,
    construction_area: undefined,
    machines: [],
    machine_quantities: [],
    patent_activity: "Нет патента",
    accounting: false,
    tax_system: undefined,
    accounting_operations: 50,
    other_needs: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState();
  const [isDataLoading, setIsDataLoaded] = useState(true);


  const navigate = useNavigate();


  // getting initial data

  useEffect(() => {
    api.get("/ui/calc/element/active").then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setData(response.data);
      }
    }).catch((err) => { return err; });
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      setIsDataLoaded(false);
    }
  }, [data]);



  const handleNextStep = (e) => {
    e.preventDefault();
    const newStep = currentStep + 1
    if (newStep > 4) {
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
      {isDataLoading ? <>
        <div className='mb-4' hidden={data !== undefined}>
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
                innerData={["Производство хлебобулочных изделий", "Производство напитков", "Производство макаронных изделий"]}
                overlay={renderTooltip('Отрасль')}
                formLabel={"Отрасль"}
              />
              <RegularInput
                controlId='employees'
                label='Количество сотрудников'
                value={fields.employees ? fields.employees : ""}
                placeholder={"Введите количество сотрудников (чел)"}
                onChange={(e) => { setFields({ ...fields, employees: e.target.value }) }}
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
                value={fields.district}
                onChange={(e) => { setFields({ ...fields, district: e.target.value }) }}
                innerData={[
                  "Центральный",
                  "Северный",
                  "Северо-Восточный",
                  "Восточный",
                  "Юго-Восточный",
                  "Южный",
                  "Юго-Западный",
                  "Западный",
                  "Северо-Западный",
                  "Зеленоградский",
                  "Троицкий",
                  "Новомосковский",
                ]}
                overlay={renderTooltip('Административный округ')}
                formLabel={"Административный округ"}
              />
              <DistrictsMap choosenDistrict={fields.district} setChoosenDistrict={(value) => setFields({ ...fields, district: value })} />
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
                value={fields.area ? fields.area : ""}
                placeholder={"Введите площадь здания (м2)"}
                onChange={(e) => { setFields({ ...fields, area: e.target.value }) }}
                overlay={renderTooltip('')}
                formLabel={"Площадь здания"}
                className={"calculator-input"}
                type={"number"}
              />
              <RegularInput
                controlId='construction_area'
                label='Площадь застройки'
                value={fields.construction_area ? fields.construction_area : ""}
                placeholder={"Введите площадь застройки (м2)"}
                onChange={(e) => { setFields({ ...fields, construction_area: e.target.value }) }}
                overlay={renderTooltip('')}
                formLabel={"Площадь застройки"}
                className={"calculator-input"}
                type={"number"}
              />


              <RegularMultipleDropdown
                controlId='machines'
                label='Оборудование'
                selectedOptions={fields.machines}
                setSelectedOptions={(value) => setFields({ ...fields, machines: value })}
                innerData={[
                  "Системы теплоснабжения",
                  "Системы вентиляции",
                  "Системы кондиционирования",
                  "Системы водоснабжения",
                  "Системы канализации",
                  "Системы электроснабжения",
                  "Системы освещения",

                ]}
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
                innerData={["УСН6%", "УСН15%", "ОСНО"]}
                overlay={renderTooltip('Налоговая система')}
                formLabel={"Налоговая система"}
              />
              <RegularCheckbox
                controlId='accounting'
                label='Бухгалтерия'
                value={fields.accounting}
                onChange={(e) => { setFields({ ...fields, accounting: e.target.checked }) }}
                overlay={renderTooltip('Нужна ли вам бухгалтерия (да/нет)')}
                formLabel={"Бухгалтерия"}
              />
              <RegularSlider
                controlId='accounting-operations'
                label='Количество бухгалтерских операций'
                value={fields.accounting_operations}
                onChange={(e) => { setFields({ ...fields, accounting_operations: e.target.value }) }}
                overlay={renderTooltip('Количество бухгалтерских операций в месяц')}
                formLabel={"Количество бухгалтерских операций: "}
                hidden={(!fields.accounting)}
              />

              <RegularButton
                text={"Рассчитать инвестиции"}
                onClick={handleNextStep}
              />


            </div>
          </div>

        </div>

      </> : <div className="spinner-border text-primary" role="status" />}

    </>
  );
};

export default BasicCalculator;
