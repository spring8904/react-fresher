import { useContext } from 'react'
import { Alert, Container } from 'react-bootstrap'
import Header from '../components/Header'
import { UserContext } from '../context/UserContext'

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext)
  if (!user?.auth) {
    return (
      <>
        <Header />
        <Container className="mt-3">
          <Alert variant="danger">You need to login to access this page</Alert>
        </Container>
      </>
    )
  }

  return children
}

export default PrivateRoute
