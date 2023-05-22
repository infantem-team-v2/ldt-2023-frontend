import React, { useEffect } from 'react';

const Report = (props) => {

  useEffect(() => {
    console.log(props.id);
  }, []);


  return (
    <div>
      <h1>Report</h1>
    </div>
  );
};

export default Report;