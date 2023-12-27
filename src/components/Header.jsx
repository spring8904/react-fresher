import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import viteLogo from '/vite.svg'

const Header = () => {
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
            <NavLink className="nav-link" to="/users">
              Manager Users
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown align="end" title="Setting">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
