import React, { useState } from 'react';
import './Login.scss';
import useStore from '../../../StoreZustand';
import cn from 'classnames';
import { getCurentUser, googleAutorization, SignIn, SignUp } from '../../../utils/fetch';


export const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  // const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  // const formLogin = useStore((state) => state.formLogin);
  const setFormLogin = useStore((state) => state.setFormLogin);
  const [inputName, setInputName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const setAccessToken = useStore((state) => state.setAccessToken);
  const setRefreshToken = useStore((state) => state.setRefreshToken);
  const setTokenType = useStore((state) => state.setTokenType);

  const handleLogin = () => {
    if (inputEmail === '' || inputPassword === '') {
      alert('Заповніть всі поля');
      return;
    }

    const data = {
      email: inputEmail,
      password: inputPassword //str(min_length = 6)
    };

    SignIn(data).then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert('Ви успішно увійшли');
        getCurentUser().then((res) => {
          console.log(res);
          if (res.status === 200) {
            setUser(res.data);
          }
        });
        if (res.refresh_token) {
          localStorage.setItem('refresh_token', res.refresh_token);
          setRefreshToken(res.refresh_token);
        }
        if (res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          setAccessToken(res.access_token);
        }
        if (res.token_type) {
          localStorage.setItem('token_type', res.token_type);
          setTokenType(res.token_type);
        }
        setFormLogin(true);
      }
    });
  }

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
      if (res.refresh_token) {
        localStorage.setItem('refresh_token', res.refresh_token);
        setRefreshToken(res.refresh_token);
      }
      if (res.access_token) {
        localStorage.setItem('access_token', res.access_token);
        setAccessToken(res.access_token);
      }
      if (res.token_type) {
        localStorage.setItem('token_type', res.token_type);
        setTokenType(res.token_type);
      }
      setFormLogin(true);
    });
  }

  const handleGoogleAutorization = () => {
    googleAutorization().then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert('Ви успішно увійшли');
        getCurentUser().then((res) => {
          console.log(res);
          if (res.status === 200) {
            setUser(res.data);
          }
        });
        setFormLogin(true);
      }
      if (res.refresh_token) {
        localStorage.setItem('refresh_token', res.refresh_token);
        setRefreshToken(res.refresh_token);
      }
      if (res.access_token) {
        localStorage.setItem('access_token', res.access_token);
        setAccessToken(res.access_token);
      }
      if (res.token_type) {
        localStorage.setItem('token_type', res.token_type);
        setTokenType(res.token_type);
      }
    });
  }

  return (
    <div className="section">
      <div className="container-logo">
        <div className="row full-height justify-content-center">
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
                onClick={() => setIsChecked(!isChecked)}
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Вхід</h4>
                        <div className="form-group">
                          <input
                            type="email"
                            name="logemail"
                            value={inputEmail}
                            className="form-style"
                            placeholder="Ваш Емейл"
                            id="logemail"
                            autocomplete="off"
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
                            autocomplete="off"
                            onChange={(e) => setInputPassword(e.target.value)}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <a href="#/" className="btn-login mt-4">Увійти</a>
                        <a
                          href="#/"
                          className="btn-login mt-4"
                          onClick={handleGoogleAutorization}
                        >
                          Увійти через Google
                        </a>
                        <a
                          href="#/"
                          className="btn-login mt-4"
                          onClick={handleLogin}
                        >
                          Пропустити
                        </a>
                        {/* <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p> */}
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Реістрація</h4>
                        <div className="form-group">
                          <input
                            value={inputName}
                            type="text"
                            name="logname"
                            className="form-style"
                            placeholder="Ваше Імʼя"
                            id="logname"
                            autocomplete="off"
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
                            autocomplete="off"
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
                            id="logemail"
                            autocomplete="off"
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
                            id="logpass"
                            autocomplete="off"
                            onChange={(e) => setInputPassword(e.target.value)}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <a href="#/" className="btn-login mt-4" onClick={handleRegistration}>
                          Зареєструватися
                        </a>
                      </div>
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
}
