import { useState } from 'react';
import { MdOutlinePassword } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../../Services/authService/authService';
import '../auth.styles.scss';
const initialState = {
  password: '',
  confirmPassword: '',
};

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [formData, setFormData] = useState(initialState);
  const { password, confirmPassword } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const reset = async (e) => {
    e.preventDafualt();
    if (!password || !confirmPassword) {
      return toast.error('Please enter valid password');
    }
    if (password !== confirmPassword) {
      return toast.error('Password do not match');
    }
    if (password.length < 6) {
      return toast.error('Password must up to 6 character');
    }
    const userData = {
      password,
      confirmPassword,
    };
    await resetPassword(userData, resetToken);
    toast.success('Reset Password Successful....');
  };
  return (
    <div className='container auth'>
      <Card>
        <div className='form'>
          <div className='--flex-center'>
            <MdOutlinePassword size={35} color='#999' />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={reset}>
            <input
              type='password'
              name='password'
              required
              value={password}
              onChange={handleInputChange}
            />
            <input
              type='password'
              name='confirmPassword'
              required
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Reset Password
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

export default ResetPassword;
