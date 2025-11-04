import apiClient from './http';

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
};

export const getHistory = () => {
    return apiClient.get('/files/history').then(res => res.data);
};

export const getDashboard = () => {
    return apiClient.get('/dashboard').then(res => res.data);
};
