import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import './App.scss';
import { googleAutorization } from './utils/fetch';
import useStoreAuth from './utils/StoreAuth';
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
      handleGoogleAutorization();
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
