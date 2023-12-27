import { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
import viteLogo from '/vite.svg'

const Header = () => {
  const { user, logout } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
    toast.success('Logout successful')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink className="navbar-brand" to="/">
          <img
            alt=""
            src={viteLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          React Fresher
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="py-2">
          <Nav className="me-auto">
            {user?.auth && (
              <NavLink className="nav-link" to="/users">
                Manager Users
              </NavLink>
            )}
          </Nav>
          <Nav className="gap-3 align-items-start lg-align-items-center">
            {user?.auth ? (
              <>
                <span className="d-none lg-d-block">Welcome {user?.email}</span>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                {window.location.pathname !== '/login' && (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? 'btn btn-outline-success'
                        : 'btn btn-outline-success'
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
