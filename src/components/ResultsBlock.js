import React, { useState, useEffect } from 'react';

import api from '../services/api';


const ResultsBlock = (props) => {

  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get('/results', {
      params: {
        page: 1,
        limit: 10
      }
    }).catch(err => { setError(true); console.log(err) }).then((res) => {
      setResults(res);
    });
  }, []);
  if (error) {
    return (<>
      <div className="alert alert-danger data m-3" role="alert">
        Произошла ошибка при загрузке результатов.
        Возможно вы не авторизованы?
      </div>
    </>)
  }
  return (<>
    <div></div>
  </>)
};

export default ResultsBlock;