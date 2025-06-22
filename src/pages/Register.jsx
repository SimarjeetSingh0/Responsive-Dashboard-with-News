import { useState } from 'react'
import RegisterForm from '../components/auth/RegisterForm'

function Register() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <RegisterForm />
    </div>
  )
}

export default Register