import React, { useState } from 'react'
import SignIn from './SignIn' // Import your SignIn component
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [isRegistered, setIsRegistered] = useState(false) // New state for controlling the view
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/createUser', { userName, email, password })
      console.log(response)
      console.log(`successfully registered user ${userName}`)
      setIsRegistered(true) // Set true to switch to SignIn view on successful registration
    } catch (error) {
      if (error.response && error.response.status === 401 || error.response.status === 404) {
        setErrorMessage('Invalid email or password')
      } else {
        // Note: backend does not throw proper error codes, so we cannot handle them correctly here.
        // setErrorMessage('An error occurred during login')
        setErrorMessage("User already exists")
      }
    }
  }

  if (isRegistered) {
    navigate('/signin') // Redirect to SignIn view
  }

  return (
    <div className='content-container register'>
      <h3>Register</h3>
      <div className='register-form'>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:
              <input
                type="email"
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
              </label>
          </div>
          <div>
            <label>Username:
              <input
                type="text"
                className='form-control'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                />
              </label>
          </div>
          <div>
            <label>Password:
              <input
                type="password"
                className='form-control'
                value={password}
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
          <input type='submit' value='Register' className="btn btn-primary mt-1" /> <br/>
        </form>
        <span className='link-msg'>Already have an account? <Link to='/signin'>Sign In</Link></span>
      </div>
    </div>
  )
}

export default Register
