import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import SignUpModal from './components/SignUpModal';
import SignInModal from './components/SignInModal';
import DistrictsMap from './components/DistrictsMap';

import AdminForm from './components/AdminForm';

import axios from 'axios';



function App() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const onHideSignUpModal = () => {
    setShowSignUpModal(false);
  }

  const onHideSignInModal = () => {
    setShowSignInModal(false);
  }


  return (
    <Routes>
      <Route path='/' element={
        <div className="App">
          <Header />
          <SignUpModal show={showSignUpModal} onHide={onHideSignUpModal} />
          <SignInModal show={showSignInModal} onHide={onHideSignInModal} />
          <h1>FLDFLDLFDLF</h1>
          <button className="btn btn-primary m-3" onClick={() => setShowSignUpModal(true)}>Sign Up</button>
          <button className="btn btn-primary m-3" onClick={() => setShowSignInModal(true)}>Sign In</button>
          <DistrictsMap />
          <Footer />
        </div>
      } />
      <Route path='/admin' element={<AdminForm />} />
    </Routes>
  );
}

export default App;
    // "start": "PORT=80 react-scripts start",