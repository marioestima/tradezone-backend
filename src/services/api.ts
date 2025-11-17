import axios from "axios";

// Base da API (Render ou Local)

const API_URL = import.meta.env.VITE_API_URL || "https://tradezone-api-v1.onrender.com";


// Cria uma instância do Axios
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepta as requisições e adiciona o token se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
