import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const BasicCalculator = () => {
  const [fields, setFields] = useState({});

  useEffect(() => {
    axios.get('').then((response) => {
      setFields(response.data);
    })
      .catch((error) => { console.log(error) });
  }, []);


  return (
    <div className="container">
      <h1>Basic Calculator</h1>
      <Form>
        <Form.Group controlId="basicCalculator">
          <Form.Label>Basic Calculator</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of devises"
            value={fields.name}
            onChange={(e) => setFields({ ...fields, name: e.target.value })}
            capture="name"
            className='m-3'
          />
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Check this switch"
          />

        </Form.Group>
      </Form>
    </div>
  );
};

export default BasicCalculator;
