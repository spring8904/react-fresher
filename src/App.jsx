import { useLocalStorage } from '@uidotdev/usehooks'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from './context/UserContext'
import ErrorPage from './routes/ErrorPage'
import Home from './routes/Home'
import Login from './routes/Login'
import PrivateRoute from './routes/PrivateRoute'
import Users from './routes/Users'

const App = () => {
  const [token] = useLocalStorage('token', null)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/users',
      element: (
        <PrivateRoute>
          <Users />
        </PrivateRoute>
      ),
    },
    {
      path: '/login',
      element: <Login />,
    },
  ])

  const { login } = useContext(UserContext)

  useEffect(() => {
    if (token) {
      login(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
