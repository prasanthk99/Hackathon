import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
    const navigate = useNavigate();
  return (
    <div className="error-page d-flex justify-content-center align-items-center">
        <div className="text-center">
            <h1 className="display-1 mb-4">Oops!</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/')}
            >
                Go To Home
            </Button>
        </div>
    </div>
  )
}

export default ErrorPage