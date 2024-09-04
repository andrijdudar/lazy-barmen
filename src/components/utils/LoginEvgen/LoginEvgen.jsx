import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { SERVER_URL } from '../../../services/httpClient';
import { useLocation, useNavigate } from 'react-router-dom';
import './LoginEvgen.scss';

export const LoginEvgen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [producerLoginRedirectEndpoint] = useState(SERVER_URL + '/api/auth/google_login');
  const [producerLoginEndpoint] = useState(SERVER_URL + '/api/auth/token');
  const [producerLogoutEndpoint] = useState(SERVER_URL + '/api/auth/logout');
  const [producerLoginCheckEndpoint] = useState(SERVER_URL + '/api/user/me');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);


  useEffect(() => {

      // const token = Cookies.get('refresh_token');
      // if (token) {
      //   console.log('refreshToken', token);
      //   setRefreshToken(token);
      // } else {
      //   console.log('Токен не знайдено');
      // }

      // Перевіряємо наявність параметрів від Google у URL
      // const params = new URLSearchParams(window.location.search);
      // const code = params.get('code');
    // const state = params.get('state');


    // const params = new URLSearchParams(location.search);
    // const code = params.get('code');
    // const state = params.get('state');
    // const reference = params.get('');
    // const params = new URLSearchParams(location.search);
    // const state = params.get('state');
    // const code = params.get('code');
    // const scope = params.get('scope');
    // const authuser = params.get('authuser');
    // const prompt = params.get('prompt');

    // // if (code && state) {
    //   // Викликаємо функцію для обробки аутентифікації
    //   const fullUrl = `${window.location.origin}${window.location.pathname}?state=${state}&code=${code}&scope=${encodeURIComponent(scope)}&authuser=${authuser}&prompt=${prompt}`;
    const fullUrl = window.location.href;
    console.log("Повний URL:", fullUrl);
      authenticate(fullUrl);

    // }

      // const originalUrl = window.location.href;

      // if (code && state) {
    // authenticate(state, params);
      // }
  }, [location]);

  // const setCookie = (cname, cvalue, exdays) => {
  //   Cookies.set(cname, cvalue, { expires: exdays, path: '/' });
  // };

  const authenticate = (reference) => {
    console.log(reference);
    // Передаємо code і state на бекенд для обробки
    fetch(producerLoginEndpoint, {
      method: 'GET', // Вказуємо метод POST, щоб передати параметри в тілі запиту
      headers: {
        'Content-Type': 'application/json',
        // Можна передати URL також через кастомний заголовок, наприклад:
        'referer': reference, // якщо бекенд очікує отримати заголовок
      },
      credentials: 'include',
      // body: JSON.stringify({ fullUrl: reference }) // Передаємо повний URL в тілі запиту
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Не вдалося отримати токени');
        }
        return response.json();
      })
      .then(data => {
        console.log('Отримані токени:', data);
        setUserLoggedIn(true);
        checkUserSessionStatus();
        navigate('/list'); // Перенаправляємо користувача на потрібну сторінку після успішної авторизації
      })
      .catch(err => {
        console.error('Помилка при обробці авторизації:', err);
      });
  };

  const checkUserSessionStatus = () => {
    fetch(producerLoginCheckEndpoint, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        setUserLoggedIn(data['userLoggedIn']);
        setUserName(data['userName']);
      })
      .catch(err => {
        console.error('Помилка при перевірці статусу сесії:', err);
      });
  };

  const logout = () => {
    const request = {
      method: 'GET',
      credentials: 'include'
    };

    fetch(producerLogoutEndpoint, request)
      .then(response => response.json())
      .then(() => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const googleLogin = () => {
    window.location.href = producerLoginRedirectEndpoint;
  };

  const getAccsess = () => {
    console.log(refreshToken);
    fetch(SERVER_URL + '/api/auth/refresh_token', {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        'Authorization': `Bearer ${refreshToken}`,
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка авторизації. Не вдалося оновити токен.');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // setCookie('access_token', data['access_token'], 1);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <section id="page-container" className='login_evgen'>
      {userLoggedIn ? (
        <div>
          <h1>You are now logged in!</h1>
          <div>
            <button className='button' onClick={logout}>Logout</button>
            <button className='button' onClick={navigate('/list')}>Увійти в додаток</button>
          </div>
        </div>
      ) : (
        <section>
          <div>
            <button className='button' onClick={googleLogin}>Login with Google</button>
          </div>
        </section>
      )}
    </section>
  );
};



// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { SERVER_URL } from '../../../services/httpClient';
// import { useNavigate } from 'react-router-dom';
// import './LoginEvgen.scss';

// export const LoginEvgen = () => {
//   const navigate = useNavigate();
//   const [producerLoginRedirectEndpoint] = useState(SERVER_URL + '/api/auth/google_login');
//   const [producerLoginEndpoint] = useState(SERVER_URL + '/api/auth/token');
//   const [producerLogoutEndpoint] = useState(SERVER_URL + '/api/auth/logout');
//   const [producerLoginCheckEndpoint] = useState(SERVER_URL + '/api/user/me');
//   const [userLoggedIn, setUserLoggedIn] = useState(false);
//   const [userName, setUserName] = useState(null);
//   const [refreshToken, setRefreshToken] = useState(null);

//   useEffect(() => {
//     const token = Cookies.get('refresh_token');
//     if (token) {
//       console.log('refreshToken', token);
//       setRefreshToken(token);
//     } else {
//       console.log('Токен не знайдено');
//     }
//   }, []);

//   const setCookie = (cname, cvalue, exdays) => {
//     Cookies.set(cname, cvalue, { expires: exdays, path: '/' });
//   };

//   const getRefresh = () => {
//     console.log('Отриманий refreshToken:', refreshToken);
//   };

//   const authenticate = () => {
//     const params = new URLSearchParams(window.location.search);
//     const state = params.get('state');
//     const code = params.get('code');
//     const scope = params.get('scope');
//     const authuser = params.get('authuser');
//     const prompt = params.get('prompt');
//     const csrftoken = Cookies.get('csrftoken');
//     const session = Cookies.get('session');

//     window.history.pushState('object', document.title, "/");

//     getAccessToken(state, code, scope, authuser, prompt, csrftoken, session);
//   };

//   const getAccessToken = (state, code, scope, authuser, prompt, csrftoken, session) => {
//     const request = {
//       method: 'GET',
//       headers: {
//         code,
//         state,
//         scope,
//         authuser,
//         prompt,
//         csrftoken,
//         session,
//       },
//       credentials: 'include'
//     };

//     fetch(producerLoginEndpoint, request)
//       .then(response => {
//         console.log('response token', response);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   const checkUserSessionStatus = () => {
//     const request = {
//       method: 'GET',
//       credentials: 'include'
//     };

//     fetch(producerLoginCheckEndpoint, request)
//       .then(response => response.json())
//       .then(data => {
//         setUserLoggedIn(data['userLoggedIn']);
//         setUserName(data['userName']);
//       })
//       .catch(err => { });
//   };

//   const logout = () => {
//     const request = {
//       method: 'GET',
//       credentials: 'include'
//     };

//     fetch(producerLogoutEndpoint, request)
//       .then(response => response.json())
//       .then(() => {
//         Cookies.remove('authToken');
//         window.location.reload();
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   const redirectToLazyBarmen = () => {
//     navigate('/list');
//   }

//   const googleLogin = () => {
//     window.location.href = producerLoginRedirectEndpoint;
//   };

//   const getAccsess = () => {
//     console.log(refreshToken);
//     fetch(SERVER_URL + '/api/auth/refresh_token', {
//       method: 'GET',
//       credentials: 'include',
//       headers: new Headers({
//         'Authorization': `Bearer ${refreshToken}`,
//       })
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Помилка авторизації. Не вдалося оновити токен.');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log(data);
//         setCookie('access_token', data['access_token'], 1);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   return (
//     <section id="page-container" className='login_evgen'>
//       {userLoggedIn ? (
//         <div>
//           <h1>You are now logged in!</h1>
//           <div>
//             <button className='button' onClick={logout}>Logout</button>
//             <button className='button' onClick={redirectToLazyBarmen}>Увійти в додаток</button>
//           </div>
//         </div>
//       ) : (
//         <section>
//           <div>
//             <button className='button' onClick={googleLogin}>Login with Google</button>
//           </div>
//           <div>
//             <button className='button' onClick={getRefresh}>Отримати refreshToken</button>
//           </div>
//           <div>
//             <button className='button' onClick={getAccsess}>Оновити Access Token</button>
//           </div>
//         </section>
//       )}
//     </section>
//   );
// };
