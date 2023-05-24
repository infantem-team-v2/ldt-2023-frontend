import React, { useState } from 'react';

import { Modal, Form, Button } from 'react-bootstrap';

import { ReactComponent as CloseButton } from "../../asserts/close_white.svg"
import Swal from "sweetalert2";

import RegularButton from "../ui-kit/RegularButton";
import RegularModalFormControl from "../ui-kit/RegularModalFormControl";

import api from '../../services/api';

const PasportResetModal = ({ show, onHide, nextStep }) => {

  const [emailCode, setEmailCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/auth/password/reset/validate', {
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
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header >
        <Modal.Title>Сброс пароля</Modal.Title>
        <CloseButton onClick={onHide} className='close-btn-modal' />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <RegularModalFormControl
            type='text'
            placeholder='Введите код'
            value={emailCode}
            onChange={(e) => setEmailCode(e.target.value)}
            renderInputError={<Form.Text className="text-muted">
              Введите код, который мы отправили на вашу почту
            </Form.Text>}
          />
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <RegularButton onClick={handleSubmit} className='regular-btn-modal' text='Подтвердить' />
      </Modal.Footer>
    </Modal >
  );
};

export default PasportResetModal;