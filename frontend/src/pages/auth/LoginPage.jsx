import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { loginUser } from '../../auth/authService';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async ({ email, password }) => {
    try {
      const { token, user } = await loginUser(email, password);
      login(user, token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
};

export default LoginPage;
