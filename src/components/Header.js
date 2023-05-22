import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../asserts/logo.jpg'
import { ReactComponent as HeartLogo } from '../asserts/heart_logo.svg';

import '../styles/Header.css';

const Header = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleSelect = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar bg="white" expand="lg" className='sticky-top mt-3' expanded={expanded}>
      <a href="https://vk.com/prettydelivery" className='nav-link'><HeartLogo className='me-1 ms-5' />документы</a>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className='me-3' onClick={handleSelect} />
      <Navbar.Collapse id="basic-navbar-nav " className='text-center me-5'>
        <Navbar.Brand href="#home" className='ms-auto me-auto'>
          {/* <HeartLogo className='d-inline-block align-top' /> */}
          <span className='d-inline-block align-middle header-logo'>LOGO</span>
        </Navbar.Brand>
        <Nav onSelect={handleSelect} >
          <Nav.Link onClick={props.showSignInModal}><HeartLogo className='me-1' />login</Nav.Link>
          <Nav.Link onClick={props.showSignUpModal}><HeartLogo className='me-1' />sign up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;