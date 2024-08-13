import { Outlet } from 'react-router-dom';
import './App.scss';
import "./components/navBar/NavBar.css";
import { NavBar } from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import { useEffect } from 'react';
import useStore from './StoreZustand';
import { Login } from './components/utils/Login/Login';
// import { TestPage } from './components/utils/TestPage/TestPage';


const App = () => {
  // const user = useStore((state) => state.user);
  // const setUser = useStore((state) => state.setUser);

  const formLogin = useStore((state) => state.formLogin);
  // const setFormLogin = useStore((state) => state.setFormLogin);

  // const access_token = useStore((state) => state.access_token);
  // const setAccessToken = useStore((state) => state.setAccessToken);

  // const refresh_token = useStore((state) => state.refresh_token);
  // const setRefreshToken = useStore((state) => state.setRefreshToken);

  // const token_type = useStore((state) => state.token_type);
  // const setTokenType = useStore((state) => state.setTokenType);

  useEffect(() => {
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

  if (!formLogin) {
    return <Login />;
    // return <TestPage />;
  }

  return (
    <div>
      <div className="App">
        <div className="scroll-to-top">
        </div>
        <NavBar />
        <div className="conten">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
