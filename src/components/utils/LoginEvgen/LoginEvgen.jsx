
import React, { useEffect } from 'react';
import { CLIENT_ID, SERVER_URL } from '../../../services/httpClient';

export const LoginEvgen = () => {
  const handleLogin = async (credentialResponse) => {
    try {
      const authCode = credentialResponse.credential;
      console.log('authCode:', authCode)


      // Відправка auth_code на бекенд
      const response = await fetch(`${SERVER_URL}/api/auth/google_auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ auth_code: authCode }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Авторизація успішна:', data);
        // Використовуйте отримані access_token і refresh_token за потреби
      } else {
        console.error('Спроба авторизації зазнала невдачі');
      }
    } catch (error) {
      console.error('Спроба входу зазнала невдачі', error);
    }
  };

  useEffect(() => {
    // Завантаження Google Identity Services та ініціалізація
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleLogin,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  return (
    <div className='login_evgen'>
      <div id="signInDiv"></div>
    </div>
  );
};

export default LoginEvgen;
