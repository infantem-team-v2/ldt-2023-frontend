import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Report = () => {

  const [report, setReport] = useState({});
  // const [totalExpenses, setTotalExpenses] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);


  const reportId = window.location.href.split('/')[4];


  useEffect(() => {
    api.post('/report', { report_id: reportId }).then((res) => {
      if (res && res.status >= 200 && res.status < 300) {
        if (res.data) {
          setReport(res.data);
          console.log(report);
        }
      }
    }).catch((err) => { })
  }, [report, reportId]);

  useEffect(() => {
    if (report) {
      setIsDataLoaded(true);
    }
  }, [report]);


  // const handleData = () => {
  //   if (report && report.total_expenses) {
  //     setTotalExpenses(report.total_expenses);
  //   }
  // }

  // const renderOutput = () => {
  //   if (report && report.output) {
  //     return report.output.map((category) => {
  //       return (
  //         <div>
  //           <h3>{category.name}</h3>
  //           <ul>
  //             {category.items.map((item) => {
  //               return (
  //                 <li>
  //                   <span>{item.name}</span>
  //                   <span>{item.value}</span>
  //                 </li>
  //               )
  //             })}
  //           </ul>
  //         </div>
  //       )
  //     });
  //   }
  //   return (<></>);
  // }


  return (<>
    {isDataLoaded ? <div className='container'>
      <h1>Report</h1>
    </div> :
      <div className='mt-5 d-flex justify-content-center align-items-center' >
        <div className="spinner-border regular-spinner" role="status" />
      </div>}
  </>

  );
};

export default Report;