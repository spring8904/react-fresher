import { useLocalStorage } from '@uidotdev/usehooks'
import { createContext, useState } from 'react'

export const UserContext = createContext({ email: '', auth: false })

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: '', auth: false })
  const [, setToken] = useLocalStorage('token', null)

  const login = (email) => {
    setUser(() => ({
      email,
      auth: true,
    }))
    setToken(email)
  }

  const logout = () => {
    setUser(() => ({
      email: '',
      auth: false,
    }))
    setToken(null)
  }
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
