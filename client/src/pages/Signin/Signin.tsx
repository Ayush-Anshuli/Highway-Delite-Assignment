import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo, sideImg } from '../../icons';
import GoogleAuthButton from '../../components/GoogleAuthButton';

const API_BASE_URL = 'http://localhost:5000/api';
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sign in successful:', data);
        // Store user data in localStorage or context if needed
        localStorage.setItem('user', JSON.stringify(data.data));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Sign in failed');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (user: any) => {
    console.log('Google sign in successful:', user);
    // Navigate to dashboard or home page
    navigate('/dashboard');
  };

  const handleGoogleError = (error: string) => {
    setError(error);
    console.error('Google sign in error:', error);
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Left Side - Login Form */}
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

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} style={{ width: '100%', maxWidth: 350 }}>
          <h2 style={{ marginBottom: 10 }}>Sign in</h2>
          <p style={{ marginBottom: 30, color: '#777' }}>Please login to continue to your account.</p>

          <div style={{ position: 'relative', marginBottom: 25 }}>
            <input
              type="email"
              name="email"
              placeholder="Jonas@gmail.com"
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

          <div style={{ position: 'relative', marginBottom: 25 }}>
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

          <div style={{ marginBottom: 15 }}>
            <label style={{ fontSize: 14 }}>
              <input type="checkbox" style={{ marginRight: 8 }} /> Keep me logged in
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
            {loading ? 'Signing in...' : 'Sign in'}
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

          {/* Google Sign In Button */}
          <GoogleAuthButton
            mode="signin"
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />

          <p style={{ fontSize: 14 }}>
            Need an account?{' '}
            <Link to="/signup" style={{ color: '#007bff', textDecoration: 'underline' }}>
              Create one
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

export default LoginPage;
