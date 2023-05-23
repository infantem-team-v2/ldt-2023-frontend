import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import SignUpModal from './components/SignUpModal';
import SignInModal from './components/SignInModal';
import PasportResetModal from './components/PasportResetModal';
import PostEmailCodeModal from './components/PostEmailCodeModal';
import EnterEmailToResetModal from './components/EnterEmailToResetModal';

import MainPage from './components/MainPage';
import AdminForm from './components/AdminForm';
import ReportPage from './components/ReportPage';
import F404Page from './components/F404Page';
import AccountPage from './components/AccountPage';

import api from './services/api';
import Swal from 'sweetalert2';





function App() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showPasportResetModal, setShowPasportResetModal] = useState(false);
  const [showPostEmailCodeModal, setShowPostEmailCodeModal] = useState(false);
  const [showEnterEmailToResetModal, setShowEnterEmailToResetModal] = useState(false);

  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    api.get('/auth/check').catch((err) => {
      console.log(err)
      if (err) {
        setIsLogedIn(false)
      }
    }).then((res) => {
      console.log(res)
      if (res && res.status >= 200 < 300) {
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
    api.delete('/auth/sign/out', { a: 1 }).then((res) => {
      if (res && res.status >= 200 < 300) {
        setIsLogedIn(false)
        Swal.fire({
          icon: 'success',
          title: 'Вы вышли из аккаунта',
        })
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
        <Route path='/' element={<MainPage />} />
        <Route path='/admin' element={<AdminForm />} />
        <Route path='/report/:id' element={<ReportPage />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='*' element={<F404Page />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;