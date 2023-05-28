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

  function addSpansToPercentages(str) {
    const inputString = String(str);
    const regex = /(\d+)%/g;
    const parts = inputString.split(regex);

    return parts.map((part, index) => {
      if (part.match(regex)) {
        const percentage = part.match(/\d+/)[0];
        return <span className='insight-span' key={index}>{percentage}%</span>;
      } else {
        return part;
      }
    });
  }




  return (
    <div className='container'>
      <div className='report-page-container'>
        <aside className="aside-main">
          <h1 className='h1-report'>Результат расчёта</h1>
          {isLogedIn && insights ?
            <>
              <div className="insights">
                {Object.values(insights).map((element) => {
                  return (
                    <div class="card-insight" >
                      <img src="https://cdn.onlinewebfonts.com/svg/download_506219.png" class="img" alt="..." />
                      <p className='small'>{addSpansToPercentages(element["insight"])}</p>
                    </div>
                  )
                })}
              </div>

            </>

            : <></>}
        </aside>
        <div className="main-section">
          <Report isLogedIn={isLogedIn} reportId={reportId} />
        </div>
      </div>

      {isLogedIn && plots ?
        <>
          <br />
          <div className='report-plots-container'>
            <div className="plot">
              <h2 className='plot-header'>Распределение ваших инвестиций</h2>
              <PieChart data={plots.expenses_distribution} />
            </div>
            <div className="plot">
              <h2 className='plot-header'>Распределение налоговых систем в вашей отрасли</h2>
              <PieChart data={plots.taxes_distribution} />
            </div>
            <div className="plot">
              <h2 className='plot-header'>Динамика популярности по отраслям</h2>
              <LinearChart data={plots.popularity_chart} />
            </div>
          </div>

        </>
        : <></>}
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