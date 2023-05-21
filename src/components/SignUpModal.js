import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import api from '../services/api';

const SignUpModal = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [fathername, setFathername] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [inn, setInn] = useState('');
  const [siteLink, setSiteLink] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [repitedPassword, setRepitedPassword] = useState('');

  const handleInputError = (field) => {
    return field ? '' : 'is-invalid';
  }
  const inputClass = (field) => {
    return handleInputError(field) ? 'is-invalid' : '';
  };

  const renderInputError = (field) => {
    if (handleInputError(field)) {
      return (
        <div className="invalid-feedback">
          Пожалуйста, введите корректное {field}.
        </div>
      );
    }
    return null;
  };

  const validateEmail = (email) => {
    console.log(email);
    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
  }

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(password);
  }
  const validateRepitedPassword = (repitedPassword) => {
    return repitedPassword === password;
  }

  const handleNext = () => {
    if (step === 1 && (!name || !surname)) {
      alert('Please fill in all required fields.');
      return;
    }
    if (step === 2 && (!validateEmail(email) || !validatePassword(password) || !validateRepitedPassword(repitedPassword))) {
      alert('Please enter your email.');
      return;
    }
    if (step === 3 && (!inn || !(inn.length === 10 || inn.length === 12))) {
      alert('Please fill in all required fields.');
      return;
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  // const handleSkip = () => {
  //   setStep(step + 1);
  // };

  const handleSubmit = () => {
    // Perform submission logic here
    alert('Form submitted successfully!');
    onHide();
  };

  const required = <span className="text-danger">*</span>;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Регистрация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Имя {required}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass(name)}
              />
              {renderInputError(name)}
            </Form.Group>
            <Form.Group controlId="surname">
              <Form.Label>Фамилия {required}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите вашу фамилию"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="fathername">
              <Form.Label>Отчество </Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите ваше отчество"
                value={fathername}
                onChange={(e) => setFathername(e.target.value)}
                required={false}
              />
            </Form.Group>
          </Form>
        )}
        {step === 2 && (
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email {required}</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass(email)}
              />
              {renderInputError('email')}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Пароль {required}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="repitedPassword">
              <Form.Label>Повторите пароль {required}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Повторите ваш пароль"
                value={repitedPassword}
                onChange={(e) => setRepitedPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        )}
        {step === 3 && (
          <Form>
            <Form.Group controlId="organization">
              <Form.Label>Наименование организации</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="inn">
              <Form.Label>ИНН {required}</Form.Label>
              <Form.Control
                type="number"
                minLength={10}
                maxLength={12}
                placeholder="Введите ваш ИНН"
                value={inn}
                onChange={(e) => setInn(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="siteLink">
              <Form.Label>Ссылка на веб-сайт организации</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите ссылку на веб-сайт организации"
                value={siteLink}
                onChange={(e) => setSiteLink(e.target.value)}
              />
            </Form.Group>
          </Form>
        )}
        {step === 4 && (
          <Form>
            <Form.Group controlId="country">
              <Form.Label>Страна</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите страну"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>Город</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите город"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="position">
              <Form.Label>Должность</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите должность"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Form.Group>
          </Form>
        )}

      </Modal.Body>
      <Modal.Footer>
        {step > 1 && step < 3 && (
          <Button variant="secondary" onClick={handlePrevious}>
            Вернуться
          </Button>
        )}
        {step < 4 && (
          <>
            <Button variant="primary" onClick={handleNext}>
              Далее
            </Button>
          </>
        )}
        {step === 4 && (
          <>
            <Button variant="secondary" onClick={handlePrevious}>
              Вернуться
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Зарегистрироваться
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpModal;




