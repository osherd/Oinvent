import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './header.styles.scss';
import { logoutUser } from '../../Services/authService/authService';
import { setLogin } from '../../redux/store/auth/auth.action';
import { selectUser } from '../../redux/store/auth/auth.selector';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(selectUser);
  const { name } = data;

  const logout = async () => {
    await logoutUser();
    await dispatch(setLogin(false));
    await navigate('/login');
  };

  return (
    <div className='header-container header'>
      <div className='flex-center'>
        <h3>
          <span className='fw-thin'> Wellcome</span>
          <span className='--color-danger space'>{name}</span>
        </h3>
        <button onClick={logout} className='--btn --btn-danger btn'>
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};
export default Header;
