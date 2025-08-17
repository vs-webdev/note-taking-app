import './App.css'
import AllNotes from './pages/AllNotes'
import AuthPage from './pages/AuthPage'
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useAuth } from './context/AuthContext'

const PrivateRoute = ({children}) => {
  const {isAuthenticated} = useAuth()
  return isAuthenticated ? children : <Navigate to="/auth" />
}

function App() {
  const {isAuthenticated} = useAuth()
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute>
              <AllNotes />
            </PrivateRoute> }
          />

          <Route path='/auth' element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App