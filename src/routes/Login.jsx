import { useLocalStorage } from '@uidotdev/usehooks'
import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import { loginApi } from '../services/UserService'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useLocalStorage('token', null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }

    try {
      const res = await loginApi(email, password)
      if (res?.token) {
        setToken(res.token)
        toast.success('Login successful')
        setEmail('')
        setPassword('')
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message || error)
      console.error(error)
    }
  }
  return (
    <>
      <Header />
      <Container>
        <h1 className="text-center">Login</h1>
        <Form style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email (eve.holt@reqres.in)</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
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
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default Login
