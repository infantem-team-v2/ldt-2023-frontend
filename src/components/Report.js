import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Report = (props) => {

  const [report, setReport] = useState({});
  const reportId = window.location.href.split('/')[4];
  console.log(reportId);

  useEffect(() => {
    api.post('/report', { report_id: reportId }).then((res) => { }).catch((err) => { })
  }, []);


  return (
    <div>
      <h1>Report</h1>
    </div>
  );
};

export default Report;