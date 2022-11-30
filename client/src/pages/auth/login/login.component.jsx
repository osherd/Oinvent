import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GrLogin } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Card from '../../../components/card/card.component';
import '../auth.styles.scss';
import React from 'react';
import {
  loginUser,
  validateEmail,
} from '../../../Services/authService/authService';
import { SpinnerImg } from '../../../components/Loader/Loader.component';
import { setLogin, setUser } from '../../../redux/store/auth/auth.action';
const initialData = {
  email: '',
  password: '',
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = formData;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please enter valid email or password');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter valid email');
    }
    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      await dispatch(setUser(data));
      await dispatch(setLogin(true));
      setIsLoading(false);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className='container auth'>
      {isLoading && <SpinnerImg />}
      <Card>
        <div className='form'>
          <div className='--flex-center'>
            <GrLogin size={35} color='#999' />
          </div>
          <h2>Login</h2>
          <form onSubmit={login}>
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
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Login
            </button>
          </form>
          <Link to='/forgot'>Forgot Password</Link>

          <span className='register'>
            <Link to='/'>Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to='/register'>Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};
export default Login;
