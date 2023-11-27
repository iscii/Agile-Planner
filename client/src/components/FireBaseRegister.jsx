import React, { useContext, useState } from 'react'
import { doCreateUserWithEmailAndPassword } from '../firebase/fbFunctions.jsx'
import { AuthContext } from '../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function FireBaseRegister() {
  const { currentUser } = useContext(AuthContext)
  const [pwMatch, setPwMatch] = useState('')
  const navigate = useNavigate()
  const handleSignUp = async (e) => {
    e.preventDefault()
    const { email, passwordOne, passwordTwo } = e.target.elements
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch('Passwords do not match')
      return false
    }

    try {
      await doCreateUserWithEmailAndPassword(
        email.value,
        passwordOne.value
      )
      navigate('/')
    } catch (error) {
      alert(error)
    }
  }

  return (

    <div>
      <h1>Sign Up</h1>
      {pwMatch && <h4>{pwMatch}</h4>}
      <form onSubmit={handleSignUp}>
        <label>
          Email:
          <input
            required
            name='email'
            type='email'
            placeholder='Email'
          />
        </label>
        <label>
          Password:
          <input
            required
            name='passwordOne'
            type='password'
            placeholder='Password'
            autoComplete='off'
          />
        </label>

        <label>
          Confirm Password:
          <input
            required
            name='passwordTwo'
            type='password'
            placeholder='Confirm Password'
            autoComplete='off'
          />
        </label>

        <button
          id='submitButton'
          name='submitButton'
          type='submit'
        >
          Sign Up
        </button>


      </form>



    </div>
  )

};

export default FireBaseRegister