/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './Login.scss';
import cn from 'classnames';
import { getCurentUser, SignUp } from '../../../utils/fetch';
import useStoreAuth from '../../../utils/StoreAuth';
// import { CustomAlert } from '../../../utils/CustomAlert/CustomAlert';
// import { SERVER_URL } from '../../../services/httpClient';
// import { gapi } from 'gapi-script';
import { Outlet } from 'react-router-dom';
// import { Loading } from '../../../utils/Loading/Loading';
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from 'axios';
// import Cookies from 'js-cookie';






export const Login = () => {
  // const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  // const user = useStoreAuth((state) => state.user);
  const setUser = useStoreAuth((state) => state.setUser);
  // const setProfile = useStoreAuth((state) => state.setProfile);
  const setFormLogin = useStoreAuth((state) => state.setFormLogin);
  const [inputName, setInputName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const accessToken = useStoreAuth((state) => state.access_token);

  // const setAccessToken = useStoreAuth((state) => state.setAccessToken);
  // const loading = useStoreAuth((state) => state.loading);





  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => {

  //     setUser(codeResponse);
  //     console.log(codeResponse);
  //     localStorage.setItem('access_token', codeResponse.access_token);
  //     sessionStorage.setItem('access_token', codeResponse.access_token);
  //     setAccessToken(codeResponse.access_token);
  //     Cookies.set('access_token', codeResponse.access_token, { expires: 7 }); // Кука зберігатиметься 7 днів
  //     // showAlert();

  //   },
  //   onError: (error) => console.log("Login Failed:", error)
  // });
  // const login = () => {
    // window.location.href = 'https://ee4c-194-44-160-206.ngrok-free.app/api/auth/google_login';
  // }

  useEffect(() => {
    // Отримуємо URL з браузера
    const url = new URL(window.location.href);
    console.log('URL:', url);

    // Витягуємо authToken з URL параметрів
    const authToken = url.searchParams.get('authToken');
    console.log('authToken:', authToken);

    if (authToken) {
      // Відправляємо authToken на сервер
      fetch('https://ee4c-194-44-160-206.ngrok-free.app/api/auth/token', {
        method: 'GET',
        headers: {
          'authToken': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        }
        // body: JSON.stringify({ token: authToken }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Response from server:', data);
          // Перенаправляємо користувача на іншу сторінку після успішного запиту
          // navigate('/dashboard');
        })
        .catch(error => {
          console.error('Error sending authToken to server:', error);
        });
    } else {
      console.error('No authToken found in URL');
    }
  }, []);

  // useEffect(() => {




    // const apiKey = process.env.REACT_APP_API_KEY;
    // console.log('apiKey',apiKey);
    // if (user) {
    //     showAlert();

    //   axios
    //     // .get(
    //     //   `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
    //     .get(
    //       `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${user.access_token}`,
    //           Accept: "application/json",
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       // console.log('юзер', res.data);
    //       // setProfile(res.data);
    //       // localStorage.setItem('profile', JSON.stringify(res.data));
    //       // sessionStorage.setItem('profile', JSON.stringify(res.data));
    //       // const allCookies = Cookies.get();
    //       // console.log('куки', allCookies);
    //       navigate('/list');
    //     })
    //     .catch((err) => console.log(err));
    // }
  // }, [user]);



  const handleRegistration = () => {
    if (inputName === '' || inputLastName === '' || inputEmail === '' || inputPassword === '') {
      alert('Заповніть всі поля');
      return;
    }
    if (inputPassword.length < 6) {
      alert('Пароль повинен містити не менше 6 символів');
      return;
    }
    const data = {
      first_name: inputName,
      last_name: inputLastName,
      email: inputEmail,
      password: inputPassword //str(min_length = 6)
    };
    console.log(data);
    SignUp(data).then((res) => {
      getCurentUser().then((res) => {
        if (res.status === 200) {
          console.log(res);
          setUser(res.data);
        }
      });
      console.log(res);
      if (res.status === 200) {
        alert('Ви успішно зареєструвались');
        setFormLogin(true);
      }
      if (res.status === 400) {
        alert('Користувач з таким емейлом вже існує');
      }
      if (res.status === 500) {
        alert('Щось пішло не так');
      }
      if (res.status === 404) {
        alert('Сервер не знайдено');
      }
      if (res.status === 401) {
        alert('Неавторизований доступ');
      }
      if (res.status === 403) {
        alert('Доступ заборонено');
      }
      // if (res.refresh_token) {
      //   localStorage.setItem('refresh_token', res.refresh_token);
      //   setRefreshToken(res.refresh_token);
      // }
      // if (res.access_token) {
      //   localStorage.setItem('access_token', res.access_token);
      //   setAccessToken(res.access_token);
      // }
      // if (res.token_type) {
      //   localStorage.setItem('token_type', res.token_type);
      //   setTokenType(res.token_type);
      // }
      setFormLogin(true);
    });
  }

  // const handleGoogleAutorization = () => {
  //   window.location.href = SERVER_URL + '/api/auth/google_login';
  // }


  function showAlert() {
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
      alertBox.classList.add('show');
    }
  }


  return (
    <>
      {accessToken ? <Outlet /> :
        <div className="section" >
          <div className="container-logo">
            <div className="row full-height justify-content-center">
              {/* {loading ? <Loading /> : */}
              <div className="col-12 text-center align-self-center py-5">
                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                  <h6 className="mb-0 pb-3">
                    <button
                      type='button'
                      className={cn('span', { 'active': !isChecked })}
                      onClick={() => setIsChecked(false)}
                    >
                      Увійти
                    </button>
                    <button
                      type='button'
                      className={cn('span', { 'active': isChecked })}
                      onClick={() => setIsChecked(true)}
                    >
                      Реістрація
                    </button>
                  </h6>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="reg-log"
                    name="reg-log"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />

                  <label htmlFor="reg-log"></label>
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                      <div className="card-front">
                        <div className="center-wrap">
                          <form className="section text-center">
                            <h4 className="mb-4 pb-3">Вхід</h4>
                            <div className="form-group">
                              <input
                                type="email"
                                name="logemail"
                                value={inputEmail}
                                className="form-style"
                                placeholder="Ваш Емейл"
                                id="logemail"
                                autoComplete="off"
                                onChange={(e) => setInputEmail(e.target.value)}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                value={inputPassword}
                                className="form-style"
                                placeholder="Ваш Пароль"
                                id="logpass"
                                autoComplete="off"
                                onChange={(e) => setInputPassword(e.target.value)}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button
                              type='button'
                              className="btn-login mt-4"
                              onClick={() => showAlert()}
                            >
                              Увійти
                            </button>
                            <a
                                // href='#/'
                              href="https://ee4c-194-44-160-206.ngrok-free.app/api/auth/google_login"
                                className="btn-login mt-4"
                              // onClick={handleGoogleAutorization}
                              >
                                Увійти через Google
                              </a>
                            {/* <button className='btn-login mt-4' onClick={login}>Login with Google</button> */}

                            {/* <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p> */}
                          </form>
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="center-wrap">
                          <form className="section text-center">
                            <h4 className="mb-4 pb-3">Реістрація</h4>
                            <div className="form-group">
                              <input
                                value={inputName}
                                type="text"
                                name="logname"
                                className="form-style"
                                placeholder="Ваше Імʼя"
                                id="logname"
                                autoComplete="off"
                                onChange={(e) => setInputName(e.target.value)}
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                value={inputLastName}
                                type="text"
                                name="logname"
                                className="form-style"
                                placeholder="Ваше Прізвище"
                                id="logLastName"
                                autoComplete="off"
                                onChange={(e) => setInputLastName(e.target.value)}
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                value={inputEmail}
                                type="email"
                                name="logemail"
                                className="form-style"
                                placeholder="Ваш Емейл"
                                id="logemail1"
                                autoComplete="off"
                                onChange={(e) => setInputEmail(e.target.value)}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                value={inputPassword}
                                type="password"
                                name="logpass"
                                className="form-style"
                                placeholder="Ваш Пароль"
                                id="logpass1"
                                autoComplete="off"
                                onChange={(e) => setInputPassword(e.target.value)}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <a href="#/" className="btn-login mt-4" onClick={handleRegistration}>
                              Зареєструватися
                            </a>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
