import api from '../api/axios';

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // expected { token, user }
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Register function
export const registerUser = async (email, password) => {
  try {
    const response = await api.post('/auth/register', { email, password });
    return response.data; // expected { token, user }
  } catch (error) {
    throw error.response?.data || error;
  }
};

