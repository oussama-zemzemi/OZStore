import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { registerUser } from '../../auth/authService';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async ({ email, password }) => {
    try {
      const { token, user } = await registerUser(email, password);
      login(user, token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <RegisterForm onSubmit={handleRegister} error={error} />
    </div>
  );
};

export default RegisterPage;
