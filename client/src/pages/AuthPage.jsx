import { useState } from "react"
import SignUp from "../components/Signup"
import Login from "../components/Login.jsx"
import "./authPage.css"

const AuthPage = () => {
  const [isUserRegister, setIsUserRegister] = useState(true)

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1>Welcom to Note</h1>
        {isUserRegister
          ? <Login />
          : <SignUp />
        }
        <footer>
          {
            isUserRegister
            ? <p>
              Don't have an account ?
              <span onClick={() => setIsUserRegister(false)}>Sign Up</span>
            </p>
            : <p>
              Already have an account ?
              <span onClick={() => setIsUserRegister(true)}>Log In</span>
            </p>
          }
        </footer>
      </div>
    </div>
  )
}

export default AuthPage
