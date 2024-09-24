import { client } from '../services/axiosClient';


// Гугл авторизація
export const googleAutorization = () => {
  return client.get('/api/auth/google_login');
};
export const sendToken = (data) => {
  return client.get(`/api/auth/token?${data}`);
};


// POST-запит для авторизації користувача
export const SignIn = (formData) => {
  // return client.post('/api/auth/signup', formData);
};
// POST-запит для регістрації користувача
export const SignUp = (formData) => {
  return client.post('/api/auth/signup', formData);
};
