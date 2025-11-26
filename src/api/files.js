// src/api/files.js
import apiClient from './http';

const MEMPOOL_SPACE_API = 'https://mempool.space/api/v1/fees/recommended';

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

/**
 * Consulta la tarifa de transacción recomendada en satoshis/vByte (sat/vB).
 * Retorna la tarifa más rápida o un valor por defecto.
 */
export const getBitcoinFee = () => {
    return fetch(MEMPOOL_SPACE_API)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            // Devolvemos la tarifa "más rápida" o "high"
            return data.fastestFee || data.halfHourFee || 10; // 10 sat/vB como fallback
        })
        .catch(err => {
            console.error("Error fetching Bitcoin fee:", err);
            return 10; // Fallback seguro
        });
};