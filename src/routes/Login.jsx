import { useCopyToClipboard } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import { handleLogin } from '../redux/userSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [, copyToClipboard] = useCopyToClipboard()
  const isLoading = useSelector((state) => state.user.isLoading)
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user?.auth) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }

    dispatch(handleLogin(email, password))
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
