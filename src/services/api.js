import axios from 'axios';

// Si existe REACT_APP_API_URL en el entorno (production),
// úsala; si no, cae a localhost para dev.
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

export default API;
