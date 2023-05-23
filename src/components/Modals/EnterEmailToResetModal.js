import React, { useState } from "react";

import { Modal, Form, Button } from "react-bootstrap";

import api from "../../services/api";

import { ReactComponent as CloseButton } from "../../asserts/close_white.svg"
import Swal from "sweetalert2";
import RegularButton from "../RegularButton";
import RegularModalFormControl from "../RegularModalFormControl";

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
          if (res && res.status >= 200 && res.status < 300) {
            onHide();
            nextStep();
          }
        });

    } else {
      console.log("email", email)
      setErrors({ ...errors, email: "Неверный формат email" });
    }
  }

  return (<>
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>Сброс пароля</Modal.Title>
        <CloseButton onClick={onHide} className="close-btn-modal" />
      </Modal.Header>
      <Modal.Body>
        <Form >
          <RegularModalFormControl
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: "" }) }}
            label={"Email"}
            className={errors.email ? "is-invalid" : ""}
            errorHandler={errors.email}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer >
        <RegularButton onClick={handleSubmit} text="Войти" />
      </Modal.Footer>
    </Modal>
  </>);
};

export default EnterEmailToResetModal;