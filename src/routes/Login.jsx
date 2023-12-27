import { useCopyToClipboard, useLocalStorage } from '@uidotdev/usehooks'
import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import { UserContext } from '../context/UserContext'
import { loginApi } from '../services/UserService'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [, copyToClipboard] = useCopyToClipboard()
  const { login } = useContext(UserContext)
  const [token] = useLocalStorage('token', null)

  useEffect(() => {
    if (token) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }

    setIsLoading(true)
    try {
      const res = await loginApi(email.trim(), password)
      if (res?.token) {
        login(email)
        setIsLoading(false)
        navigate('/')
        toast.success('Login successful')
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message || error)
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <Container>
        <h1 className="text-center">Login</h1>
        <div className="mt-4 d-flex justify-content-center">
          <div className="border p-2 rounded d-flex align-items-center">
            <span className="me-3">eve.holt@reqres.in</span>
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => {
                copyToClipboard('eve.holt@reqres.in')
                toast.success('Copied to clipboard')
              }}
            >
              Copy
            </Button>
          </div>
        </div>
        <Form style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
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
          <Button
            variant="primary"
            type="submit"
            disabled={!email || !password || isLoading ? true : false}
            onClick={handleSubmit}
          >
            {isLoading ? <Spinner size="sm" /> : 'Login'}
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default Login
