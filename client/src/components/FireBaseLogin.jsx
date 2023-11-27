import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email Address:</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder='Email'
          required
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder='Password'
          required
          autoComplete='off'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>
          Log in
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
};

export default FireBaseLogin
