import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo, sideImg } from '../../icons';
import GoogleAuthButton from '../../components/GoogleAuthButton';

const API_BASE_URL = 'http://localhost:5000/api';


const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    password: ''
  });
  const [dateForBackend, setDateForBackend] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'dateOfBirth') {
      // Store the original date for backend
      setDateForBackend(value);
      
      // Convert date to "7 July 2003" format for display
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const year = date.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;
        
        setFormData({
          ...formData,
          [name]: formattedDate
        });
      } else {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use the stored date for backend
      const signupData = { ...formData };
      if (dateForBackend) {
        signupData.dateOfBirth = dateForBackend;
      }

      const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sign up successful:', data);
        // Store user data in localStorage or context if needed
        localStorage.setItem('user', JSON.stringify(data.data));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Sign up failed');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (user: any) => {
    console.log('Google sign up successful:', user);
    // Navigate to dashboard or home page
    navigate('/dashboard');
  };

  const handleGoogleError = (error: string) => {
    setError(error);
    console.error('Google sign up error:', error);
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Left Side - Sign Up Form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
        }}
      >
        {/* Logo */}
        <div style={{ position: 'absolute', top: 30, left: 30, fontSize: 20, fontWeight: 'bold' }}><img src={logo} height={20} /> HD</div>

        {/* Sign Up Form */}
        <form onSubmit={handleSignUp} style={{ width: '100%', maxWidth: 350 }}>
          <h2 style={{ marginBottom: 10 }}>Sign up</h2>
          <p style={{ marginBottom: 30, color: '#777' }}>Sign up to enjoy the feature of HD</p>

          <div style={{ position: 'relative', marginBottom: 25 }}>
            <input
              type="text"
              name="name"
              placeholder="Jonas"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '15px',
                paddingTop: '20px',
                borderRadius: 5,
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              required
            />
            <label style={{ 
              position: 'absolute', 
              top: '-8px', 
              left: '10px', 
              backgroundColor: 'white', 
              padding: '0 5px',
              fontSize: '12px',
              color: '#ccc'
            }}>
              Your Name
            </label>
          </div>

          <div style={{ position: 'relative', marginBottom: 25 }}>
            <input
              type="date"
              name="dateOfBirth"
              value={dateForBackend}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '15px',
                paddingTop: '20px',
                borderRadius: 5,
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                outline: 'none',
                cursor: 'pointer'
              }}
              required
            />
            <label style={{ 
              position: 'absolute', 
              top: '-8px', 
              left: '10px', 
              backgroundColor: 'white', 
              padding: '0 5px',
              fontSize: '12px',
              color: '#ccc'
            }}>
              Date of Birth
            </label>
          </div>

          <div style={{ position: 'relative', marginBottom: 25 }}>
            <input
              type="email"
              name="email"
              placeholder="jonas@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '15px',
                paddingTop: '20px',
                borderRadius: 5,
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              required
            />
            <label style={{ 
              position: 'absolute', 
              top: '-8px', 
              left: '10px', 
              backgroundColor: 'white', 
              padding: '0 5px',
              fontSize: '12px',
              color: '#ccc'
            }}>
              Email
            </label>
          </div>

          <div style={{ position: 'relative', marginBottom: 30 }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '15px',
                paddingTop: '20px',
                borderRadius: 5,
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              required
            />
            <label style={{ 
              position: 'absolute', 
              top: '-8px', 
              left: '10px', 
              backgroundColor: 'white', 
              padding: '0 5px',
              fontSize: '12px',
              color: '#ccc'
            }}>
              Password
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: loading ? '#9ca3af' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: 20,
            }}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>

          {/* Error Message */}
          {error && (
            <div style={{
              color: '#dc2626',
              fontSize: '14px',
              textAlign: 'center',
              marginBottom: '15px',
              padding: '10px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '5px'
            }}>
              {error}
            </div>
          )}

          {/* Divider */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: 20,
            color: '#777',
            fontSize: '14px'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
            <span style={{ margin: '0 15px' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
          </div>

          {/* Google Sign Up Button */}
          <GoogleAuthButton
            mode="signup"
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />

          <p style={{ fontSize: 14 }}>
            Already have an account??{' '}
            <Link to="/" style={{ color: '#007bff', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
              Sign in
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side - Image */}
      <div
  style={{
    flex: 1,
    overflow: 'hidden',
    borderRadius:"20px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding:"12px"
  }}
>
  <img
    src={sideImg}
    alt="Side"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius:"20px"
    }}
  />
</div>

    </div>
  );
};

export default SignupPage;
