import React, { useState } from 'react';
import './sidebar.styles.scss';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineBarChart } from 'react-icons/ai';
import menu from '../../data/sidebar';
import SidebarItem from './sidebarItem';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className='sidebar-container'>
      <div className='sidebar' style={{ width: isOpen ? '230px' : '60px' }}>
        <div className='top-section'>
          <div className='logo' style={{ display: isOpen ? 'block' : 'none' }}>
            <AiOutlineBarChart
              size={35}
              style={{ cursor: 'pointer' }}
              onClick={goHome}
            />
          </div>

          <div
            className='bars'
            style={{ marginLeft: isOpen ? '100px' : '0px' }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          paddingLeft: isOpen ? '230px' : '60px',
          transition: 'all .5s',
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
