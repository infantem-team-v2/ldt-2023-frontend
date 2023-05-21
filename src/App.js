import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import SignUpModal from './components/SignUpModal';
import SignInModal from './components/SignInModal';

import MainPage from './components/MainPage';
import AdminForm from './components/AdminForm';





function App() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const onHideSignUpModal = () => {
    setShowSignUpModal(false);
  }

  const onHideSignInModal = () => {
    setShowSignInModal(false);
  }

  const showSignUpModalHandler = () => {
    setShowSignUpModal(true);
  }
  const showSignInModalHandler = () => {
    setShowSignInModal(true);
  }


  return (
    <>
      <SignUpModal show={showSignUpModal} onHide={onHideSignUpModal} />
      <SignInModal show={showSignInModal} onHide={onHideSignInModal} />
      <Header showSignInModal={showSignInModalHandler} showSignUpModal={showSignUpModalHandler} />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/admin' element={<AdminForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;