import React, { useEffect, useState } from 'react';

import '../../styles/ReportPage.css'


import CopyToClipboardButton from '../ui-kit/CopyToClickboardButton';

import Report from '../Report';
import LinearChart from '../LinearChart';
import PieChart from '../PieChart';


import api from '../../services/api';

import { ReactComponent as MoneyIcon } from '../../asserts/money.svg';
import { ReactComponent as MapIcon } from '../../asserts/map.svg';
import { ReactComponent as NotebookIcon } from '../../asserts/notebook.svg';
import { ReactComponent as WorkerIcon } from '../../asserts/worker.svg';



const ReportPage = ({ isLogedIn, pdfLink }) => {

  const reportId = window.location.href.split('/')[4];

  const [link, setLink] = useState('');
  const [insights, setInsights] = useState();
  const [plots, setPlots] = useState();

  const insightsImagesSrc = {
    "best_tax_system_insight": <MoneyIcon className='insight-icon img' />,
    "usual_county_insight": <MapIcon className='insight-icon img' />,
    "usual_expenses_insight": <NotebookIcon className='insight-icon img' />,
    "workers_quantity_insight": <WorkerIcon className='insight-icon img' />,
  }


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
    const regex = /(\d+%)/g;
    const parts = inputString.split(regex);

    return (<>
      {parts.map((part, index) => {
        if (part.match(regex)) {
          const percentage = part.match(regex)[0];
          return <span className='insight-span' key={index}>{percentage}</span>
        } else {
          return part;
        }
      })}
    </>
    )
  }

  const isIncludeEmpty = (str) => {
    const toFind = "EMPTY";
    return str.includes(toFind);
  }



  return (
    <div className='container'>
      <div className='report-page-container'>
        <aside className="aside-main">
          <h1 className='h1-report'>Результат расчёта</h1>
          {isLogedIn && insights ?
            <>
              <div className="insights">
                {Object.entries(insights).map((element) => {
                  return (
                    <div class="card-insight" hidden={isIncludeEmpty(element[1]["insight"])}>
                      {insightsImagesSrc[String(element[0])]}
                      <p className='small'>{addSpansToPercentages(element[1]["insight"])}</p>
                    </div>
                  )
                })}
              </div>

            </>

            : <></>}
        </aside>
        <div className="main-section">
          <Report isLogedIn={isLogedIn} reportId={reportId} pdfLink={pdfLink} />
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