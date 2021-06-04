import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Sidebar.css';
import { IconContext } from 'react-icons';

function Sidebar({ user }) {
  const [sidebar, setSidebar] = useState(false);
  const [logout, setLogout] = useState(false);

  let history = useHistory();

  const showSidebar = () => setSidebar(!sidebar);

  const logoutUser = () => {
    Axios.post('http://localhost:3001/logout')
      .then((response) => {
        console.log(response);
        alert('Nastąpiło wylogowanie!');
        history.push('/login');
      });
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className='menu-user'>
            <FaIcons.FaUserCircle onClick={() => setLogout(!logout)}/>
            {logout ? (
              <button className="btn_logout" onClick={logoutUser}>Wyloguj</button>
            ) : null}   
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
