import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineMail } from 'react-icons/ai';
import Card from '../../../components/card/card.component';
import '../auth.styles.scss';
import {
  forgotPassword,
  validateEmail,
} from '../../../Services/authService/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };
  const forgot = async (e) => {
    e.preventDefualt();
    if (!email) {
      return toast.error('Please enter an email');
    }
    if (!validateEmail(email)) {
      return toast.error('please enter valid email');
    }
    const userData = {
      email,
    };
    await forgotPassword(userData);
    setEmail('');
  };
  return (
    <div className='container auth'>
      <Card>
        <div className='form'>
          <div className='--flex-center'>
            <AiOutlineMail size={35} color='#999' />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input
              type='email'
              placeholder='Email'
              required
              name='email'
              value={email}
              onChange={handleInputChange}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Get Reset Email
            </button>
            <div className='links'>
              <p>
                <Link to='/'>- Home</Link>
              </p>
              <p>
                <Link to='/login'>- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
