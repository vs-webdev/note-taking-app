import { useState } from "react"
import { registerApi } from "../../api/authApi"
import "./signup.css"

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitSignup = async (e) => {
    e.preventDefault()
    try {
      const registrationResponse = await registerApi({email, password})
      if (registrationResponse.success){
        console.log('user registered')
      } else {
        console.log('registration failed')
      }
    } catch (error) {
      console.log('signup went wrong')
    }
  }

  return (
    <div className="signup-container">
      <form onSubmit={submitSignup}>
        <h2 className="text-preset-5">Sign up to start organizing your notes and boost productivity</h2>
        <div className="input-field">
          <label htmlFor="email" className="text-preset-4">Email Address</label>
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
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
