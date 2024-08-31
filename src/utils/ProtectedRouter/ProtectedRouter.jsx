/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, Navigate } from "react-router-dom";
import useStoreAuth from "../StoreAuth";
import { useEffect } from "react";
// import Cookies from 'js-cookie';
// import { SERVER_URL } from '../../services/httpClient';
// import { gapi } from 'gapi-script';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from "react";



export const ProtectedRoutes = () => {
  // const navigate = useNavigate();

  // const clientId = '731360179208-0ddqgcdfserhm8s6g5ecinq7158gguk0.apps.googleusercontent.com';
  // const loading = useStoreAuth((state) => state.loading);
  const authenticated = useStoreAuth((state) => state.authenticated);

  // const setAccessToken = useStoreAuth((state) => state.setAccessToken);
  // const setRefreshToken = useStoreAuth((state) => state.setRefreshToken);
  // const setTokenType = useStoreAuth((state) => state.setTokenType);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (accessToken) {
  //     setAuthenticated(true);
  //   }
  // }, [accessToken, setAuthenticated]);
  // useEffect(() => {
  //   if (accessToken) {
  //     setAuthenticated(true);
  //     navigate('/menu');
  //   } else {
  //     if (!accessToken) {
  //       function start() {
  //         gapi.client.init({
  //           clientId: clientId,
  //           scope: 'profile email',
  //         }).then(() => {
  //           const authInstance = gapi.auth2.getAuthInstance();
  //           console.log('authInstance:', authInstance);
  //           if (authInstance.isSignedIn.get()) {
  //             const accessTokenGet = authInstance.currentUser.get().getAuthResponse().access_token;
  //             setAccessToken(accessTokenGet);
  //             // setAuthenticated(true);
  //             console.log('accessToken:', accessTokenGet);
  //             // alert('ProtectedRoutes');
  //             // setAuthenticated(true);
  //             // navigate('/');
  //           }
  //         });
  //       }

  //       gapi.load('client:auth2', start);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   const handleGoogleSignIn = async () => {
  //     // Перевіряємо, чи існує об'єкт google, щоб уникнути помилки
  //     if (typeof google !== 'undefined') {
  //       const client = google.accounts.oauth2.initTokenClient({
  //         client_id: clientId,
  //         scope: 'profile email',
  //         callback: (response) => {
  //           const accessTokenGet = response.access_token;
  //           setAccessToken(accessTokenGet);
  //           console.log('accessToken:', accessTokenGet);
  //           setAuthenticated(true);
  //         },
  //       });
  //       client.requestAccessToken();
  //     } else {
  //       console.error('Google Identity Services script not loaded');
  //     }
  //   };

  //   handleGoogleSignIn();
  // }, []);


  //Cookies
  // useEffect(() => {
  //   alert('ProtectedRoutes');
  //   const handleToken = async () => {
  //     const storedAccessToken = Cookies.get('access_token');
  //     const storedRefreshToken = Cookies.get('refresh_token');

  //     if (storedAccessToken || storedRefreshToken) {
  //       // Зберігаємо токени у стані
  //       setAccessToken(storedAccessToken);
  //       setRefreshToken(storedRefreshToken);
  //       localStorage.setItem('access_token', storedAccessToken);
  //       localStorage.setItem('refresh_token', storedRefreshToken);
  //       console.log('access_token:', storedAccessToken);
  //       console.log('refresh_token:', storedRefreshToken);
  //     } else {
  //       setAuthenticated(false);
  //     }
  //   };

  //   handleToken();
  // }, [setAccessToken, setRefreshToken, setTokenType]);

  //URL
  // useEffect(() => {
  //   // Витягування параметрів з URL
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const authCode = urlParams.get('code');
  //   // const state = urlParams.get('state'); // Інші параметри, якщо потрібно

  //   if (authCode) {
  //     // Надсилання коду на сервер для обміну на токени
  //     fetch(`${SERVER_URL}/api/auth/token`, {
  //       method: 'GET',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${authCode}`,
  //       },
  //       // body: JSON.stringify({ code: authCode }),
  //     })
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }

  //         // Витягування токенів з заголовків відповіді
  //         const accessToken = response.headers.get('access_token');
  //         const refreshToken = response.headers.get('refresh_token');
  //         const tokenType = response.headers.get('token_type');

  //         // Перевірка наявності токенів
  //         if (accessToken || refreshToken || tokenType) {
  //           // Зберігання токенів у cookies або localStorage
  //           Cookies.set('access_token', accessToken);
  //           Cookies.set('refresh_token', refreshToken);

  //           // Перенаправлення користувача на основну сторінку
  //           // navigate('/menu');
  //           setAuthenticated(true);
  //         } else {
  //           throw new Error('Token headers are missing');
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error exchanging token:', error);
  //       });
  //   } else {
  //     // Обробка випадку, коли код відсутній
  //     console.error('No authorization code found in URL');
  //   }
  // }, [navigate]);
  // if (loading) {
  //   return <div>Loading...</div>;  // Можна показати індикатор завантаження
  // }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
