import React from 'react';
import './TestPage.scss';

export const TestPage = () => {
  const navigateToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className='test-page'>
      {/* <h1>Test Page</h1> */}
      <button
        type='button'
        className='button button-test-page'
        onClick={navigateToHome}
      >
        Перейти на головну

      </button>
    </div >
  );
};

