import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/login', { email, password })
      // Handle successful login, e.g., store user ID in state or localStorage
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 404) {
        setErrorMessage('Invalid email or password')
      } else {
        setErrorMessage('An error occurred during login')
      }
    }
  }

  return (
    <div className='content-container signin'>
      <h3>Sign In</h3>
      <div className='signin-form'>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
          </div>
          <div>
            <label>Password:
              <input
                type="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
          </div>
          <div className='error-msg'>
            { errorMessage && 
              errorMessage
            }
          </div> 
          <input type='submit' value='Sign In' className="btn btn-primary mt-2" /> <br/>
        </form>
        <span className='link-msg'>Don't have an account? <Link to='/register'>Register</Link></span>
      </div>
    </div>
  )
}

export default SignIn;

