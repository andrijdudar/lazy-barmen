/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './LoginEvgen.scss';
import { SERVER_URL } from '../../../services/httpClient';
import { useNavigate } from 'react-router-dom';

export const LoginEvgen = () => {
  const navigate = useNavigate();
  const [producerLoginRedirectEndpoint] = useState(SERVER_URL + '/api/auth/google_login');//google/login

  // const [producerLoginEndpoint] = useState('http://localhost:8000/login/');//token
  const [producerLoginEndpoint] = useState(SERVER_URL + '/api/auth/token');//token
  // const [producerLogoutEndpoint] = useState('http://localhost:8000/logout/');//LogOut
  const [producerLogoutEndpoint] = useState(SERVER_URL + '/api/auth/logout');//LogOut
  const [producerLoginCheckEndpoint] = useState(SERVER_URL + '/api/user/me');//перевірки, чи є користувач увійшовим у систему
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  // console.log(userName);

  const allCookies = Cookies.get();
  console.log(allCookies);

  useEffect(() => {
    // const allCookies = Cookies.get();
    // const allCookiesAccessToken = Cookies.get('access_token');
    // const allCookiesRefreshToken = Cookies.get('refresh_token');
    // setRefreshToken(allCookiesRefreshToken);

    // console.log(allCookies);
    // console.log(allCookiesAccessToken);
    // authenticate();
    // deleteAllCookies();
    // console.log(userName);
  }, []);

  // const setCookie = (cname, cvalue, exdays) => {
  //   const d = new Date();
  //   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  //   const expires = "expires=" + d.toUTCString();
  //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // };
  const setCookie = (cname, cvalue, exdays) => {
    Cookies.set(cname, cvalue, { expires: exdays, path: '/' });
  };

  // const getCookie = (cname) => {
  //   const name = cname + "=";
  //   const decodedCookie = decodeURIComponent(document.cookie);
  //   const ca = decodedCookie.split(';');
  //   for (const i = 0; i < ca.length; i++) {
  //     const c = ca[i];
  //     while (c.charAt(0) === ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) === 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // };
  const getCookie = (cname) => {
    return Cookies.get(cname) || "";
  };

  const authenticate = () => {
    // const authToken = (window.location.search.match(/authToken=([^&]+)/) || [])[1];
    // window.history.pushState('object', document.title, "/");
    // const authCode = (window.location.search.match(/code=([^&]+)/) || [])[1];
    // window.history.pushState('object', document.title, "/");


    // };

    const params = new URLSearchParams(window.location.search);

    const state = params.get('state');
    const code = params.get('code');
    const scope = params.get('scope');
    const authuser = params.get('authuser');
    const prompt = params.get('prompt');
    const csrftoken = getCookie('csrftoken');
    const session = getCookie('session');

    // console.log(state, code, scope, authuser, prompt, csrftoken, session);

    window.history.pushState('object', document.title, "/");

    // const authToken = getCookie('authToken');
    // if (authCode) {
    getAccessToken(state, code, scope, authuser, prompt, csrftoken, session);
    // } else {
    // checkUserSessionStatus();
    // }
  };

  const getAccessToken = (state, code, scope, authuser, prompt, csrftoken, session) => {

    const request = {
      method: 'GET',
      headers: {
        code,
        state,
        scope,
        authuser,
        prompt,
        csrftoken,
        session,

      },
      credentials: 'include'
    };

    fetch(producerLoginEndpoint, request)
      .then(response => {
        console.log('response token', response);
        // setCookie('authToken', authToken, 1); // Токен буде збережено на 1 день

        // Check if user is logged in
        // checkUserSessionStatus();
      })
      .catch(err => {
        console.log(err);
      });
  };



  const checkUserSessionStatus = () => {
    const request = {
      method: 'GET',
      credentials: 'include'
    };

    fetch(producerLoginCheckEndpoint, request)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setUserLoggedIn(data['userLoggedIn']);
        setUserName(data['userName']);
      })
      .catch(err => { });
  };

  const logout = () => {
    const request = {
      method: 'GET',
      credentials: 'include'
    };

    fetch(producerLogoutEndpoint, request)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        Cookies.remove('authToken');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const redirectToLazyBarmen = () => {
    // window.location.href = '/list';
    navigate('/list');
  }

  return (
    <section id="page-container" className='login_evgen'>
      {userLoggedIn ?
        <div>
          <h1>
            You are now logged in!
          </h1>
          <div>
            <button className='button' onClick={logout}>Logout</button>
            <button className='button' onClick={redirectToLazyBarmen}>Увійти в додаток</button>
          </div>
        </div> :
        <Login
          producerLoginRedirectEndpoint={producerLoginRedirectEndpoint}
        />
      }
    </section>
  );
}

function Login({ producerLoginRedirectEndpoint }) {
  const [refreshToken, setRefreshToken] = useState(null);
  useEffect(() => {
    const token = getCookie('refresh_token');
    setRefreshToken(token);
  }, []);

  function getCookie(name) {
    const cook = Cookies.get(name);
    if (cook) {
      return cook;
    }
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      return match[2];
    } else {
      return null;
    }
  }

  const setCookie = (cname, cvalue, exdays) => {
    Cookies.set(cname, cvalue, { expires: exdays, path: '/' });
  };

  const getAccsess = () => {
    // const refreshToken = getCookie('refresh_token');
    // setRefreshToken(refreshToken);
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
          // window.location.href = '/login';
          throw new Error('Помилка авторизації. Не вдалося оновити токен.');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setCookie('access_token', data['access_token'], 1); // Токен буде збережено на 1 день

        // Check if user is logged in
        // checkUserSessionStatus();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const googleLogin = () => {
    // console.log(producerLoginRedirectEndpoint);
    // const auth_provider = "google-oidc";
    // const login_url = props.producerLoginRedirectEndpoint + "?auth_provider=" + auth_provider;
    const login_url = producerLoginRedirectEndpoint;
    window.location.href = login_url;
  };

  // const getCookie = (cname) => {
  //   return Cookies.get(cname) || "";
  // };

  const getRefresh = () => {
    const accessToken = Cookies.get('access_token');

    // Отримуємо refresh_token
    const refreshToken = Cookies.get('refresh_token');
    console.log('refreshToken', refreshToken);
    console.log('accessToken', accessToken);

    // const token = getCookie('refresh_token');
    setRefreshToken(refreshToken);


    // const refreshToken = getCookie('refresh_token');
    // console.log(refreshToken);
    setRefreshToken(refreshToken);
  }

  // const azureLogin = () => {
  //   const auth_provider = "azure-oidc";
  //   const login_url = props.producerLoginRedirectEndpoint + "?auth_provider=" + auth_provider;
  //   window.location.href = login_url;
  // };

  return (
    <section>
      <div>
        <button className='button' onClick={googleLogin}>Login with Google</button>
      </div>
      <div><button className='button' onClick={getRefresh}>getRefreshCookie</button></div>
     <div> <button className='button' onClick={getAccsess}>SERVER_URL + '/api/auth/refresh_token'</button></div>
    </section>
  );
}
