import { useApi } from "./axioinstance.js"

const api = useApi()
export const registerApi = async (payload) => {
  try {
    const res = await api.post("/auth/register", payload)
    return res.data
  } catch (error) {
    console.log('Register error: ', error.message)
  }
}

export const loginApi = async (payload) => {
  try {
    const res = await api.post("/auth/login", payload)
    return res.data
  } catch (error) {
    console.log('Login error: ', error.message)
  }
}