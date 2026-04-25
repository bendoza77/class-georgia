import { createContext, useContext, useState } from 'react'

const ADMIN_PASSWORD = 'admin2025'
const SESSION_KEY = 'cg_admin_auth'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'true'
  )
  const [error, setError] = useState('')

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setIsAuthenticated(true)
      setError('')
      return true
    }
    setError('Incorrect password. Please try again.')
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, error, setError }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
