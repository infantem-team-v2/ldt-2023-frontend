import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AdminForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // const response = await axios.post('http://localhost:3001/api/admin/', { login, password }, {
      //   withCredentials: true,
      // });
      console.log('response');
    } catch (error) {
      console.log('An error occurred while connecting to the server.', error);
    }
  };

  return (
    <div className='contaner-md position-absolute top-50 start-50 translate-middle w-25' >
      <Form
        onSubmit={handleSubmit}
        className='p-5 border border-primary rounded-3 shadow-lg bg-white'
      >
        <Form.Group controlId="login">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ввведите логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-3'>
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default AdminForm;
