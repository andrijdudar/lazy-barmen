import React, { useState } from 'react';
import './Login.scss';
import cn from 'classnames';
import { getCurentUser, googleAutorization, SignUp } from '../../../utils/fetch';
// import { useNavigate } from 'react-router-dom';
import useStoreAuth from '../../../utils/StoreAuth';
import { CustomAlert } from '../../../utils/CustomAlert/CustomAlert';
// import { useLocation, useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../../services/httpClient';
import Cookies from 'js-cookie';



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
  const setAccessToken = useStoreAuth((state) => state.setAccessToken);
  const setRefreshToken = useStoreAuth((state) => state.setRefreshToken);
  const setTokenType = useStoreAuth((state) => state.setTokenType);


  // localStorage.clear();


  // const location = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  // const allCookies = Cookies.get();
  // console.log('cookies:', allCookies);
  // for (let i = 0; i < localStorage.length; i++) {
  //   const key = localStorage.key(i);
  //   const value = localStorage.getItem(key);
  //   console.log(`${key}: ${value}`);
  // }

  // const access_token = Cookies.get('access_token');
  // const refresh_token = Cookies.get('refresh_token');

  // // setAccessToken(access_token);
  // // setRefreshToken(refresh_token);
  // console.log('access_token_cook:', access_token);
  // console.log('refresh_token_coock:', refresh_token);

  // localStorage.setItem('access_token', access_token);
  // localStorage.setItem('refresh_token', refresh_token);
  // console.log('access_token_local:', localStorage.getItem('access_token'));
  // console.log('refresh_token_local:', localStorage.getItem('refresh_token'));




  //   const fetchTokens = async () => {
  //   // const queryParams = location.search.substring(1);
  //   // const code = queryParams.get('code');
  //   // console.log('code:', code);

  //     // if (true) {
  //       try {
  //         // Відправляємо код на бекенд для обміну на токен
  //   const response = await fetch(SERVER_URL, {
  //           method: 'GET',
  //           headers: {
  //             // 'Authorization': queryParams,
  //             'Content-Type': 'application/json',
  //             // 'Accept': 'application/json',
  //           },
  //           // mode: 'no-cors',
  //           credentials: 'include', // Якщо потрібно передавати куки
  //           // params: queryParams,
  //         });

  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         const accessToken = response.headers.get('access_token');
  //         const refreshToken = response.headers.get('refresh-token');
  //         const tokenType = response.headers.get('token_type');
  //         const allHeaders = response.headers;

  //         console.log('access_token_header:', accessToken);
  //         console.log('refresh_token_header:', refreshToken);
  //         console.log('token_type_header:', tokenType);
  //         console.log('allHeaders:', allHeaders);
  //         const allCookies = Cookies.get();
  //         console.log('cookies:', allCookies);
  //         // Отримуємо дані з відповіді
  //         const data = await response.json();
  //         const { access_token, refresh_token } = data;

  //         // Зберігаємо токен у локальному сховищі або cookies
  //         localStorage.setItem('access_token', access_token);
  //         localStorage.setItem('refresh_token', refresh_token);
  //         console.log('access_token:', access_token);
  //         console.log('refresh_token:', refresh_token);

  //         // Перенаправляємо користувача на головну сторінку або dashboard
  //         // navigate('/dashboard');
  //       } catch (error) {
  //         console.error('Authentication failed:', error);
  //       }
  //     // }
  //   };

  //   fetchTokens();
  // }, []);


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

    window.location.href = SERVER_URL + '/api/auth/google_login';
    googleAutorization().then((res) => {
      console.log(res || 'no data');

      const accessToken = res.headers.get('access_token');
      const refreshToken = res.headers.get('refresh-token');
      const tokenType = res.headers.get('token_type');
      const allHeaders = res.headers;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setTokenType(tokenType);

      console.log('access_token_header:', accessToken);
      console.log('refresh_token_header:', refreshToken);
      console.log('token_type_header:', tokenType);
      console.log('allHeaders:', allHeaders);
      const allCookies = Cookies.get();
      console.log('cookies:', allCookies);
      // Отримуємо дані з відповіді
      const data = res.json();
      const { access_token, refresh_token } = data;

      // Зберігаємо токен у локальному сховищі або cookies
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      console.log('access_token:', access_token);
      console.log('refresh_token:', refresh_token);
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
      // setFormLogin(true);
    }).catch(error => {
      console.error('Authentication failed:', error);
    });
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
                          href='#/'
                          // href={SERVER_URL + "/api/auth/google_login"}
                          className="btn-login mt-4"
                          onClick={handleGoogleAutorization}
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
