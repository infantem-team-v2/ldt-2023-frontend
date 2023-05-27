import React, { useState, useEffect } from 'react';

import api from '../services/api';


const ResultsBlock = (props) => {

  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);


  useEffect(() => {
    api.get('/account/results', {
    }).catch(err => {
      setError(true);
    }).then((res) => {
      if (res && res.status >= 200 && res.status < 300) {
        if (res.data.results) {
          setResults(res.data.results);

        }
      }

    });
  }, []);

  useEffect(() => {
    if (results) {
      setIsDataLoaded(true);
    }
  }, [results]);

  const renderComponent = () => {
    if (results && results.length > 0) {
      return results.map((result) => {
        return (
          <div className="card bg-dark card-result-block" >
            <div className="card-body">
              <h5 className="card-title text-white">{result.name.slice(0, 10)}<span></span></h5>
              <h6 className="card-subtitle mb-2 text-muted">Сумма инвестиции: {result.summary}₽</h6>
              <p className="card-text text-muted">Дата: {result.time_stamp.slice(0, 10)}</p>
              <a href={"/report/" + result.report_id} className="card-link">Подробнее</a>
            </div>
          </div>
        )
      })
    }
    return (<></>);
  }


  if (error) {
    return (<>
      <div className="alert alert-danger data " role="alert">
        Произошла ошибка при загрузке результатов.
        Возможно вы не авторизованы?
      </div>
    </>)
  }
  return (<>
    {isDataLoaded ?
      <div className='card-container'>
        {renderComponent()}
      </div> : <div className='mt-5 d-flex justify-content-center align-items-center' >
        <div className="spinner-border regular-spinner" role="status" />
      </div>}
  </>)
};

export default ResultsBlock;