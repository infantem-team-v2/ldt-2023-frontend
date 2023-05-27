import React, { useEffect, useState } from 'react';
import api from '../services/api';

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
      setTotalExpenses(report.total_expenses);
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
              report.output.map((category) => {
                return (
                  <div>
                    <h3>{category.name}</h3>
                    <ul>
                      {category.items.map((item) => {
                        return (
                          <li>
                            <span>{item.name}</span>
                            <span>{item.value}</span>
                          </li>
                        )
                      })}
                    </ul>
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