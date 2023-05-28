import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import SignUpModal from './components/Modals/SignUpModal';
import SignInModal from './components/Modals/SignInModal';
import PasportResetModal from './components/Modals/PasportResetModal';
import PostEmailCodeModal from './components/Modals/PostEmailCodeModal';
import EnterEmailToResetModal from './components/Modals/EnterEmailToResetModal';

import MainPage from './components/Pages/MainPage';
import ReportPage from './components/Pages/ReportPage';
import F404Page from './components/Pages/F404Page';
import AccountPage from './components/Pages/AccountPage';
import DocumentsPage from './components/Pages/DocumentsPage';

import api from './services/api';
import Swal from 'sweetalert2';





function App() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showPasportResetModal, setShowPasportResetModal] = useState(false);
  const [showPostEmailCodeModal, setShowPostEmailCodeModal] = useState(false);
  const [showEnterEmailToResetModal, setShowEnterEmailToResetModal] = useState(false);

  const [isLogedIn, setIsLogedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/check').catch((err) => {
      if (err) {
        setIsLogedIn(false)
      }
    }).then((res) => {
      if (res && res.status >= 200 && res.status < 300) {
        setIsLogedIn(true)
      } else {
        setIsLogedIn(false)
      }
    })
  }, [isLogedIn])

  const showModal = {
    'signUpModal': () => { setShowSignUpModal(true) },
    'signInModal': () => { setShowSignInModal(true) },
    'pasportResetModal': () => { setShowPasportResetModal(true) },
    'postEmailCodeModal': () => { setShowPostEmailCodeModal(true) },
    'enterEmailToResetModal': () => { setShowEnterEmailToResetModal(true) },
  }
  const hideModal = {
    'signUpModal': () => { setShowSignUpModal(false) },
    'signInModal': () => { setShowSignInModal(false) },
    'pasportResetModal': () => { setShowPasportResetModal(false) },
    'postEmailCodeModal': () => { setShowPostEmailCodeModal(false) },
    'enterEmailToResetModal': () => { setShowEnterEmailToResetModal(false) },
  }

  const logOut = (e) => {
    e.preventDefault();
    api.delete('/auth/sign/out', { ok: true }).then((res) => {
      if (res && res.status && res.status >= 200 && res.status < 300) {
        setIsLogedIn(false)
        Swal.fire({
          icon: 'success',
          title: 'Вы вышли из аккаунта',
        })
        navigate('/')
      }
    }).catch((err) => {
      if (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Что-то пошло не так',
        })
      }
    })
  }


  return (
    <>
      <SignUpModal show={showSignUpModal} onHide={hideModal['signUpModal']} setIsLogedIn={() => setIsLogedIn(true)} />
      <SignInModal show={showSignInModal} onHide={hideModal['signInModal']} setIsLogedIn={() => setIsLogedIn(true)} forgetPass={showModal["enterEmailToResetModal"]} />
      <EnterEmailToResetModal show={showEnterEmailToResetModal} onHide={hideModal['enterEmailToResetModal']} nextStep={showModal["postEmailCodeModal"]} />
      <PostEmailCodeModal show={showPostEmailCodeModal} onHide={hideModal['postEmailCodeModal']} nextStep={showModal["pasportResetModal"]} />
      <PasportResetModal show={showPasportResetModal} onHide={hideModal['pasportResetModal']} />

      <Header showSignInModal={showModal['signInModal']} isLogedIn={isLogedIn} logOut={logOut} showSignUpModal={showModal['signUpModal']} />
      <Routes>
        <Route path='/' element={<MainPage isLogedIn={isLogedIn} />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/documents' element={<DocumentsPage />} />
        <Route path='/report/:id' element={<ReportPage isLogedIn={isLogedIn} />} />
        <Route path='*' element={<F404Page />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;