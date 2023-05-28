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
      setInsights(res.data);
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
                return (
                  <div class="card-insight" >
                    <img src="https://cdn.onlinewebfonts.com/svg/download_506219.png" class="img" alt="..." />
                    <p className='small'>{element["insight"]}</p>
                  </div>
                )
              })}
            </div>
            : <></>}
        </aside>
        <div className="main-section">
          <Report isLogedIn={isLogedIn} reportId={reportId} />
        </div>
      </div>
      <div className='report-plots-container'>
        {isLogedIn && plots ?
          <>
            <div className="plot">
              <PieChart data={plots.taxed_distribution} />
            </div>
            <div className="plot">
              <PieChart data={plots.expenses_distribution} />
            </div>
            <div className="plot">
              <LinearChart data={plots.popularity_chart} />
            </div>
          </>
          : <></>}
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