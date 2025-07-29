
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup/Signup'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
