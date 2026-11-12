// ==============================================
// FRONTEND src/config
// JAVASCRIPT CONFIGURACION DE LA API api.js
// ==============================================
// src/config/api.js
const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Elimina cualquier '/' al final para evitar rutas dobles como //api/alumnos
const API_URL = rawUrl.replace(/\/+$/, '');

export default API_URL;
