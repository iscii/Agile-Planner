import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword } from '../firebase/fbFunctions.jsx'

function FireBaseLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await doSignInWithEmailAndPassword(email, password)
      navigate('/scenarios')
    } catch (error) {
      setError('Failed to log in: ' + error.message)
    }
  }

  return (
    <div className='content-container signin'>
      <h1>Log In</h1>
      <div className='signin-form'>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder='Email'
              className="form-control"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              id="password"
              name="password"
              type="password"
              placeholder='Password'
              required
              autoComplete='off'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <button type='submit'>
          Log in
        </button>
        {error && <p>{error}</p>} */}
          <div className='error-msg'>
            {error &&
              error
            }
          </div>
          <input type='submit' value='Sign In' className="btn btn-primary mt-2" /> <br />
        </form>
        <span className='link-msg'>Don't have an account? <Link to='/register'>Register</Link></span>
      </div>
    </div>
  )
};

export default FireBaseLogin
