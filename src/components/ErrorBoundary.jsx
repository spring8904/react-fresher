import React from 'react'
import Navia from './Navia'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className="mt-5 mb-3">
            <Navia />
          </div>
          <h1 className="text-danger text-center">Something went wrong.</h1>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
