/* eslint-disable react-hooks/exhaustive-deps */

import { Outlet, Navigate } from "react-router-dom";
import useStoreAuth from "../StoreAuth";
import { useEffect } from "react";
import Cookies from 'js-cookie';

// import { SERVER_URL } from '../../services/httpClient';


export const ProtectedRoutes = () => {
  const accsessToken = useStoreAuth((state) => state.access_token);
  const setAccessToken = useStoreAuth((state) => state.setAccessToken);
  const refreshToken = useStoreAuth((state) => state.refresh_token);
  const setRefreshToken = useStoreAuth((state) => state.setRefreshToken);
  // const location = useLocation();
  // const navigate = useNavigate();
  //
  useEffect(() => {

    const allCookies = Cookies.get();
    console.log('cookies:', allCookies);

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      console.log(`${key}: ${value}`);
    }

    const access_token = Cookies.get('access_token');
    const refresh_token = Cookies.get('refresh_token');

    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    console.log('access_token_cook:', access_token);
    console.log('refresh_token_coock:', refresh_token);

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    console.log('access_token_local:', localStorage.getItem('access_token'));
    console.log('refresh_token_local:', localStorage.getItem('refresh_token'));


    //   const fetchTokens = async () => {
    //     // Отримуємо код із URL
    //     const queryParams = new URLSearchParams(location.search);
    //     const code = queryParams.get('code');

    //     if (code) {
    //       try {
    //         // Відправляємо код на бекенд для обміну на токен
    //         const response = await fetch(SERVER_URL + '/auth/token', {
    //           method: 'GET',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           credentials: 'include', // Якщо потрібно передавати куки
    //           params: { code },
    //         });

    //         if (!response.ok) {
    //           throw new Error('Network response was not ok');
    //         }
    // const accessToken = response.headers.get('access_token');
    // const refreshToken = response.headers.get('refresh-token');
    // const tokenType = response.headers.get('token_type');

    // console.log('access_token_header:', accessToken);
    // console.log('refresh_token_header:', refreshToken);
    // console.log('token_type_header:', tokenType);
    //         // Отримуємо дані з відповіді
    //         const data = await response.json();
    //         const { access_token, refresh_token } = data;

    //         // Зберігаємо токен у локальному сховищі або cookies
    //         localStorage.setItem('access_token', access_token);
    //         localStorage.setItem('refresh_token', refresh_token);


    //         // Зберігаємо токен у сторі
    //         setAccessToken(access_token);
    //         setRefreshToken(refresh_token);



    //         // Перенаправляємо користувача на головну сторінку або dashboard
    //         // navigate('/dashboard');
    //       } catch (error) {
    //         console.error('Authentication failed:', error);
    //       }
    //     }
    //   };

    //   fetchTokens();
  }, []);

  return (accsessToken || refreshToken) ? <Outlet /> : <Navigate to="/login" />
};
