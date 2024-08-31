import { Outlet, useLocation } from 'react-router-dom';
import './Administration.scss';
import { useEffect, useRef, useState } from 'react';
import { SideBarAdmin } from './components/SideBarAdmin/SideBarAdmin';
import iconLogout from './../../img/logout-24px.svg';


export function Administration() {
  const outletRef = useRef(null);
  const location = useLocation();
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (shouldScroll) {
      if (outletRef.current) {
        const time = setTimeout(() => {
          outletRef.current.scrollIntoView({ behavior: 'smooth' });
          clearTimeout(time);
        }, 1000);
      }
      setShouldScroll(false);
    }
  }, [shouldScroll, location]);

  const handleScrollToOutlet = () => {
    setShouldScroll(true);
  };




  return (
    <div className='Administration'>
      <SideBarAdmin onLinkClick={handleScrollToOutlet} />
      <div className='SideBarAdminContent' ref={outletRef}>
        <Outlet />
      </div>
    </div>

  );
}
