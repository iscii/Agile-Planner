import React, { useState } from 'react'
import axios from 'axios'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password })
      const { userID } = response.data
      console.log(response)
      // Handle successful login, e.g., store user ID in state or localStorage
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage('Invalid email or password')
      } else {
        setErrorMessage('An error occurred during login')
      }
    }
  }

  return (
    <div>
      <h2>Sign In</h2>
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  )
}

export default Signin;

