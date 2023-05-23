import React, { useState } from 'react';

import '../../styles/AccountPage.css';

import ResultsBlock from '../ResultsBlock';

const AccountPage = (props) => {
  const [currentBlock, setCurrentBlock] = useState('data');

  return (
    <div className='container main-account-block'>
      <div className='account-control-block '>
        <p className={currentBlock === 'data' ? 'active' : ''} onClick={() => { setCurrentBlock('data') }}>Данные</p>
        <p className={currentBlock === 'results' ? 'active' : ''} onClick={() => { setCurrentBlock('results') }}>Результаты</p>
      </div>
      <div className='div-account '>
        <h1 className='text-white account-header'>Личный кабинет</h1>
        {currentBlock === 'data' ? <div className='account-data-block'></div> : <ResultsBlock />}
      </div>
    </div>
  );
};

export default AccountPage;