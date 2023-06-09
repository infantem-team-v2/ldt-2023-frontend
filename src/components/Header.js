import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as LogIn } from '../asserts/in.svg';
import { ReactComponent as LogOut } from '../asserts/out.svg';
import { ReactComponent as Documents } from '../asserts/documents.svg';
import { ReactComponent as Logo } from '../asserts/logo-big-normal.svg';

import RegularButton from "./ui-kit/RegularButton";
import '../styles/Header.css';

const Header = (props) => {
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const handleSelect = () => {
    setExpanded(!expanded);
  };

  const buttonBlock = () => {
    if (props.isLogedIn) {
      return (
        <>
          <Nav.Link onClick={props.logOut}><LogOut className='me-1' />Выйти</Nav.Link>
          <RegularButton onClick={() => navigate('/account')} text={<>Личный кабинет</>} className='header-reg-button' />
        </>
      )
    } else {
      return (
        <>
          <Nav.Link onClick={props.showSignInModal}><LogIn className='me-1' />Войти</Nav.Link>
          <RegularButton onClick={props.showSignUpModal} text={<>Зарегистрироваться</>} className='header-reg-button' />
        </>
      )
    }
  }

  return (
    <Navbar bg="white" expand="lg" className='sticky-top mt-0 header-navbar-el' expanded={expanded}>
      <a href="/documents" className='nav-link'><Documents className='me-1 ms-5' />Документы</a>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className='me-3' onClick={handleSelect} />
      <Navbar.Collapse id="basic-navbar-nav " className={expanded ? "ms-5" : "me-5"}>
        <Navbar.Brand href="#home" className='ms-auto me-auto'>
          <Logo className='img align-middle header-logo' onClick={() => navigate('/')} />
        </Navbar.Brand>
        <Nav onSelect={handleSelect} >
          <div className='header-control-block'>
            {buttonBlock()}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;