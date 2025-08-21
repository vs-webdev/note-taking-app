import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true
})

export const useApi = (accessToken) => {
  api.interceptors.request.use((config) => {
    if (accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })
  return api
}