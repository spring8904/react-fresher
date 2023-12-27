import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import viteLogo from '/vite.svg'
import { toast } from 'react-toastify'
import { useLocalStorage } from '@uidotdev/usehooks'

const Header = () => {
  const navigate = useNavigate()
  const [token, setToken] = useLocalStorage('token', null)

  const handleLogout = () => {
    if (!token) {
      toast.error('You are not logged in')
      return
    }

    setToken(null)
    navigate('/login')
    toast.success('Logout successful')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={viteLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          React Fresher
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            {token && (
              <NavLink className="nav-link" to="/users">
                Manager Users
              </NavLink>
            )}
          </Nav>
          <Nav>
            <NavDropdown align="end" title="Setting">
              {!token && (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'dropdown-item' : 'dropdown-item'
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                  <NavDropdown.Divider />
                </>
              )}
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
