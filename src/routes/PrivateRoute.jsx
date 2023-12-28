import { Alert, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Header from '../components/Header'

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.value)

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
