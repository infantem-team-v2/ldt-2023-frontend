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
      <div className='d-flex justify-content-between mt-4'>
        <aside className="aside-main w-50">
          <h1 className='h1-report'>Результат расчёта</h1>
        </aside>
        <div className="main-section">
          <Report isLogedIn={isLogedIn} />
        </div>
      </div>
      <div className='d-flex justify-content-between mt-4 mb-4'>
        <aside className="aside-main w-50">
          <div className="">
            <p className='mb-0'>Сохраните ссылку:</p>
            <a href={link} className='d-flex fs-6 fw-light m-0 p-0 text-decoration-none'>{link.slice(7)} <CopyToClipboardButton text={link} /></a>

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