import React, { useEffect, useState } from 'react';

import '../../styles/ReportPage.css'


import CopyToClipboardButton from '../ui-kit/CopyToClickboardButton';

import Report from '../Report';
import LinearChart from '../LinearChart';
import PieChart from '../PieChart';


import api from '../../services/api';


const ReportPage = ({ isLogedIn }) => {

  const reportId = window.location.href.split('/')[4];

  const [link, setLink] = useState('');
  const [insights, setInsights] = useState();
  const [plots, setPlots] = useState();

  useEffect(() => {
    const link = window.location.href;
    setLink(link);
    getInsights();
    getPlots();
  }, []);

  const getInsights = async () => {
    try {
      const res = await api.get(`calc/insights/${reportId}`);
      console.log(res.data);
      setInsights(res.data.insights);
    } catch (err) {
      return;
    }
  };

  const getPlots = async () => {
    try {
      const res = await api.get(`calc/plots/${reportId}`);
      console.log(res.data);
      setPlots(res.data);
    } catch (err) {
      return;
    }
  };




  return (
    <div className='container'>
      <div className='report-page-container'>
        <aside className="aside-main">
          <h1 className='h1-report'>Результат расчёта</h1>
          {isLogedIn && insights ?
            <div className="insights">
              {Object.values(insights).map((element) => {
                console.log(element);
                return (
                  <div className="insight d-flex">
                    <img className='img img-thumbnail' src='https://placehold.co/150' alt="" />
                    <p className='fs-6 fw-light'>{Object.values(element)[0]}</p>
                  </div>
                )
              })}
            </div>
            : <></>}
          {isLogedIn && plots ?
            <div className="plots">
              <LinearChart data={plots.popularity_chart} />
            </div>
            : <></>}
        </aside>
        <div className="main-section">
          <Report isLogedIn={isLogedIn} reportId={reportId} />
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