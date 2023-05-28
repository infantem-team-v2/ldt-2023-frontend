import React, { useEffect, useState } from 'react';
import api from '../services/api';

import { nanoid } from 'nanoid';

import '../styles/Report.css';
import RegularButton from './ui-kit/RegularButton';

const Report = ({ isLogedIn }) => {

  const [report, setReport] = useState();
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [error, setError] = useState(false);

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

  function convertString(str) {
    const newString = String(str);
    const formattedStr = newString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return formattedStr;
  }



  return (<>
    <div className='report-container'>
      {error ? <div className="alert alert-danger data " role="alert">
        Произошла ошибка при загрузке отчета.Возможно такого отчёта не существует.
      </div> :
        isDataLoaded ?
          <>
            <h2 className='report-h mb-1'>Общая информация</h2>
            {
              Object.entries(report.input).map((item) => {
                return (
                  <div key={nanoid()} className='d-flex justify-content-between'>
                    <p>{convertText(item[0])}</p>
                    <p>{convertText(item[1])}₽</p>
                  </div>
                )
              })
            }
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