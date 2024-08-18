import React, { useEffect } from 'react';
import './CustomAlert.scss';

export function CustomAlert({ massage, link, buttonText }) {
  // const formLogin = useStore((state) => state.formLogin);
  // function showAlert() {
  //   const alertBox = document.getElementById('custom-alert');
  //   if (alertBox) {
  //     alertBox.classList.add('show');
  //   }
  // }

  useEffect(() => {
    const closeButton = document.getElementById('close-alert');
    if (closeButton) {
      closeButton.addEventListener('click', function () {
        const alertBox = document.getElementById('custom-alert');
        if (alertBox) {
          alertBox.classList.remove('show');
        }
      });
    }

    // showAlert();
    return () => {
      if (closeButton) {
        closeButton.removeEventListener('click', () => { });
      }
    };
  }, []);

  return (
    <div id="custom-alert" className="custom-alert">
      <div className="alert-content">
        <p>{massage || ''}</p>
        <a href={link || '#'} id="close-alert"className="email-button">
            {buttonText || ''}
          </a>
      </div>
    </div >
  );
}
