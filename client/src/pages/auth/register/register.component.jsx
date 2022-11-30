import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TiUserAddOutline } from 'react-icons/ti';
import '../auth.styles.scss';
import Card from '../../../components/card/card.component';
import {
  registerUser,
  validateEmail,
} from '../../../Services/authService/authService';
import { SpinnerImg } from '../../../components/Loader/Loader.component';
import { useDispatch } from 'react-redux';
import { setLogin, setUser } from '../../../redux/store/auth/auth.action';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    if (!name || !password || !confirmPassword) {
      return toast.error('All fields required');
    }
    if (password.length < 6) {
      return toast.error('Password must be up to 6 characters');
    }
    if (!validateEmail(email)) {
      toast.error('Please enter valid mail');
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    const userData = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    try {
      const res = await registerUser(userData);
      await dispatch(setUser(res));
      await dispatch(setLogin(true));
      setIsLoading(false);
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className='container auth'>
      {isLoading && <SpinnerImg />}
      <Card>
        <div className='form'>
          <div className='--flex-center'>
            <TiUserAddOutline size={35} color='#999' />
          </div>
          <h1> Register</h1>
          <form onSubmit={register}>
            <input
              type='text'
              placeholder='Name'
              required
              name='name'
              value={name}
              onChange={handleInputChange}
            />
            <input
              type='email'
              placeholder='Email'
              required
              name='email'
              value={email}
              onChange={handleInputChange}
            />
            <input
              type='password'
              placeholder='Password'
              required
              name='password'
              value={password}
              onChange={handleInputChange}
            />
            <input
              type='password'
              placeholder='Confirm Password'
              required
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Register
            </button>
          </form>
          <span className='register'>
            <Link to='/'>Home</Link>
            <p> &nbsp; Already have an account? &nbsp;</p>
            <Link to='/login'>Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};
export default Register;
