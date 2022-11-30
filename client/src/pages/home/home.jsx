import { Link } from 'react-router-dom';
import { AiOutlineBarChart } from 'react-icons/ai';
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/protect';

import './Home.scss';

const Home = () => {
  return (
    <div className='home'>
      <nav className='container --flex-between '>
        <div className='logo'>
          <AiOutlineBarChart size={35} />
        </div>
        <div className='home-links'>
          <ShowOnLogout>
            <button className='--btn --btn-primary'>
              <Link to='/register'>Register</Link>
            </button>
          </ShowOnLogout>
          <ShowOnLogout>
            <button className='--btn --btn-primary'>
              <Link to='/login'>Login</Link>
            </button>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className='--btn --btn-primary'>
                <Link to='/dashboard'>Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </div>
      </nav>
    </div>
  );
};

export default Home;
