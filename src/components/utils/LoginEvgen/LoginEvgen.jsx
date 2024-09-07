// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { SERVER_URL } from '../../../services/httpClient';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './LoginEvgen.scss';

// export const LoginEvgen = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [producerLoginRedirectEndpoint] = useState(SERVER_URL + '/api/auth/google_login');
//   const [producerLoginEndpoint] = useState(SERVER_URL + '/api/auth/token');
//   const [producerLogoutEndpoint] = useState(SERVER_URL + '/api/auth/logout');
//   const [producerLoginCheckEndpoint] = useState(SERVER_URL + '/api/user/me');
//   const [userLoggedIn, setUserLoggedIn] = useState(false);
//   const [userName, setUserName] = useState(null);
//   const [refreshToken, setRefreshToken] = useState(null);


//   useEffect(() => {

//       // const token = Cookies.get('refresh_token');
//       // if (token) {
//       //   console.log('refreshToken', token);
//       //   setRefreshToken(token);
//       // } else {
//       //   console.log('Токен не знайдено');
//       // }

//       // Перевіряємо наявність параметрів від Google у URL
//       // const params = new URLSearchParams(window.location.search);
//       // const code = params.get('code');
//     // const state = params.get('state');


//     // const params = new URLSearchParams(location.search);
//     // const code = params.get('code');
//     // const state = params.get('state');
//     // const reference = params.get('');
//     // const params = new URLSearchParams(location.search);
//     // const state = params.get('state');
//     // const code = params.get('code');
//     // const scope = params.get('scope');
//     // const authuser = params.get('authuser');
//     // const prompt = params.get('prompt');

//     // // if (code && state) {
//     //   // Викликаємо функцію для обробки аутентифікації
//     //   const fullUrl = `${window.location.origin}${window.location.pathname}?state=${state}&code=${code}&scope=${encodeURIComponent(scope)}&authuser=${authuser}&prompt=${prompt}`;
//     const fullUrl = window.location.href;
//     console.log("Повний URL:", fullUrl);
//       authenticate(fullUrl);

//     // }

//       // const originalUrl = window.location.href;

//       // if (code && state) {
//     // authenticate(state, params);
//       // }
//   }, [location]);

//   // const setCookie = (cname, cvalue, exdays) => {
//   //   Cookies.set(cname, cvalue, { expires: exdays, path: '/' });
//   // };

//   const authenticate = (reference) => {
//     console.log(reference);
//     // Передаємо code і state на бекенд для обробки
//     fetch(producerLoginEndpoint, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Referer': reference,
//       },
//       credentials: 'include',

//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Не вдалося отримати токени');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Отримані токени:', data);
//         setUserLoggedIn(true);
//         checkUserSessionStatus();
//         navigate('/list'); // Перенаправляємо користувача на потрібну сторінку після успішної авторизації
//       })
//       .catch(err => {
//         console.error('Помилка при обробці авторизації:', err);
//       });
//   };

//   const checkUserSessionStatus = () => {
//     fetch(producerLoginCheckEndpoint, {
//       method: 'GET',
//       credentials: 'include'
//     })
//       .then(response => response.json())
//       .then(data => {
//         setUserLoggedIn(data['userLoggedIn']);
//         setUserName(data['userName']);
//       })
//       .catch(err => {
//         console.error('Помилка при перевірці статусу сесії:', err);
//       });
//   };

//   const logout = () => {
//     const request = {
//       method: 'GET',
//       credentials: 'include'
//     };

//     fetch(producerLogoutEndpoint, request)
//       .then(response => response.json())
//       .then(() => {
//         Cookies.remove('access_token');
//         Cookies.remove('refresh_token');
//         window.location.reload();
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

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
//         // setCookie('access_token', data['access_token'], 1);
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
//             <button className='button' onClick={navigate('/list')}>Увійти в додаток</button>
//           </div>
//         </div>
//       ) : (
//         <section>
//           <div>
//             <button className='button' onClick={googleLogin}>Login with Google</button>
//           </div>
//         </section>
//       )}
//     </section>
//   );
// };



// import React, { useEffect } from 'react';
// import './LoginEvgen.scss';
// import { SERVER_URL } from '../../../services/httpClient';
// import { useLocation } from 'react-router-dom';

// export const LoginEvgen = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const queryParams = window.location.search.substr(1);
//     console.log(queryParams);
//   }, [location]);

//     const sendRequest = async () => {
//         try {
//             const queryParams = window.location.search.substr(1);
//           const response = await fetch(`${SERVER_URL}/api/auth/token?${queryParams}`, {
//                 method: 'GET',
//                 credentials: 'include',
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();

//             if (data.result === true) {
//                 window.localStorage.setItem('jwt', data.access_token);
//                 window.localStorage.setItem('refresh', data.refresh_token);
//               console.log("Token stored successfully");
//               console.log(localStorage.getItem('jwt'));
//               console.log(localStorage.getItem('refresh'));
//             } else {
//                 console.error("Invalid response result:", data);
//             }
//         } catch (error) {
//             console.error("Error fetching JWT token:", error);
//         }
//     };

//     return (
//       <div className='login_evgen'>
//         <div>
//           <button className='button' onClick={sendRequest}>Get FastAPI JWT Token</button>
//           <a href={`${SERVER_URL}/api/auth/google_login`} className='button' >Google Login</a>
//         </div>
//       </div>
//     );
// };

// export default LoginEvgen;


//response.headers.get(name)
// 'Content-Type', 'application/json'
// 'Authorization', 'Bearer my-token'

// import React, { useEffect } from 'react';
// import { SERVER_URL } from '../../../services/httpClient';

// function LoginEvgen() {
//   useEffect(() => {
//     // Отримуємо код із URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const authCode = urlParams.get('code');

//     // Якщо код отримано
//     // if (authCode) {
//       // Створюємо запит
//       const googleRequest = new Request(`${SERVER_URL}api/auth/google_login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ code: authCode }),
//       });

//       // Відправляємо запит
//       sendGoogleAuth(googleRequest);
//     // }
//   }, []);

//   // Асинхронна функція для надсилання запиту і обробки відповіді
//   async function sendGoogleAuth(request) {
//     try {
//       const response = await fetch(request);
//       const data = await response.json();
//       console.log('Success:', data);

//       if (data.access_token) {
//         // Зберігаємо токени в localStorage
//         localStorage.setItem('access_token', data.access_token);
//         localStorage.setItem('refresh_token', data.refresh_token);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   return <div>Авторизація через Google...</div>;
// }

// export default LoginEvgen;



// Set-Cookie: <cookie-name>=<cookie-value>; Domain="https://andrijdudar.github.io"; Path="/lazy-barmen/"; Expires=2026-12-31T23:59:59.000Z; Max-Age=315360000; SameSite=Strict;


import React, { useEffect } from 'react';
import { CLIENT_ID } from '../../../Root';

export const LoginEvgen = () => {
    useEffect(() => {
      // Функція для завантаження бібліотеки gapi
      function loadGapi() {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          // Ініціалізація gapi після завантаження скрипту
          window.gapi.load('client:auth2', initGapiClient);
        };
        document.body.appendChild(script);
      }

      // Ініціалізація клієнта Google API
      function initGapiClient() {
        window.gapi.client.init({
          clientId: CLIENT_ID,
          scope: 'profile email',
        }).then(() => {
          console.log('GAPI Client initialized');
          const authInstance = window.gapi.auth2.getAuthInstance();
          console.log('GoogleAuth instance:', authInstance);
        }).catch(error => {
          console.error('Error initializing GAPI client:', error);
        });
      }

      loadGapi();
    }, []);

    const handleSignIn = () => {
      const authInstance = window.gapi.auth2.getAuthInstance();
      authInstance.signIn().then(user => {
        const profile = user.getBasicProfile();
        console.log('User signed in:', profile.getName());
        console.log('User:', profile);
        // Тут можна зберегти токен або обробити інформацію про користувача
      }).catch(error => {
        console.error('Error signing in:', error);
      });
    };

    return (
      <div>
        <button onClick={handleSignIn}>Sign in with Google</button>
      </div>
    );
  }

export default LoginEvgen;
