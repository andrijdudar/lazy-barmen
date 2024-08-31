// import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import './App.scss';
import { CustomAlert } from './utils/CustomAlert/CustomAlert';



const App = () => {
  // const user = useStoreAuth((state) => state.user);
  // const setUser = useStoreAuth((state) => state.setUser);

  // useEffect(() => {
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
  // }, []);

  return (
    <div className="App">
      <NavBar />
      <div className="conten">
        <CustomAlert
          id="custom-alert"
          buttonText="Перевірити пошту"
        />
        <Outlet />
      </div>
      <Footer />
    </div >
  );
};

export default App;
