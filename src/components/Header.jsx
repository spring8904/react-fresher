import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../redux/userSlice'
import viteLogo from '/vite.svg'

const Header = () => {
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
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
              <NavLink className="nav-link fs-5" to="/users">
                Manager Users
              </NavLink>
            )}
          </Nav>
          <Nav className="gap-3 align-items-start align-items-lg-center">
            {user?.auth ? (
              <>
                <span className="d-none d-lg-block">
                  Welcome <b>{user?.email}</b>
                </span>
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
