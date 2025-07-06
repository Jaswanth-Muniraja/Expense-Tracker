import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage'; // Import the uploadImage utility

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');
    setLoading(true);

    try {
      let imageUrl = '';
      
      // Upload image if selected
      if (profileImage) {
        const imageResponse = await uploadImage(profileImage);
        imageUrl = imageResponse.url; // Assuming your API returns { url: '...' }
      }

      // Register user with image URL
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl: imageUrl
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-md w-full p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-1">Create an Account</h3>
        <p className="text-sm text-gray-600 text-center mb-7">Track your expenses easily</p>
        
        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="flex justify-center mb-4">
            <ProfilePhotoSelector 
              image={profileImage} 
              setImage={setProfileImage} 
            />
          </div>
          
          <Input 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            placeholder="Jane Smith"
            type="text"
            required
          />
          
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="jane@example.com"
            type="email"
            required
          />
          
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="••••••••"
            type="password"
            required
            minLength="6"
          />
          
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button 
            type="submit" 
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'SIGN UP'}
          </button>
          
          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;