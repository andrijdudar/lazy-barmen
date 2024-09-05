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



import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { SERVER_URL } from '../../../services/httpClient';
import { useNavigate } from 'react-router-dom';
import './LoginEvgen.scss';

export const LoginEvgen = () => {
  const navigate = useNavigate();
  const [producerLoginRedirectEndpoint] = useState(SERVER_URL + '/api/auth/google_login');
  // const [producerLoginEndpoint] = useState(SERVER_URL + '/api/auth/token');
  const [producerLogoutEndpoint] = useState(SERVER_URL + '/api/auth/logout');
  const [producerLoginCheckEndpoint] = useState(SERVER_URL + '/api/user/me');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [cookieValue, setCookieValue] = useState(null);
  const [cookies, setCookies] = useState(null);

  useEffect(() => {
    Cookies.set('access_token', '1234567890', { expires: 1 });
    // Отримуємо всі cookies як один рядок
    const allCookies = document.cookie;
    console.log('Всі cookies:', allCookies);

    // Знаходимо cookie з назвою 'myCookie'
    const cookie = getCookieValue('access_token', allCookies);

    if (cookie) {
      setCookieValue(cookie);
      console.log('Cookie значення:', cookie);
    } else {
      console.log('Cookie не знайдено');
    }

    checkUserSessionStatus(cookie);



    // if (token) {
    // authenticate(token);
    //   console.log('refreshToken', token);
    //   setRefreshToken(token);
    // } else {
    // console.log('Токен не знайдено');

    // }
  }, []);

  const getCookies = () => {
    const allCookies = document.cookie;
    console.log('Всі cookies:', allCookies);
    setCookies(allCookies);
    console.log('cookies state', cookies);
  };

  const getCookieValue = (name, allCookies) => {
    const cookieArr = allCookies.split('; ');
    for (let cookie of cookieArr) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  // const getAccessToken = () => {
  //   fetch(producerLoginEndpoint, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${Cookies.get('refresh_token')}`,

  //     },
  //     credentials: 'include'
  //   })
  //     .then(response => {
  //       console.log('response token', response);
  //     })
  //     .catch(err => {
  //       console.error('Помилка при отриманні аксес токену:', err);
  //     }
  //     )
  // };

  const checkUserSessionStatus = () => {
    // const accessToken = Cookies.get('access_token');

    fetch(producerLoginCheckEndpoint, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('access_token')}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log('accessToken знайдено', accessToken);
        console.log('data', data);
        // setUserLoggedIn(data['userLoggedIn']);
        // setUserName(data['userName']);
        // setUserLoggedIn(true);

      })
      .catch(err => {
        console.error('Помилка при перевірці статусу сесії скоріш за все нема аксес токенп:', err);
        const accessToken = Cookies.get('access_token');
        const refreshToken = Cookies.get('refresh_token');
        if (accessToken) {
          if (!refreshToken) {
            console.log('То Піздєц рефреш токену немає');
          }
          // getAccessToken(refreshToken);

        }
      });
  };

  const getAccsess = () => {
    const refreshToken = Cookies.get('refresh_token');
    console.log('refreshToken', refreshToken);
    fetch(SERVER_URL + '/api/auth/refresh_token', {
      method: 'GET',
      credentials: 'include',
      headers:{
        'Authorization': `Bearer ${refreshToken}`,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Помилка авторизації. Не вдалося оновити токен.');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log('access_token', data['access_token'], Cookies.get('access_token'));
      // setCookie('access_token', data['access_token'], 1);
    })
    .catch(err => {
      console.log(err);
    });
  };

  // const setCookie = (cname, cvalue, exdays) => {
  //   Cookies.set(cname, cvalue, { expires: exdays, path: '/' });
  // };

  const logout = () => {
    const request = {
      method: 'GET',
      credentials: 'include'
    };

    fetch(producerLogoutEndpoint, request)
      .then(response => response.json())
      .then(() => {
        Cookies.remove('authToken');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const googleLogin = () => {
    window.location.href = producerLoginRedirectEndpoint;
  };

  const redirectToLazyBarmen = () => {
    navigate('/list');
  }

  return (
    <section id="page-container" className='login_evgen'>
      {userLoggedIn ? (
        <div>
          <h1>You are now logged in!</h1>
          <div>
            <button className='button' onClick={logout}>Logout</button>
            <button className='button' onClick={redirectToLazyBarmen}>Увійти в додаток</button>
          </div>
        </div>
      ) : (
        <section>
          <div>
            <button className='button' onClick={googleLogin}>Login with Google</button>
          </div>
          <div>
              <button className='button' onClick={getCookies}>Отримати куки</button>
          </div>
          <div>
              <button className='button' onClick={getAccsess}>Оновити Access Token</button>
          </div>
        </section>
      )}
    </section>
  );
};
