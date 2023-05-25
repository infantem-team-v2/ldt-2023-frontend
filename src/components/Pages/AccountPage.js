import React, { useState } from 'react';

import '../../styles/AccountPage.css';

import ResultsBlock from '../ResultsBlock';
import UserDataBlock from '../UserDataBlock';

const AccountPage = () => {
  const [currentBlock, setCurrentBlock] = useState('data');

  return (
    <div className='container main-account-block'>
      <div className='account-control-block '>
        <p className={currentBlock === 'data' ? 'ac-active' : ''} onClick={() => { setCurrentBlock('data') }}>Данные</p>
        <p className={currentBlock === 'results' ? 'ac-active' : ''} onClick={() => { setCurrentBlock('results') }}>Результаты</p>
      </div>
      <div className='div-account'>
        <h1 className='text-white account-header'>Личный кабинет</h1>
        {currentBlock === 'data' ? <UserDataBlock /> : <ResultsBlock />}
      </div>
    </div>
  );
};

export default AccountPage;