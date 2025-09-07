import { useState } from "react"
import { loginApi } from "../../api/authApi"
import { useAuth } from "../../context/AuthContext"
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setIsAuthenticated} = useAuth()

  const submitLogin = async (e) => {
    e.preventDefault()

    try {
      const loginResponse = await loginApi({email, password})
      if (loginResponse.success){
        setIsAuthenticated(true)
        console.log(loginResponse)
      }
    } catch (error) {
      console.log('Login went wrong' + error.message)
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={submitLogin}>
        <h2 className="text-preset-5">Please log in to continue</h2>
        <div className="input-field">
          <label htmlFor="email" className="text-preset-4">
            Email Address
          </label>
          <input 
            type="email" 
            id="email"
            placeholder="example@gmail.com" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password" className="text-preset-4">Password</label>
          <input 
            type="password" 
            id="password"
            placeholder="Enter your Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-btn">Log In</button>
      </form>
    </div>
  )
}

export default Login
