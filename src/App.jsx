import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import './App.scss';


 const App = () => {
  // const user = useStoreAuth((state) => state.user);
  // const setUser = useStoreAuth((state) => state.setUser);

  // const formLogin = useStoreAuth((state) => state.formLogin);
  // const setFormLogin = useStoreAuth((state) => state.setFormLogin);

  // const access_token = useStoreAuth((state) => state.access_token);
  // const setAccessToken = useStoreAuth((state) => state.setAccessToken);

  // const refresh_token = useStoreAuth((state) => state.refresh_token);
  // const setRefreshToken = useStoreAuth((state) => state.setRefreshToken);

  // const token_type = useStoreAuth((state) => state.token_type);
  // const setTokenType = useStoreAuth((state) => state.setTokenType);

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
    </div>
  );
};

export default App;
