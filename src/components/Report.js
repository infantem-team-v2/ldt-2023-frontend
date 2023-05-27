import React, { useEffect, useState } from 'react';
import api from '../services/api';

import { nanoid } from 'nanoid';

import '../styles/Report.css';

const Report = ({ isLogedIn }) => {

  const [report, setReport] = useState();
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [error, setError] = useState(false);


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
      setTotalExpenses(report.output.total_expenses);
    }
  }




  return (<>
    <div className='report-container'>
      {error ? <div className="alert alert-danger data " role="alert">
        Произошла ошибка при загрузке отчета.Возможно такого отчёта не существует.
      </div> :
        isDataLoaded ?
          <>
            <h1>Общий размер инвестиций</h1>
            <h2>{totalExpenses}₽</h2>
            <hr />
            {
              Object.keys(report.output).map((category) => {
                const categoryData = report.output[category];
                return (
                  <div>
                    <h3 className='report-h3'>{category}</h3>
                    <div>
                      {Object.entries(categoryData).map((item) => {
                        return (
                          <div key={nanoid()} className='d-flex justify-content-between'>
                            <p>{item[0]}</p>
                            <p>{item[1]}₽</p>
                          </div>
                        )
                      })}
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