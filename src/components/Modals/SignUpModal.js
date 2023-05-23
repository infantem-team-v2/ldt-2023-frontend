import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

import api from '../../services/api';

import RegularModalFormControl from '../RegularModalFormControl';
import RegularButton from '../RegularButton';
import ProgressBarModal from '../ProgressBarModal';

import '../../styles/SignUpModal.css'

import { ReactComponent as CloseButton } from '../../asserts/close_white.svg';
import Swal from 'sweetalert2';

const SignUpModal = ({ show, onHide, setIsLogedIn }) => {
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
  const [economicActivity, setEconomicActivity] = useState('');

  const [formErrors, setFormErrors] = useState({});

  // Validation
  // -----------------------------

  const validateEmail = (email) => {
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

  // -----------------------------

  const handleNext = (e) => {
    e.preventDefault();
    setFormErrors({});
    if (step === 1 && (!name || !surname)) {
      if (!name) {
        setFormErrors({ ...formErrors, name: 'Пожалуйста, введите имя' });
        return;
      } else if (!surname) {
        setFormErrors({ ...formErrors, surname: 'Пожалуйста, введите фамилию' });
        return;
      }

    }
    if (step === 2 && (!validateEmail(email) || !validatePassword(password) || !validateRepitedPassword(repitedPassword))) {
      if (!validateEmail(email)) {
        setFormErrors({ ...formErrors, email: 'Пожалуйста, введите корректный email' });
        return;
      } else if (!validatePassword(password)) {
        setFormErrors({ ...formErrors, password: 'Пароль должен содержать не менее 8 символов, включая цифры, заглавные и строчные буквы' });
        return;
      } else if (!validateRepitedPassword(repitedPassword)) {
        setFormErrors({ ...formErrors, repitedPassword: 'Пароли не совпадают' });
        return;
      }

    }
    if (step === 3 && (!inn || !(inn.length === 10 || inn.length === 12))) {
      setFormErrors({ ...formErrors, inn: 'Пожалуйста, введите корректный ИНН' });
      return;
    }
    setStep(step + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };


  // Error handling
  // -----------------------------

  const renderInputErrorClass = (field) => {
    return formErrors[field] ? 'is-invalid' : '';
  }

  const renderInputError = (field) => {
    return formErrors[field] ? <div className="invalid-feedback">{formErrors[field]}</div> : null;
  }

  // -----------------------------



  const handleSubmit = () => {
    api.post('/auth/sign/up',
      {
        "auth_data": {
          email: email,
          password: password,
          "repeated_password": repitedPassword
        },
        "business_data": {
          "economic_activity": economicActivity,
          inn: inn,
          "name": organization,
          "website": siteLink
        },
        "personal_data": {
          "full_name": name + ' ' + surname + ' ' + fathername,
          "geographic": {
            city: city,
            country: country
          },
          position: position
        }
      }
    ).catch((err) => {
      console.log(err)
      if (err) {
        Swal.fire({
          icon: 'error',
          text: 'Что-то пошло не так, попробуйте еще раз',
        })
      }
    }
    ).then((response) => {
      if (response) {
        Swal.fire({
          icon: 'success',
          text: 'Вы успешно зарегистрировались!',
        })
        setIsLogedIn();
      }

      onHide();
    });
  };

  const submitButtons = (isOdd = false) => {

    if (step === 1) return (
      <RegularButton
        onClick={handleNext}
        text="Далее"
        className="next-button-sign-up"
      />
    )

    {
      if (step > 1 && step < 4) {
        const buttons = (<>
          <RegularButton
            onClick={handlePrevious}
            text="Вернуться"
          />
          <RegularButton
            onClick={handleNext}
            text="Далее"
          />
        </>)

        if (!isOdd) {
          return buttons;
        }
        return (<div className='sign-up-form mt-3'>{buttons}</div>)
      }

    }
    {
      if (step === 4) {
        const buttons4 = (<>
          <>
            <RegularButton
              onClick={handlePrevious}
              text="Вернуться"
            />
            <RegularButton
              onClick={handleSubmit}
              text="Зарегистрироваться"
            />

          </>
        </>)
        if (!isOdd) {
          return buttons4;
        }
        return (<div className='sign-up-form mt-3'>{buttons4}</div>)
      }
    }
  }

  const required = <span className="text-danger">*</span>;

  return (
    <Modal show={show} onHide={onHide} className="sign-in-modal" centered size='lg'>
      <Modal.Header>
        <Modal.Title>Регистрация</Modal.Title>
        <div className='control-sign-up'>
          <CloseButton onClick={onHide} className="close-btn-modal" />
          <ProgressBarModal range={4} current={step} />
        </div>
      </Modal.Header>

      <Modal.Body>
        {step === 1 && (
          <Form className='sign-up-form'>
            <RegularModalFormControl
              label={<>Имя {required}</>}
              controlId={"name"}
              type={"text"}
              placeholder={"Введите ваше имя"}
              value={name}
              onChange={(e) => { setName(e.target.value); setFormErrors({ ...formErrors, name: '' }) }}
              className={renderInputErrorClass('name')}
              renderInputError={renderInputError('name')}
            />
            <RegularModalFormControl
              label={<>Фамилия {required}</>}
              controlId={"surname"}
              type={"text"}
              placeholder={"Введите вашу фамилию"}
              value={surname}
              onChange={(e) => { setSurname(e.target.value); setFormErrors({ ...formErrors, surname: '' }) }}
              className={renderInputErrorClass('surname')}
              renderInputError={renderInputError('surname')}
            />
            <RegularModalFormControl
              label={"Отчество"}
              controlId={"fathername"}
              type={"text"}
              placeholder={"Введите ваше отчество"}
              value={fathername}
              onChange={(e) => setFathername(e.target.value)}
            />
            {submitButtons()}
          </Form>
        )}
        {step === 2 && (
          <>
            <Form className='sign-up-form'>
              <RegularModalFormControl
                label={<>Email {required}</>}
                controlId={"email"}
                type={"email"}
                placeholder={"Введите ваш email"}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFormErrors({ ...formErrors, email: '' }) }}
                className={renderInputErrorClass('email')}
                renderInputError={renderInputError('email')}
              />
              <RegularModalFormControl
                label={<>Пароль {required}</>}
                controlId={"password"}
                type={"password"}
                placeholder={"Введите ваш пароль"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setFormErrors({ ...formErrors, password: '' }) }}
                className={renderInputErrorClass('password')}
                renderInputError={renderInputError('password')}
              />
              <RegularModalFormControl
                label={<>Повторите пароль {required}</>}
                controlId={"repitedPassword"}
                type={"password"}
                placeholder={"Повторите ваш пароль"}
                value={repitedPassword}
                onChange={(e) => { setRepitedPassword(e.target.value); setFormErrors({ ...formErrors, repitedPassword: '' }) }}
                className={renderInputErrorClass('repitedPassword')}
                renderInputError={renderInputError('repitedPassword')}
              />

            </Form>
            {submitButtons(true)}
          </>
        )}
        {step === 3 && (
          <>
            <Form className='sign-up-form'>
              <RegularModalFormControl
                label='Название организации'
                controlId={"organization"}
                type={"text"}
                placeholder={"Введите название вашей организации"}
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
              <RegularModalFormControl
                label={<>ИНН {required}</>}
                controlId={"inn"}
                type={"number"}
                placeholder={"Введите ваш ИНН"}
                value={inn}
                onChange={(e) => { setInn(e.target.value); setFormErrors({ ...formErrors, inn: '' }) }}
                className={renderInputErrorClass('inn')}
                renderInputError={renderInputError('inn')}
              />
              <RegularModalFormControl
                label={"Вид деятельности"}
                controlId={"economicActivity"}
                type={"text"}
                placeholder={"Введите вид деятельности"}
                value={economicActivity}
                onChange={(e) => setEconomicActivity(e.target.value)}
              />
              <RegularModalFormControl
                label={"Ccылка на веб-сайт организации"}
                controlId={"siteLink"}
                type={"text"}
                placeholder={"Введите ссылку на веб-сайт"}
                value={siteLink}
                onChange={(e) => setSiteLink(e.target.value)}
              />

            </Form>
            {submitButtons(true)}
          </>
        )}
        {step === 4 && (
          <>
            <Form className='sign-up-form'>
              <RegularModalFormControl
                label={"Страна"}
                controlId={"country"}
                type={"text"}
                placeholder={"Введите страну"}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <RegularModalFormControl
                label={"Город"}
                controlId={"city"}
                type={"text"}
                placeholder={"Введите город"}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <RegularModalFormControl
                label={"Должность"}
                controlId={"position"}
                type={"text"}
                placeholder={"Введите должность"}
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />

            </Form>
            {submitButtons(true)}
          </>

        )}

      </Modal.Body>
      <Modal.Footer className='footer-sign-up'>

      </Modal.Footer>
    </Modal>

  );
};

export default SignUpModal;