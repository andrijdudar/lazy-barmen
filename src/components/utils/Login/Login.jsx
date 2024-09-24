/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './Login.scss';
import cn from 'classnames';
import { getAllDishes, getCurrentUser, getRefreshToken, SignUp } from '../../../utils/fetch';
import useStoreAuth from '../../../utils/StoreAuth';
// import { CustomAlert } from '../../../utils/CustomAlert/CustomAlert';
import { CLIENT_ID, GOOGLE_AUTH_URL } from '../../../services/httpClient';
import { useNavigate } from 'react-router-dom';
// import { Loading } from '../../../utils/Loading/Loading';


export const Login = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  // const user = useStoreAuth((state) => state.user);
  const setUser = useStoreAuth((state) => state.setUser);
  // const profile = useStoreAuth((state) => state.profile);
  // const setProfile = useStoreAuth((state) => state.setProfile);

  const [inputName, setInputName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleLogin = async (credentialResponse) => {
    try {
      const authCode = credentialResponse.credential;
      console.log('authCode:', authCode)

      // Відправка auth_code на бекенд
      const response = await fetch(GOOGLE_AUTH_URL, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ auth_code: authCode }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('token_type', data.token_type);

        console.log('Авторизація успішна:', data);
        getRefreshToken().then((res) => {
          console.log(res);
          localStorage.setItem('refresh_token', res.refresh_token);
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('token_type', res.token_type);
          if (res.access_token) {
            navigate('/');
          }
        });
      } else {
        console.error('Спроба авторизації зазнала невдачі');
      }
    } catch (error) {
      console.error('Спроба входу зазнала невдачі', error);
    }
  };

  const initializeGoogleSignIn = () => {
    // Завантаження Google Identity Services та ініціалізація
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleLogin,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        width: '240',
        locale: 'uk'
      }
    );
  };

  useEffect(() => {
    // axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
    // axios.get('/posts').then((res) => console.log(res.data));
    if (localStorage.getItem('refresh_token')) {
      getRefreshToken().then((res) => {
        console.log('res:', res)
        console.log(res);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('access_token', res.access_token);
        getCurrentUser().then((res) => {
          localStorage.setItem('user', JSON.stringify(res));
        });
        if (res.access_token) {
          navigate('/list');
        }
      }).catch((error) => {
        navigate('/login');
        console.error('Помилка при виконанні GET запиту:', error);
      });
    }
    initializeGoogleSignIn();
  }, []);

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
      getCurrentUser().then((res) => {
        if (res.status === 200) {
          console.log(res);
          setUser(res.data);
        }
      });
      console.log(res);
      if (res.status === 200) {
        alert('Ви успішно зареєструвались');
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
    });
  }






  return (
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
                          onClick={() => {
                            getAllDishes().then((res) => {
                              console.log(res);

                            });
                            // getRefreshToken().then((res) => {
                            //   // console.log(res);

                            //   localStorage.setItem('refresh_token', res.refresh_token);
                            //   localStorage.setItem('access_token', res.access_token);
                            //   localStorage.setItem('token_type', res.token_type);
                            //   // getAllDishes().then((res) => {
                            //   //   console.log(res);

                            //   // });
                            // });
                          }}
                        >
                          Увійти
                        </button>
                        <div className='buttons_container_google_login'>

                          <div id="signInDiv"></div>
                        </div>
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
  );
};
