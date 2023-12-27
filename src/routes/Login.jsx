import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import Header from '../components/Header'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <Header />
      <Container>
        <h1 className="text-center">Login</h1>
        <Form style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email or Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email or username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <span
                className="position-absolute top-50 translate-middle-y"
                style={{ right: '12px' }}
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={email && password ? false : true}
          >
            Login
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default Login
