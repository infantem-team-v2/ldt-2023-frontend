import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import Swal from 'sweetalert2';

import api from '../services/api';

const PasportResetModal = ({ show, onHide }) => {

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');

  const [errors, setErrors] = useState({});

  const validatePassword = () => {
    const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/;
    return passwordRegex.test(newPassword);
  }

  const validatePasswordRepeat = () => {
    return newPassword === newPasswordRepeat;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassword() && validatePasswordRepeat()) {
      api.post('/auth/password/reset', {
        password: newPassword,
        repeated_password: newPasswordRepeat
      }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Ошибка',
          text: err.message
        }).then((res) => {
          if (res && res.status >= 200 && res.status < 300) {
            onHide();
            Swal.fire({
              icon: 'success',
              title: 'Успех',
              text: 'Пароль успешно изменен'
            });
          }
        });
      });
    } else if (!validatePassword()) {
      setErrors({ ...errors, password: 'Пароль должен содержать минимум 8 символов, одну заглавную букву и одну цифру' });
      return;
    } else if (!validatePasswordRepeat()) {
      setErrors({ ...errors, repeatPassword: 'Пароли не совпадают' });
      return;
    }
  }

  // Error handling

  const renderErrors = (field) => {
    return errors[field] ? <div className="invalid-feedback">{errors[field]}</div> : null;
  }

  const renderClassName = (field) => {
    return errors[field] ? 'is-invalid' : '';
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Сброс пароля</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Введите новый пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Пароль"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setErrors({ ...errors, password: '' }) }}
                className={renderClassName('password')}
              />
              {renderErrors('password')}
            </Form.Group>
            <Form.Group className="mb-3" controlId="repeatPassword">
              <Form.Label>Повторите новый пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Пароль"
                value={newPasswordRepeat}
                onChange={(e) => { setNewPasswordRepeat(e.target.value); setErrors({ ...errors, repeatPassword: '' }) }}
                className={renderClassName('repeatPassword')}
              />
              {renderErrors('repeatPassword')}
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Подтвердить</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PasportResetModal;