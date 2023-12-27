import { NavLink, useRouteError } from 'react-router-dom'
import Header from '../components/Header'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <>
      <Header />
      <div className="d-flex align-items-center justify-content-center mt-5">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            {' '}
            <span className="text-danger">Opps!</span> Page not found.
          </p>
          <p className="lead">The page you’re looking for doesn’t exist.</p>
          <NavLink to="/" className="btn btn-primary">
            Go Home
          </NavLink>
        </div>
      </div>
    </>
  )
}
