import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  updateUser(user);
  setTimeout(() => navigate("/dashboard"), 50); 
}
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 bg-purple-100/80 backdrop-blur-sm rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          Welcome Back to Track your Expenses
        </h3>
        <p className="text-sm text-gray-600 mb-7">Please enter your login details</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="jashu@example.com"
            type="email"
            className="input-box"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="••••••••"
            type="password"
            className="input-box"
          />

          {error && (
            <p className="text-red-500 text-sm py-1.5 px-3 bg-red-50 rounded-lg">{error}</p>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>

          <p className="text-sm text-gray-700 mt-4 text-center">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
