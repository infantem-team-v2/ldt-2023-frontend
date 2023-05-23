import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


import '../styles/ReportPage.css'

import Report from './Report';
import CopyToClipboardButton from './CopyToClickboardButton';

const ReportPage = (props) => {
  const { id } = useParams();

  const [link, setLink] = useState('');

  useEffect(() => {
    // Extracting the whole link
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
          <Report id={id} />
        </div>
      </div>
      <div className='d-flex justify-content-between mt-4 mb-4'>
        <aside className="aside-main w-50">
          <div className="d-flex">
            <p>Сохраните ссылку: <a href={link}>{link}</a></p>
            <CopyToClipboardButton text={link} />
          </div>

        </aside>
        <div className="main-footer-section">
          <p>Зарегистрируйтесь чтобы получить более надежную и полную метрику</p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;