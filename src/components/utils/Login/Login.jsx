// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from 'react';
// import './Login.scss';
// import cn from 'classnames';
// import { getCurentUser, SignUp } from '../../../utils/fetch';
// import useStoreAuth from '../../../utils/StoreAuth';
// // import { CustomAlert } from '../../../utils/CustomAlert/CustomAlert';
// // import { SERVER_URL } from '../../../services/httpClient';
// // import { gapi } from 'gapi-script';
// import { Outlet, useNavigate } from 'react-router-dom';
// // import { useGoogleLogin } from '@leecheuk/react-google-login';
// // import { Loading } from '../../../utils/Loading/Loading';
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from 'axios';
// import Cookies from 'js-cookie';


// // server_metadata_url = 'https://accounts.google.com/.well-known/openid-configuration'



// export const Login = () => {
//   const navigate = useNavigate();
//   const [isChecked, setIsChecked] = useState(false);
//   const user = useStoreAuth((state) => state.user);
//   const setUser = useStoreAuth((state) => state.setUser);
//   const profile = useStoreAuth((state) => state.profile);
//   const setProfile = useStoreAuth((state) => state.setProfile);
//   const setFormLogin = useStoreAuth((state) => state.setFormLogin);
//   const [inputName, setInputName] = useState('');
//   const [inputLastName, setInputLastName] = useState('');
//   const [inputEmail, setInputEmail] = useState('');
//   const [inputPassword, setInputPassword] = useState('');
//   const accessToken = useStoreAuth((state) => state.access_token);
//   const setAccessToken = useStoreAuth((state) => state.setAccessToken);
//   // const loading = useStoreAuth((state) => state.loading);

//   const consolee = () => {
//     console.log(user);
//     console.log(profile);
//     console.log(accessToken);


//   }




//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => {
//       // setUser(codeResponse);
//       // setProfile(codeResponse.access_token);

//       setUser(codeResponse);
//       console.log(codeResponse);
//       console.log(codeResponse.access_token);
//       localStorage.setItem('access_token', codeResponse.access_token);
//       sessionStorage.setItem('access_token', codeResponse.access_token);
//       setAccessToken(codeResponse.access_token);
//       Cookies.set('access_token', codeResponse.access_token, { expires: 7 }); // Кука зберігатиметься 7 днів
//       // Cookies.remove('access_token');

//       // showAlert();

//     },
//     onError: (error) => console.log("Login Failed:", error)
//   });
//   // const login = () => {
//     // window.location.href = 'https://ee4c-194-44-160-206.ngrok-free.app/api/auth/google_login';
//   // }

//   // useEffect(() => {
//   //   // Отримуємо URL з браузера
//   //   const url = new URL(window.location.href);
//   //   console.log('URL:', url);

//   //   // Витягуємо authToken з URL параметрів
//   //   const authToken = url.searchParams.get('code');
//   //   console.log('authToken:', authToken);
//   //   // "https://andrijdudar.github.io/lazy-barmen/?state=MyO3py7RTzJhjM0BVlPeU6PhNtzCcX&code=4%2F0AQlEd8x2DSFWHNSjRmI0xcfS_8O4dCzp76mzotFLrMBbsNbI06jPJ2iw6z2-nLZ1a34hBg&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=2&prompt=consent"

//   //   if (authToken) {
//   //     // Відправляємо authToken на сервер
//   //     fetch('https://6c4f-194-44-160-206.ngrok-free.app/api/auth/token', {
//   //       method: 'GET',
//   //       headers: {
//   //         'authToken': `Bearer ${authToken}`,
//   //         'Content-Type': 'application/json',
//   //       }
//   //       // body: JSON.stringify({ token: authToken }),
//   //     })
//   //       .then(response => response.json())
//   //       .then(data => {
//   //         console.log('Response from server:', data);
//   //         // Перенаправляємо користувача на іншу сторінку після успішного запиту
//   //         // navigate('/dashboard');
//   //       })
//   //       .catch(error => {
//   //         console.error('Error sending authToken to server:', error);
//   //       });
//   //   } else {
//   //     console.error('No authToken found in URL');
//   //   }
//   // }, []);

//   useEffect(() => {
//     if (user) {
//         // showAlert();

//       axios
//         .get(
//           `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
//         // .get(
//         //   `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
//           {
//             headers: {
//               Authorization: `Bearer ${user.access_token}`,
//               Accept: "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           console.log(res);
//           console.log('юзер', res.data);
//           setProfile(res.data);
//           localStorage.setItem('profile', JSON.stringify(res.data));
//           sessionStorage.setItem('profile', JSON.stringify(res.data));
//           const allCookies = Cookies.get();
//           console.log('куки', allCookies);
//           navigate('/list');
//         })
//         .catch((err) => console.log(err));
//     }
//   }, [user]);



//   const handleRegistration = () => {
//     if (inputName === '' || inputLastName === '' || inputEmail === '' || inputPassword === '') {
//       alert('Заповніть всі поля');
//       return;
//     }
//     if (inputPassword.length < 6) {
//       alert('Пароль повинен містити не менше 6 символів');
//       return;
//     }
//     const data = {
//       first_name: inputName,
//       last_name: inputLastName,
//       email: inputEmail,
//       password: inputPassword //str(min_length = 6)
//     };
//     console.log(data);
//     SignUp(data).then((res) => {
//       getCurentUser().then((res) => {
//         if (res.status === 200) {
//           console.log(res);
//           setUser(res.data);
//         }
//       });
//       console.log(res);
//       if (res.status === 200) {
//         alert('Ви успішно зареєструвались');
//         setFormLogin(true);
//       }
//       if (res.status === 400) {
//         alert('Користувач з таким емейлом вже існує');
//       }
//       if (res.status === 500) {
//         alert('Щось пішло не так');
//       }
//       if (res.status === 404) {
//         alert('Сервер не знайдено');
//       }
//       if (res.status === 401) {
//         alert('Неавторизований доступ');
//       }
//       if (res.status === 403) {
//         alert('Доступ заборонено');
//       }
//       // if (res.refresh_token) {
//       //   localStorage.setItem('refresh_token', res.refresh_token);
//       //   setRefreshToken(res.refresh_token);
//       // }
//       // if (res.access_token) {
//       //   localStorage.setItem('access_token', res.access_token);
//       //   setAccessToken(res.access_token);
//       // }
//       // if (res.token_type) {
//       //   localStorage.setItem('token_type', res.token_type);
//       //   setTokenType(res.token_type);
//       // }
//       setFormLogin(true);
//     });
//   }

//   // const handleGoogleAutorization = () => {
//   //   window.location.href = SERVER_URL + '/api/auth/google_login';
//   // }


//   // function showAlert() {
//   //   const alertBox = document.getElementById('custom-alert');
//   //   if (alertBox) {
//   //     alertBox.classList.add('show');
//   //   }
//   // }


//   return (
//     <>
//       {accessToken ? <Outlet /> :
//         <div className="section" >
//           <div className="container-logo">
//             <div className="row full-height justify-content-center">
//               {/* {loading ? <Loading /> : */}
//               <div className="col-12 text-center align-self-center py-5">
//                 <div className="section pb-5 pt-5 pt-sm-2 text-center">
//                   <h6 className="mb-0 pb-3">
//                     <button
//                       type='button'
//                       className={cn('span', { 'active': !isChecked })}
//                       onClick={() => setIsChecked(false)}
//                     >
//                       Увійти
//                     </button>
//                     <button
//                       type='button'
//                       className={cn('span', { 'active': isChecked })}
//                       onClick={() => setIsChecked(true)}
//                     >
//                       Реістрація
//                     </button>
//                   </h6>
//                   <input
//                     className="checkbox"
//                     type="checkbox"
//                     id="reg-log"
//                     name="reg-log"
//                     checked={isChecked}
//                     onChange={() => setIsChecked(!isChecked)}
//                   />

//                   <label htmlFor="reg-log"></label>
//                   <div className="card-3d-wrap mx-auto">
//                     <div className="card-3d-wrapper">
//                       <div className="card-front">
//                         <div className="center-wrap">
//                           <form className="section text-center">
//                             <h4 className="mb-4 pb-3">Вхід</h4>
//                             {/* <div className="form-group">
//                               <input
//                                 type="email"
//                                 name="logemail"
//                                 value={inputEmail}
//                                 className="form-style"
//                                 placeholder="Ваш Емейл"
//                                 id="logemail"
//                                 autoComplete="off"
//                                 onChange={(e) => setInputEmail(e.target.value)}
//                               />
//                               <i className="input-icon uil uil-at"></i>
//                             </div>
//                             <div className="form-group mt-2">
//                               <input
//                                 type="password"
//                                 name="logpass"
//                                 value={inputPassword}
//                                 className="form-style"
//                                 placeholder="Ваш Пароль"
//                                 id="logpass"
//                                 autoComplete="off"
//                                 onChange={(e) => setInputPassword(e.target.value)}
//                               />
//                               <i className="input-icon uil uil-lock-alt"></i>
//                             </div> */}
//                             <button
//                               type='button'
//                               className="btn-login mt-4"
//                               onClick={consolee}
//                             >
//                               Увійти
//                             </button>
//                             {/* <a
//                                 // href='#/'
//                               href="https://6c4f-194-44-160-206.ngrok-free.app/api/auth/google_login"
//                                 className="btn-login mt-4"
//                               // onClick={handleGoogleAutorization}
//                               >
//                                 Увійти через Google
//                               </a> */}
//                             <button className='btn-login mt-4' onClick={login}>Login with Google ClientId</button>

//                             {/* <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p> */}
//                           </form>
//                         </div>
//                       </div>
//                       <div className="card-back">
//                         <div className="center-wrap">
//                           <form className="section text-center">
//                             <h4 className="mb-4 pb-3">Реістрація</h4>
//                             <div className="form-group">
//                               <input
//                                 value={inputName}
//                                 type="text"
//                                 name="logname"
//                                 className="form-style"
//                                 placeholder="Ваше Імʼя"
//                                 id="logname"
//                                 autoComplete="off"
//                                 onChange={(e) => setInputName(e.target.value)}
//                               />
//                               <i className="input-icon uil uil-user"></i>
//                             </div>
//                             <div className="form-group mt-2">
//                               <input
//                                 value={inputLastName}
//                                 type="text"
//                                 name="logname"
//                                 className="form-style"
//                                 placeholder="Ваше Прізвище"
//                                 id="logLastName"
//                                 autoComplete="off"
//                                 onChange={(e) => setInputLastName(e.target.value)}
//                               />
//                               <i className="input-icon uil uil-user"></i>
//                             </div>
//                             <div className="form-group mt-2">
//                               <input
//                                 value={inputEmail}
//                                 type="email"
//                                 name="logemail"
//                                 className="form-style"
//                                 placeholder="Ваш Емейл"
//                                 id="logemail1"
//                                 autoComplete="off"
//                                 onChange={(e) => setInputEmail(e.target.value)}
//                               />
//                               <i className="input-icon uil uil-at"></i>
//                             </div>
//                             <div className="form-group mt-2">
//                               <input
//                                 value={inputPassword}
//                                 type="password"
//                                 name="logpass"
//                                 className="form-style"
//                                 placeholder="Ваш Пароль"
//                                 id="logpass1"
//                                 autoComplete="off"
//                                 onChange={(e) => setInputPassword(e.target.value)}
//                               />
//                               <i className="input-icon uil uil-lock-alt"></i>
//                             </div>
//                             <a href="#/" className="btn-login mt-4" onClick={handleRegistration}>
//                               Зареєструватися
//                             </a>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       }
//     </>
//   );
// };
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './Login.scss';
import cn from 'classnames';
import { getCurentUser, SignUp } from '../../../utils/fetch';
import useStoreAuth from '../../../utils/StoreAuth';
import { CustomAlert } from '../../../utils/CustomAlert/CustomAlert';
// import { SERVER_URL } from '../../../services/httpClient';
// import { gapi } from 'gapi-script';
import { Outlet, useNavigate } from 'react-router-dom';
import { Loading } from '../../../utils/Loading/Loading';
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import Cookies from 'js-cookie';






export const Login = () => {
  // const clientId = '731360179208-0ddqgcdfserhm8s6g5ecinq7158gguk0.apps.googleusercontent.com';
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const user = useStoreAuth((state) => state.user);
  const setUser = useStoreAuth((state) => state.setUser);
  const profile = useStoreAuth((state) => state.profile);
  const setProfile = useStoreAuth((state) => state.setProfile);
  const setFormLogin = useStoreAuth((state) => state.setFormLogin);
  const [inputName, setInputName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const accessToken = useStoreAuth((state) => state.access_token);

  const setAccessToken = useStoreAuth((state) => state.setAccessToken);
  const loading = useStoreAuth((state) => state.loading);
  // const setLoading = useStoreAuth((state) => state.setLoading);
  // const authenticated = useStoreAuth((state) => state.authenticated);
  // const setAuthenticated = useStoreAuth((state) => state.setAuthenticated);
  // localStorage.clear();

  const consolee = () => {
      console.log(user);
      console.log(profile);
      console.log(accessToken);


    }

  const handleLogoutSuccess = () => {
    setUser(null);
    setAccessToken(null);
    setProfile(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('profile');
    Cookies.remove('access_token');

  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      console.log(codeResponse);
      localStorage.setItem('access_token', codeResponse.access_token);
      sessionStorage.setItem('access_token', codeResponse.access_token);
      // setAccessToken(codeResponse.access_token);
      Cookies.set('access_token', codeResponse.access_token, { expires: 7 }); // Кука зберігатиметься 7 днів

    },
    onError: (error) => console.log("Login Failed:", error)
  });

  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res);
  //         console.log('юзер', res.data);
  //         setProfile(res.data);
  //         localStorage.setItem('profile', JSON.stringify(res.data));
  //         sessionStorage.setItem('profile', JSON.stringify(res.data));
  //         const allCookies = Cookies.get();
  //         console.log('куки', allCookies);
  //         navigate('/list');
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);

  // if (accessToken) {
  // setAuthenticated(true);

  // navigate('/list');
  // }

  // useEffect(() => {
  // if (authenticated) {

  // navigate('/');
  // } else {
  // setLoading(false);  // Завантаження завершено, коли користувач не авторизований
  // }
  // if (accessToken) {
  //   setAuthenticated(true);
  //   navigate('/');
  // }
  // if (!accessToken) {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: 'profile email',
  //     }).then(() => {
  //       const authInstance = gapi.auth2.getAuthInstance();
  //       console.log('authInstance:', authInstance);
  //       if (authInstance.isSignedIn.get()) {
  //         const accessTokenGet = authInstance.currentUser.get().getAuthResponse().access_token;
  //         setAccessToken(accessTokenGet);
  //         // setAuthenticated(true);
  //         console.log('accessToken:', accessTokenGet);
  //         // alert('ProtectedRoutes');
  //         // setAuthenticated(true);
  //         // navigate('/');
  //       }
  //     });
  //   }

  //   gapi.load('client:auth2', start);
  // }
  // }, []);
  // console.log('accessToken:', accessToken);

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: '',
  //     })
  //   };
  //   gapi.load('client:auth2', start);
  // }, []);
  // const accessToken = gapi.auth.getToken().access_token;
  // setAccessToken(accessToken);

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
      {/* {accessToken ? <Outlet /> : */}
      {profile ? <Outlet /> :
        <div className="section" >
          <div className="container-logo">
            <CustomAlert
              massage="Дякуємо за реєстрацію. На ваш email відправлено лист для підтвердження та посилання на наш телеграм бот"
              link="https://www.google.com/search?q=%D0%B5%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D0%BD%D0%BD%D0%B0+%D0%BF%D0%BE%D1%88%D1%82%D0%B0&sca_esv=3586d42fed26ceb9&sxsrf=ADLYWILaOwZnwhtt3Q-kYpCOmoF4PidVLQ%3A1724018679391&source=hp&ei=92_CZp2nFbH7wPAPuojF2Ak&iflsig=AL9hbdgAAAAAZsJ-B2NFmF8gXhbSLnptvMFnaWm-nmvH&oq=%D0%B5%D0%BB%D0%BA%D1%83%D1%82%D1%80%D0%BE%D0%BD%D0%B0&gs_lp=Egdnd3Mtd2l6IhLQtdC70LrRg9GC0YDQvtC90LAqAggBMgoQABiABBixAxgNMgoQABiABBixAxgNMgcQABiABBgNMgoQABiABBixAxgNMgoQABiABBixAxgNMgoQABiABBixAxgNMgcQABiABBgNMgcQABiABBgNMgcQABiABBgNMg0QABiABBixAxiDARgNSLdlUJADWKJYcAd4AJABAJgBYKAB0wqqAQIxNbgBAcgBAPgBAZgCFqACnQuoAgrCAgcQIxgnGOoCwgIKECMYgAQYJxiKBcICBBAjGCfCAg4QLhiABBixAxjRAxjHAcICFxAuGIAEGLEDGIMBGMcBGJgFGJkFGK8BwgIREC4YgAQYsQMY0QMYgwEYxwHCAgUQABiABMICCxAAGIAEGLEDGIMBwgIOEAAYgAQYsQMYgwEYigXCAggQLhiABBixA8ICCBAAGIAEGLEDwgILEC4YgAQYsQMYgwHCAgsQLhiABBjRAxjHAcICEBAAGIAEGLEDGIMBGIoFGArCAgsQLhiABBjHARivAcICBxAAGIAEGArCAg0QLhiABBjRAxjHARgKwgIFEC4YgATCAgwQIxiABBgTGCcYigXCAg4QLhiABBixAxiDARiKBcICDhAuGIAEGLEDGMcBGK8BwgIEEAAYA8ICChAAGIAEGLEDGAqYAwSSBwQyMC4yoAf0qQE&sclient=gws-wiz"
              buttonText="Перевірити пошту"
            />
            <div className="row full-height justify-content-center">
              {loading ? <Loading /> :
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
                                onClick={consolee}
                              >
                                Увійти
                              </button>
                              {/* <a
                                // href='#/'
                                href={SERVER_URL + "/api/auth/google_login"}
                                className="btn-login mt-4"
                              // onClick={handleGoogleAutorization}
                              >
                                Увійти через Google
                              </a> */}
                              {/* <GoogleLogin
                                clientId={clientId}
                                buttonText="Login with Google"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                                className='btn-login mt-4 '
                              /> */}
                              {/* <GoogleLogin
                                onSuccess={credentialResponse => {
                                  console.log(credentialResponse);
                                }}
                                onError={() => {
                                  console.log('Login Failed');
                                }}
                              /> */}
                              <a
                                href="#/"
                                className="btn-login mt-4"
                                onClick={handleLogoutSuccess}
                              >
                                Logout
                              </a>
                              <button className='btn-login mt-4' onClick={login}>Login with Google</button>

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
                </div>}
            </div>
          </div>
        </div>
      }
    </>
  );
};
