import React, { useEffect, useState } from 'react';


import '../../styles/ReportPage.css'

import Report from '../Report';
import CopyToClipboardButton from '../ui-kit/CopyToClickboardButton';


const ReportPage = ({ isLogedIn }) => {

  const [link, setLink] = useState('');

  useEffect(() => {
    const link = window.location.href;
    setLink(link);
  }, []);


  return (
    <div className='container'>
      <div className='report-page-container'>
        <aside className="aside-main">
          <h1 className='h1-report'>Результат расчёта</h1>
        </aside>
        <div className="main-section">
          <Report isLogedIn={isLogedIn} />
        </div>
      </div>
      <div className='report-page-additional'>
        <aside className="aside-main">
          <div className="">
            <p className='mb-0'>Сохраните ссылку:</p>
            <div className='d-flex'>
              <a href={link} className='fs-6 fw-light m-0 p-0 text-decoration-none'>{link.slice(8)}</a>
              <CopyToClipboardButton text={link} />
            </div>


          </div>

        </aside>
        <div className="main-footer-section" hidden={isLogedIn}>
          <p>Зарегистрируйтесь чтобы получить более надежную и полную метрику</p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;