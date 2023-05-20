import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../asserts/logo.jpg'

const Header = (props) => {
  const [expanded, setExpanded] = useState(false);

  const logoStyle = {
    objectFit: 'cover',
    mixBlendMode: 'darken',
    'width': props.isPhone ? '15vw' : '5vw',
  }

  const handleSelect = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar bg="light" expand="lg" className='sticky-top' expanded={expanded}>
      <Navbar.Brand href="https://vk.com/prettydelivery">
        <img className='img m-2' style={logoStyle} src={logo} alt="Poizon logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className='me-3' onClick={handleSelect} />
      <Navbar.Collapse id="basic-navbar-nav " className='text-center'>
        <Nav className="ms-auto" onSelect={handleSelect} >
          <Nav.Link href="#about">О нас</Nav.Link>
          <Nav.Link href="#track-order">fdfd</Nav.Link>
          <Nav.Link href="#our-adventages">fdfd</Nav.Link>
          <Nav.Link href="#top-products">Калькулятор</Nav.Link>
          <Nav.Link href="#contacts">авава</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;