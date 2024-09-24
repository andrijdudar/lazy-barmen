import axios from "axios";

export const SERVER_URL = 'https://marked-addia-ago-0dd6d371.koyeb.app';
export const GOOGLE_AUTH_URL = SERVER_URL + '/api/auth/google_auth';
export const CLIENT_ID = '175403963155-qg3ma8d95h6lck440svfkrf4mtm60nb3.apps.googleusercontent.com';

axios.defaults.baseURL = SERVER_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('access_token');
    config.headers['Authorization'] = `Bearer ${accessToken || ''}`;
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    (config.url === '/api/auth/refresh_token') && (config._retry = true);
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response, // Успішні запити просто повертаються
  async error => {
    const originalRequest = error.config;

    switch (error.response?.status) {
      case 400:
        console.error('Поганий запит:', error.response.data);
        break;
      case 401:
        // Обробка помилки 401 (Unauthorized)
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.get('/api/auth/refresh_token', {
              headers: { 'Authorization': `Bearer ${refreshToken}` }
            });
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            // Повторіть оригінальний запит з новим токеном
            return axios(originalRequest);
          } catch (err) {
            window.location.href = '/';
            return Promise.reject(err)
          }
        }
        break;
      case 404:
        console.error('Не знайдено:', error.response.data);
        break;
      case 500:
        console.error('Внутрішня помилка сервера:', error.response.data);
        break;
      default:
        console.error('Помилка:', error.response?.data);
    }
    return Promise.reject(error);
  }
);


export const client = {
  async get(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Помилка при виконанні GET запиту:', error);
      throw error;
    }
  },

  async post(url, data) {
    try {
      const response = await axios.post(url, JSON.stringify(data));
      return response.data;
    } catch (error) {
      console.error('Помилка при виконанні POST запиту:', error);
      throw error;
    }
  },

  async put(url, data) {
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      console.error('Помилка при виконанні PUT запиту:', error);
      throw error;
    }
  },

  async patch(url, data) {
    try {
      const response = await axios.patch(url, data);
      return response.data;
    } catch (error) {
      console.error('Помилка при виконанні PATCH запиту:', error);
      throw error;
    }
  },

  async delete(url) {
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error('Помилка при виконанні DELETE запиту:', error);
      throw error;
    }
  },
  async getRefresh(url) {
    try {
      const response = await axios.get(SERVER_URL + url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`,
          'X-Requested-With': 'XMLHttpRequest',
          'ngrok-skip-browser-warning': '69420',
        }
      });

      return response.data; // Очікується, що `handleResponse` обробляє JSON, тому тут повертаємо data
    }
    catch (error) {
      console.error('Помилка при виконанні GET запиту:', error);
      throw error;
    }
  }

}
