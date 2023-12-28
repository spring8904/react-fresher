import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorPage from './routes/ErrorPage'
import Home from './routes/Home'
import Login from './routes/Login'
import PrivateRoute from './routes/PrivateRoute'
import Users from './routes/Users'

const App = () => {
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

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
