import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { ReactComponent as CloseButton } from "../../asserts/close_white.svg"
import Swal from "sweetalert2";

import RegularButton from "../ui-kit/RegularButton";
import RegularModalFormControl from "../ui-kit/RegularModalFormControl";
import api from '../../services/api';

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
        })
        onHide();
      }).then((res) => {
        if (res && res.status >= 200 && res.status < 300) {
          onHide();
          Swal.fire({
            icon: 'success',
            title: 'Успех',
            text: 'Пароль успешно изменен'
          });
        }
      });;
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
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header >
          <Modal.Title>Сброс пароля</Modal.Title>
          <CloseButton onClick={onHide} className="close-btn-modal" />
        </Modal.Header>
        <Modal.Body>
          <Form>
            <RegularModalFormControl
              type="password"
              placeholder="Пароль"
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value); setErrors({ ...errors, password: '' }) }}
              className={renderClassName('password')}
              label="Введите новый пароль"
              renderInputError={renderErrors('password')}
            />
            <RegularModalFormControl
              type="password"
              placeholder="Повторите пароль"
              value={newPasswordRepeat}
              onChange={(e) => { setNewPasswordRepeat(e.target.value); setErrors({ ...errors, repeatPassword: '' }) }}
              className={renderClassName('repeatPassword')}
              label="Повторите новый пароль"
              renderInputError={renderErrors('repeatPassword')}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <RegularButton onClick={handleSubmit} text="Подтвердить" />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PasportResetModal;