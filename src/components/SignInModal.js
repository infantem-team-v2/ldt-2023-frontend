import React from "react";
import { Modal, Form } from "react-bootstrap";
import { useState } from "react";

import api from "../services/api";

import Swal from "sweetalert2";

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
      if (res && res.status === 200) {
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
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Авторизация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={handleSubmit}>Войти</button>
        {/* forget password */}
        <div className="sign-in-a " style={{
          'color': "var(--main-acsent)",
          'cursor': 'pointer',
        }} onClick={(e) => { onHide(); forgetPass() }}>Забыли пароль?</div>
      </Modal.Footer>
    </Modal>
  );
};
export default SignInModal;