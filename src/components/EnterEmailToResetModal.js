import React, { useState } from "react";

import { Modal, Form, Button } from "react-bootstrap";

import api from "../services/api";

import Swal from "sweetalert2";

const EnterEmailToResetModal = ({ show, onHide, nextStep }) => {

  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      api
        .patch("/auth/password/reset/prepare", {
          email: email,
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Ошибка",
            text: err.message,
          });
        })
        .then((res) => {
          if (res && res.status === 200) {
            onHide();
            nextStep();
          }
        });

    } else {
      setErrors({ ...errors, email: "Неверный формат email" });
    }
  }

  return (<>
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Сброс пароля</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: "" }) }}
              isInvalid={errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
        <Button variant="primary" type="submit" onClick={handleSubmit} className='mt-2'>Подтвердить</Button>
      </Modal.Body>
    </Modal>
  </>);
};

export default EnterEmailToResetModal;