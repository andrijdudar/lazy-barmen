
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import useStoreAuth from "../StoreAuth";
import { useEffect } from "react";
import { SERVER_URL } from '../../services/httpClient';


export const ProtectedRoutes = () => {
  const accsessToken = useStoreAuth((state) => state.access_token);
  const setAccessToken = useStoreAuth((state) => state.setAccessToken);
  const refreshToken = useStoreAuth((state) => state.refresh_token);
  const setRefreshToken = useStoreAuth((state) => state.setRefreshToken);
  const location = useLocation();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchTokens = async () => {
      // Отримуємо код із URL
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get('code');

      if (code) {
        try {
          // Відправляємо код на бекенд для обміну на токен
          const response = await fetch(SERVER_URL + '/auth/token', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Якщо потрібно передавати куки
            params: { code },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          // Отримуємо дані з відповіді
          const data = await response.json();
          const { access_token, refresh_token } = data;

          // Зберігаємо токен у локальному сховищі або cookies
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);


          // Зберігаємо токен у сторі
          setAccessToken(access_token);
          setRefreshToken(refresh_token);



          // Перенаправляємо користувача на головну сторінку або dashboard
          // navigate('/dashboard');
        } catch (error) {
          console.error('Authentication failed:', error);
        }
      }
    };

    fetchTokens();
  }, [location]);

  return (accsessToken && refreshToken) ? <Outlet /> : <Navigate to="/login" />
};
