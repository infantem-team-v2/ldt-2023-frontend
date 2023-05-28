import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';

import { nanoid } from 'nanoid';

import '../styles/Report.css';
import api from '../services/api';

import RegularButton from './ui-kit/RegularButton';



const Report = ({ isLogedIn }) => {

  const [report, setReport] = useState();
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inputHidden, setInputHidden] = useState(true);

  const [step, setStep] = useState(1);


  const reportId = window.location.href.split('/')[4];


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get(`calc/report/${reportId}`);
      console.log(res);
      setReport(res.data);

    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    if (report) {
      handleData();
      setIsDataLoaded(true);
    }
  }, [report]);


  const handleData = () => {
    if (report && report.total_expenses) {
      setTotalExpenses(report.total_expenses);
    }
  }

  const convertText = (text) => {
    const newText = String(text);
    if (newText.includes('_')) {
      const words = newText.split('_').join(" ");
      const capitalizedWords = words.charAt(0).toUpperCase() + words.slice(1)
      return capitalizedWords
    } else {
      return newText.charAt(0).toUpperCase() + newText.slice(1);
    }
  }

  const convertInputText = (text) => {
    const isArray = Array.isArray(text);
    if (isArray) {
      return text.map((item) => { return <span>{item}<br /></span> });
    } else {
      const newText = String(text);
      if (newText === "true") return 'Да';
      if (newText === "false") return 'Нет';
      if (newText === 'null') return 'Не указано';
      if (newText.includes('_')) {
        const words = newText.split('_').join(" ");
        const capitalizedWords = words.charAt(0).toUpperCase() + words.slice(1)
        return capitalizedWords
      } else {
        return newText.charAt(0).toUpperCase() + newText.slice(1);
      }

    }
  }

  const convertString = (str) => {
    const newString = String(str);
    const formattedStr = newString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return formattedStr;
  };

  const handleHide = () => {
    setInputHidden(!inputHidden);
  };

  return (<>
    <div className='report-container'>
      {error ? <div className="alert alert-danger data " role="alert">
        Произошла ошибка при загрузке отчета.Возможно такого отчёта не существует.
      </div> :
        isDataLoaded ?
          <>
            <h2 className='report-h mb-1'>Общая информация</h2>
            <div onClick={handleHide} className='report-hide'>{inputHidden ? "Развернуть" : "Свернуть"}</div>
            <Collapse in={inputHidden}>
              <div>
                {
                  Object.entries(report.input).map((item) => {
                    return (
                      <div key={nanoid()} className='d-flex justify-content-between'>
                        <p>{convertText(item[0])}</p>
                        <p>{convertInputText(item[1])}</p>
                      </div>
                    )
                  })
                }
              </div>
            </Collapse>
            <h2 className='report-h mb-1'>Общий размер инвестиций</h2>
            <h2 className='report-h'>{convertString(totalExpenses)}₽</h2>
            <hr />
            {
              Object.keys(report.output).map((category, index) => {
                const categoryData = report.output[category];
                return (
                  <div hidden={index !== step - 1}>
                    <h3 className='report-h3'>{category}</h3>
                    <div>
                      {Object.entries(categoryData).map((item) => {
                        return (
                          <div key={nanoid()} className='d-flex justify-content-between'>
                            <p>{convertText(item[0])}</p>
                            <p>{convertText(item[1])}₽</p>
                          </div>
                        )
                      })}
                    </div>
                    <div className='report-control-block'>
                      <RegularButton
                        text='<'
                        onClick={() => { setStep(step - 1) }}
                        disabled={step === 1}
                        className={step === 1 ? ' disabled' : ''}
                      />
                      <RegularButton
                        text='>'
                        onClick={() => { setStep(step + 1) }}
                        disabled={step === Object.keys(report.output).length}
                        className={step === Object.keys(report.output).length ? ' disabled' : ''}
                      />
                    </div>
                  </div>
                )
              })
            }
          </>

          :
          <div className='mt-5 d-flex justify-content-center align-items-center' >
            <div className="spinner-border regular-spinner" role="status" />
          </div>
      }
    </div>
  </>

  );
};

export default Report;