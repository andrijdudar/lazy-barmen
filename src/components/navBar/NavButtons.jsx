import { NavLink } from "react-router-dom";
import './NavButtons.css';
import cn from 'classnames';
import { GoogleLogout } from "react-google-login";

const getLinkClass = ({ isActive }) =>
  cn('nav-button-link', { 'has-border': isActive });
// const getLinkClassSettings = ({ isActive }) =>
//   cn('nav-button-link-settings', 'grid-start', { 'has-border': isActive });

export const NavButtons = () => {
  const clientID = '731360179208-0ddqgcdfserhm8s6g5ecinq7158gguk0.apps.googleusercontent.com';
  const onSuccess = () => {
    console.log('Logout success');
  };
  return (
    <ul className='nav-buttons grid-center'>
      {/* <li> */}
        {/* <NavLink className={getLinkClassSettings} to="/admin">
          <img width="25" height="25" src="https://img.icons8.com/glyph-neue/64/FAB005/user-lock.png" alt="user-lock" />
        </NavLink> */}
      {/* </li> */}
      <li>
        <NavLink className={getLinkClass} to="/">
          Стоп Лист
        </NavLink>
      </li>
      <li>
        <NavLink className={getLinkClass} to="/menu">
          Меню
        </NavLink>
      </li>
      <li>
        <GoogleLogout
          clientId={clientID}
          buttonText="Logout"
          onLogoutSuccess={onSuccess}
        />
      </li>
    </ul>
  );
};
