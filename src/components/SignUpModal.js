import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SignUpModal = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [inn, setInn] = useState('');
  const [siteLink, setSiteLink] = useState('');

  const handleNext = () => {
    if (step === 1 && (!name || !surname || !nickname)) {
      alert('Please fill in all required fields.');
      return;
    }
    if (step === 2 && !email) {
      alert('Please enter your email.');
      return;
    }
    if (step === 3 && (!organization || !inn || !siteLink)) {
      alert('Please fill in all required fields.');
      return;
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSkip = () => {
    setStep(step + 1);
  };

  const handleSubmit = () => {
    // Perform submission logic here
    alert('Form submitted successfully!');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="surname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="nickname">
              <Form.Label>Fathername</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Form.Group>
          </Form>
        )}
        {step === 2 && (
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
          </Form>
        )}
        {step === 3 && (
          <Form>
            <Form.Group controlId="organization">
              <Form.Label>Organization</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {step > 1 && (
          <Button variant="secondary" onClick={handlePrevious}>
            Go Back
          </Button>
        )}
        {step < 3 && (
          <>
            <Button variant="secondary" onClick={handleSkip}>
              Skip
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          </>
        )}
        {step === 3 && (
          <>
            <Button variant="secondary" onClick={handlePrevious}>
              Go Back
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpModal;




