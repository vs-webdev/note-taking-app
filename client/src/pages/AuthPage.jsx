import { useState } from "react"
import logo from '../assets/images/logo.svg'
import Login from "../components/Login/Login"
import SignUp from "../components/Signup/SignUp"
import styles from "./authPage.module.css"

const AuthPage = () => {
  const [isUserRegister, setIsUserRegister] = useState(true)

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authContainer}>
        <img src={logo} alt="Logo" />
        <h1 className="text-preset-1">Welcome to Note</h1>
        {isUserRegister
          ? <Login />
          : <SignUp />
        }
        <footer>
          {
            isUserRegister
            ? <p>
              Don't have an account ?
              <span onClick={() => setIsUserRegister(false)}>
                Sign Up
              </span>
            </p>
            : <p>
              Already have an account ?
              <span onClick={() => setIsUserRegister(true)}>
                Log In
              </span>
            </p>
          }
        </footer>
      </div>
    </div>
  )
}

export default AuthPage
