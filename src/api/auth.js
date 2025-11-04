import apiClient from './http';

export const login = (credentials) => {
  // credentials: { email, password }
    return apiClient.post('/auth/login', credentials)
                .then(res => res.data);
};

export const register = (newUser) => {
  // newUser: { name, email, password }
    return apiClient.post('/auth/register', newUser)
                .then(res => res.data);
};

export const getMe = () => {
    return apiClient.get('/users/me').then(res => res.data);
};
