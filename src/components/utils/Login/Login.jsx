import React, { useEffect, useState } from 'react';
import './Login.scss';
import cn from 'classnames';
import { getCurentUser, sendToken, SignUp } from '../../../utils/fetch';
// import { useNavigate } from 'react-router-dom';
import useStoreAuth from '../../../utils/StoreAuth';
import { CustomAlert } from '../../../utils/CustomAlert/CustomAlert';
import { useLocation } from 'react-router-dom';


export const Login = () => {
  // const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  // const user = useStoreAuth((state) => state.user);
  const setUser = useStoreAuth((state) => state.setUser);
  // const formLogin = useStoreAuth((state) => state.formLogin);
  const setFormLogin = useStoreAuth((state) => state.setFormLogin);
  const [inputName, setInputName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const location = useLocation();

  useEffect(() => {
    // function send() {
    //   var req = new XMLHttpRequest();
    //   req.onreadystatechange = function () {
    //     if (req.readyState === 4) {
    //       console.log(req.response);
    //       if (req.response["result"] === true) {
    //         window.localStorage.setItem('jwt', req.response["access_token"]);
    //         window.localStorage.setItem('refresh', req.response["refresh_token"]);
    //       }
    //     }
    //   }
    //   req.withCredentials = true;
    //   req.responseType = 'json';
    //   req.open("get", "https://3489-194-44-160-206.ngrok-free.app/api/auth/token?" + window.location.search.substr(1), true);
    //   req.send("");

    // }


    // async function send() {
    //   try {
    //     const response = await fetch("https://3489-194-44-160-206.ngrok-free.app/api/auth/token?" + window.location.search.substr(1), {
    //       method: "GET",
    //       credentials: "include" // Включити куки
    //     });

    //     if (response.ok) {
    //       const data = await response.json();
    //       if (data.result === true) {
    //         window.localStorage.setItem('jwt', data.access_token);
    //         window.localStorage.setItem('refresh', data.refresh_token);
    //       }
    //     } else {
    //       console.error('Request failed with status:', response.status);
    //     }
    //   } catch (error) {
    //     console.error('Request failed:', error);
    //   }
    // }




    // function send() {
    //   var req = new XMLHttpRequest();
    //   req.onreadystatechange = function () {
    //     if (req.readyState === 4) { // Запит завершено
    //       if (req.status === 200) { // Перевірка статусу HTTP відповіді
    //         const response = req.response;
    //         if (response.result === true) { // Перевірка результату
    //           window.localStorage.setItem('jwt', response.access_token);
    //           window.localStorage.setItem('refresh', response.refresh_token);
    //         } else {
    //           console.error('Authentication failed');
    //         }
    //       } else {
    //         console.error('Request failed with status:', req.status);
    //       }
    //     }
    //   };

    //   req.withCredentials = true; // Включення відправки куків
    //   req.responseType = 'json'; // Встановлення типу відповіді
    //   req.open("GET", "/api/auth/token?" + window.location.search.substr(1), true);
    //   req.send();
    // }
    // send();



    // Тут перевіряємо, чи є у URL потрібні параметри
    const searchParams = new URLSearchParams(location.search);

    const token = searchParams.get('token');  // Приклад: витягуємо токен з URL
    // // const token = searchParams.get('token');  // Приклад: витягуємо токен з URL

    if (token) {
      console.log('Token:', token);
      // Ти можеш зберегти токен у localStorage або в контексті
      localStorage.setItem('token', token);
      // Додатково можна зробити редирект на іншу сторінку
      // window.location.href = '/dashboard';
    }

    sendToken().then((res) => {
      console.log(res);
    });
  }, [location]);

  // const setAccessToken = useStore((state) => state.setAccessToken);
  // const setRefreshToken = useStore((state) => state.setRefreshToken);
  // const setTokenType = useStore((state) => state.setTokenType);

  // const handleLogin = () => {
  //   navigate('./test')
  // if (inputEmail === '' || inputPassword === '') {
  //   alert('Заповніть всі поля');
  //   return;
  // }

  // const data = {
  //   email: inputEmail,
  //   password: inputPassword //str(min_length = 6)
  // };

  // SignIn(data).then((res) => {
  //   console.log(res);
  //   if (res.status === 200) {
  //     alert('Ви успішно увійшли');
  //     getCurentUser().then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         setUser(res.data);
  //       }
  //     });
  //     // if (res.refresh_token) {
  //     //   localStorage.setItem('refresh_token', res.refresh_token);
  //     //   setRefreshToken(res.refresh_token);
  //     // }
  //     // if (res.access_token) {
  //     //   localStorage.setItem('access_token', res.access_token);
  //     //   setAccessToken(res.access_token);
  //     // }
  //     // if (res.token_type) {
  //     //   localStorage.setItem('token_type', res.token_type);
  //     //   setTokenType(res.token_type);
  //     // }
  //   }
  // });
  // setFormLogin(true);
  // }

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

  const handleGoogleAutorization = () => {
    // window.location.href = 'http://google.com';
    // window.location.href = '/menu';
    // setFormLogin(true);
    // nsvigate('/test-page');

    window.location.href = 'https://3489-194-44-160-206.ngrok-free.app/api/auth/google_login';
    // googleAutorization().then((res) => {
    //   console.log(res || 'no data');
    //   console.table(res);
    //   const googleAuthUrl = res.url;
    //   console.log(googleAuthUrl);

    // if (res.status === 200) {
    //   alert('Ви успішно увійшли');
    //   getCurentUser().then((res) => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       setUser(res.data);
    //     }
    //   });
    //   // setFormLogin(true);
    // }

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
    // });
  }
  function showAlert() {
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
      alertBox.classList.add('show');
    }
  }
  return (
    <div className="section">
      <div className="container-logo">
        <CustomAlert
          massage="Дякуємо за реєстрацію. На ваш email відправлено лист для підтвердження та посилання на наш телеграм бот"
          link="https://www.google.com/search?q=%D0%B5%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D0%BD%D0%BD%D0%B0+%D0%BF%D0%BE%D1%88%D1%82%D0%B0&sca_esv=3586d42fed26ceb9&sxsrf=ADLYWILaOwZnwhtt3Q-kYpCOmoF4PidVLQ%3A1724018679391&source=hp&ei=92_CZp2nFbH7wPAPuojF2Ak&iflsig=AL9hbdgAAAAAZsJ-B2NFmF8gXhbSLnptvMFnaWm-nmvH&oq=%D0%B5%D0%BB%D0%BA%D1%83%D1%82%D1%80%D0%BE%D0%BD%D0%B0&gs_lp=Egdnd3Mtd2l6IhLQtdC70LrRg9GC0YDQvtC90LAqAggBMgoQABiABBixAxgNMgoQABiABBixAxgNMgcQABiABBgNMgoQABiABBixAxgNMgoQABiABBixAxgNMgoQABiABBixAxgNMgcQABiABBgNMgcQABiABBgNMgcQABiABBgNMg0QABiABBixAxiDARgNSLdlUJADWKJYcAd4AJABAJgBYKAB0wqqAQIxNbgBAcgBAPgBAZgCFqACnQuoAgrCAgcQIxgnGOoCwgIKECMYgAQYJxiKBcICBBAjGCfCAg4QLhiABBixAxjRAxjHAcICFxAuGIAEGLEDGIMBGMcBGJgFGJkFGK8BwgIREC4YgAQYsQMY0QMYgwEYxwHCAgUQABiABMICCxAAGIAEGLEDGIMBwgIOEAAYgAQYsQMYgwEYigXCAggQLhiABBixA8ICCBAAGIAEGLEDwgILEC4YgAQYsQMYgwHCAgsQLhiABBjRAxjHAcICEBAAGIAEGLEDGIMBGIoFGArCAgsQLhiABBjHARivAcICBxAAGIAEGArCAg0QLhiABBjRAxjHARgKwgIFEC4YgATCAgwQIxiABBgTGCcYigXCAg4QLhiABBixAxiDARiKBcICDhAuGIAEGLEDGMcBGK8BwgIEEAAYA8ICChAAGIAEGLEDGAqYAwSSBwQyMC4yoAf0qQE&sclient=gws-wiz"
          buttonText="Перевірити пошту"
        />
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
                          href="https://3489-194-44-160-206.ngrok-free.app/api/auth/google_login"
                          className="btn-login mt-4"
                        // onClick={handleGoogleAutorization}
                        >
                          Увійти через Google
                        </a>
                        <a
                          href="#/"
                          className="btn-login mt-4"
                          onClick={() => setFormLogin(true)}
                        >
                          Пропустити
                        </a>
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
  );
};
