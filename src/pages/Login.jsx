import { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'

function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <LoginForm />
    </div>
  )
}

export default Login  // Make sure this line exists