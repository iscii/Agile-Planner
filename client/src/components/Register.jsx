import React, { useState } from 'react'
import axios from 'axios'
import SignIn from './SignIn' // Import your SignIn component

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [isRegistered, setIsRegistered] = useState(false) // New state for controlling the view
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/createUser', { userName, email, password })
      setIsRegistered(true) // Set true to switch to SignIn view on successful registration
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid email or password')
      } else {
        setErrorMessage('An error occurred during login')
      }
    }
  }

  if (isRegistered) {
    return <SignIn /> // Render SignIn component upon successful registration
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>userName:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  )
}

export default Register
