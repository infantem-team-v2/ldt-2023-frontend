import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';

import { ReactComponent as CopyToClickboardIcon } from '../../asserts/copy_to_clickboard_icon.svg';

const CopyToClipboardButton = ({ text }) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showToast]);

  const toastOnClose = () => setShowToast(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setShowToast(true);
    } catch (error) {
      console.error('Возникла ошибка при попытккопирования ссылки :', error);
    }
  };

  return (
    <div>
      <div onClick={copyToClipboard} className='ms-2'>
        <CopyToClickboardIcon />
      </div>

      <Toast show={showToast} onClose={toastOnClose} className='mt-3 position-absolute' >
        <Toast.Body>
          <strong className="me-auto">Ссылка была скопированна в ваш буффер</strong>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default CopyToClipboardButton;
