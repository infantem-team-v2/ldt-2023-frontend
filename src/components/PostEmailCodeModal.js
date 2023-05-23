import React, { useState } from 'react';

import { Modal, Form, Button } from 'react-bootstrap';

import Swal from 'sweetalert2';

import api from '../services/api';

const PasportResetModal = ({ show, onHide, nextStep }) => {

  const [emailCode, setEmailCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/auth/email/validate', {
      code: Number(emailCode),
    }).catch((err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Ошибка',
        text: err.message
      })
    }).then((res) => {
      if (res && res.status >= 200 && res.status < 300) {
        onHide();
        nextStep();
      }
    });
  }


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Сброс пароля</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmailCode">
            <Form.Label>Email код</Form.Label>
            <Form.Control
              type="text"
              placeholder="123456"
              minLength={6}
              maxLength={6}
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
            />
            {/* description to user */}
            <Form.Text className="text-muted">
              Введите код, который мы отправили на вашу почту
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit} className='mt-2'>Подтвердить</Button>
        </Form>

      </Modal.Body>
    </Modal>
  );
};

export default PasportResetModal;