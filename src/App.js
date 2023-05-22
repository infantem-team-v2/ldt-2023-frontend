import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import SignUpModal from './components/SignUpModal';
import SignInModal from './components/SignInModal';
import PasportResetModal from './components/PasportResetModal';

import MainPage from './components/MainPage';
import AdminForm from './components/AdminForm';
import ReportPage from './components/ReportPage';
import F404Page from './components/F404Page';





function App() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showPasportResetModal, setShowPasportResetModal] = useState(false);

  const showPasportResetModalHandler = () => {
    setShowPasportResetModal(true);
  }

  const onHidePasportResetModal = () => {
    setShowPasportResetModal(false);
  }

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
      <PasportResetModal show={showPasportResetModal} onHide={onHidePasportResetModal} />
      <Header showSignInModal={showPasportResetModalHandler} showSignUpModal={showSignUpModalHandler} />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/admin' element={<AdminForm />} />
        <Route path='/report/:id' element={<ReportPage />} />
        <Route path='*' element={<F404Page />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;