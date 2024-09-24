// import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import './App.scss';
import { CustomAlert } from './utils/CustomAlert/CustomAlert';

export const App = () => {
  return (
    <div className="App">
      <NavBar />
      <div className="conten">
        <CustomAlert id="custom-alert" />
        <Outlet />
      </div>
      <Footer />
    </div >
  );
};

export default App;
