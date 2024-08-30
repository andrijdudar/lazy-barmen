import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import './App.scss';
// import { googleAutorization } from './utils/fetch';
import useStoreAuth from './utils/StoreAuth';
// // import { SERVER_URL } from './services/httpClient';
import Cookies from 'js-cookie';
import { SERVER_URL } from './services/httpClient';



const App = () => {
  // const user = useStoreAuth((state) => state.user);
  // const setUser = useStoreAuth((state) => state.setUser);

  // const formLogin = useStoreAuth((state) => state.formLogin);
  // const setFormLogin = useStoreAuth((state) => state.setFormLogin);

  // const access_token = useStoreAuth((state) => state.access_token);
  const setAccessToken = useStoreAuth((state) => state.setAccessToken);

  // const refresh_token = useStoreAuth((state) => state.refresh_token);
  const setRefreshToken = useStoreAuth((state) => state.setRefreshToken);

  // const token_type = useStoreAuth((state) => state.token_type);
  const setTokenType = useStoreAuth((state) => state.setTokenType);

  useEffect(() => {



    // const handleGoogleAutorization = () => {
      // window.location.href = 'http://google.com';
      // window.location.href = '/menu';
      // setFormLogin(true);
      // nsvigate('/test-page');


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

    const allCookies = Cookies.get();
    console.log('cookies_APP_useEffect:', allCookies);


        const fetchTokens = async () => {
          // const queryParams = location.search.substring(1);
          // const code = queryParams.get('code');
          // console.log('code:', code);

          // if (true) {
          try {
            // Відправляємо код на бекенд для обміну на токен
            const response = await fetch(SERVER_URL + "/api/auth/google_login", {
              method: 'GET',
              mode: 'no-cors',
              headers: {
                // 'Authorization': queryParams,
                'Content-Type': 'application/json',
                // 'Accept': 'application/json',
              },
              // mode: 'no-cors',
              credentials: 'include', // Якщо потрібно передавати куки
              // params: queryParams,
            });

            const allCookies = await Cookies.get();
            console.log('cookies_APP_useEffect:', allCookies);

            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const accessToken = response.headers.get('access_token');
            const refreshToken = response.headers.get('refresh-token');
            const tokenType = response.headers.get('token_type');
            const allHeaders = response.headers;
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setTokenType(tokenType);

            console.log('access_token_header_APP_useEffect:', accessToken);
            console.log('refresh_token_header_APP_useEffect:', refreshToken);
            console.log('token_type_header_APP_useEffect:', tokenType);
            console.log('allHeaders_APP_useEffect:', allHeaders);
            // const allCookies = Cookies.get();
            // console.log('cookies_APP_useEffect:', allCookies);
            // Отримуємо дані з відповіді
            const data = await response.json();
            const { access_token, refresh_token } = data;

            // Зберігаємо токен у локальному сховищі або cookies
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            console.log('access_token_APP_useEffect:', access_token);
            console.log('refresh_token_APP_useEffect:', refresh_token);

            // Перенаправляємо користувача на головну сторінку або dashboard
            // navigate('/dashboard');
          } catch (error) {
            console.error('Authentication failed_APP_useEffect:', error);
          }
          // }
        };

    fetchTokens();

    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (authCode) {
      fetch(`${SERVER_URL}/api/auth/google_token_exchange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: authCode }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Access Token exchenge запит APP:', data.access_token);
          console.log('Refresh Token exchenge запит APP:', data.refresh_token);
        });
    }


    // const refreshToken = localStorage.getItem('refreshToken');
    // const tokenType = localStorage.getItem('tokenType');
    // const accessToken = localStorage.getItem('accessToken');


    // getCurentUser().then((res) => {
    //   console.log(res);
    //   if (res.status === 200) {
    //     setUser(res.data);
    //     setFormLogin(true);
    //   }
    //   if(res.refresh_token){
    //     setRefreshToken(res.refresh_token);
    //   }
    //   if(res.access_token){
    //     setAccessToken(res.access_token);
    //   }
    //   if(res.token_type){
    //     setTokenType(res.token_type);
    //   }
    //   if(res.role){
    //     setUser(res.role);
    //   }
    // });
    // handleGoogleAutorization();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!formLogin) {
  //   return <Login />;
  //   // return <TestPage />;
  // }

  return (
    <div className="App">
      <NavBar />
      <div className="conten">
        <Outlet />
      </div>
      <Footer />
    </div >
  );
};

export default App;
