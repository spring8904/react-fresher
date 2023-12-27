import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import TableUsers from '../components/TableUsers'
import { useLocalStorage } from '@uidotdev/usehooks'

const Users = () => {
  const navigate = useNavigate()
  const [token] = useLocalStorage('token', null)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <TableUsers />
    </>
  )
}

export default Users
