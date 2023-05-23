import React from "react";
import { Modal, Form } from "react-bootstrap";
import { useState } from "react";

import api from "../services/api";

import RegularModalFormControl from "./RegularModalFormControl";
import RegularButton from "./RegularButton";

import { ReactComponent as CloseButton } from "../asserts/close_white.svg";
import Swal from "sweetalert2";
import '../styles/SignInModal.css'

const SignInModal = ({ show, onHide, setIsLogedIn, forgetPass }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/auth/sign/in', {
      email: email,
      password: password
    }).catch((err) => {
      console.log(err);
      if (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Что-то пошло не так!',
        })
      }

    }).then((res) => {
      if (res && res.status >= 200 && res.status < 300) {
        Swal.fire({
          icon: 'success',
          text: 'Вы вошли в систему!',
        })
        setIsLogedIn();
      }
      onHide();
    })

  }

  return (
    <Modal show={show} onHide={onHide} className="sign-in-modal" centered >
      <Modal.Header >
        <Modal.Title>Авторизация</Modal.Title>
        <CloseButton onClick={onHide} className="close-btn-modal" />
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex gap-4">
          <RegularModalFormControl
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={"Email"}
            controlId={"email"}
          />
          <RegularModalFormControl
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={"Пароль"}
            controlId={"password"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer >
        <RegularButton className="btn btn-primary" onClick={handleSubmit} text="Войти" />
        <div className="sign-in-a " onClick={(e) => { onHide(); forgetPass() }}>Забыли пароль?</div>
      </Modal.Footer>
    </Modal>
  );
};
export default SignInModal;