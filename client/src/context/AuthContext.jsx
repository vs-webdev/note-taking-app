import { useEffect, useState, useContext, createContext } from "react";
import { useApi } from "../api/axioinstance";

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context){
    return new Error("useAuth must be used within a AuthProvider")
  }
  return context
}

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const api = useApi()

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const res = await api.post("/auth/refreshToken")
        if (res.data.success){
          setAccessToken(res.data.accessToken)
        }

        setIsAuthenticated(res.data.success)
      } catch (error) {
        console.log("Refresh token error:", error.message)
        setIsAuthenticated(false)
        setAccessToken(null)
      }
    }

    refreshAccessToken()
  }, [])

  const value = {
    isAuthenticated, setIsAuthenticated,
    accessToken, setAccessToken,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}