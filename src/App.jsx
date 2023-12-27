import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorPage from './routes/ErrorPage.jsx'
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import Users from './routes/Users.jsx'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/users',
      element: <Users />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
