import React, { useState } from 'react'
import { doCreateUserWithEmailAndPassword } from '../firebase/fbFunctions.jsx'
//import { AuthContext } from '../contexts/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'

function FireBaseRegister() {
  //const { currentUser } = useContext(AuthContext)
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

    <div className='content-container register'>
      <h1>Sign Up</h1>
      <div className='register-form'>
        {pwMatch && <h4>{pwMatch}</h4>}
        <form onSubmit={handleSignUp}>
          <div>
            <label>
              Email:
              <input
                className='form-control'
                required
                name='email'
                type='email'
                placeholder='Email'
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                required
                className='form-control'
                name='passwordOne'
                type='password'
                placeholder='Password'
                autoComplete='off'
              />
            </label>
          </div>
          <div>
            <label>
              Confirm Password:
              <input
                required
                className='form-control'
                name='passwordTwo'
                type='password'
                placeholder='Confirm Password'
                autoComplete='off'
              />
            </label>
          </div>

          <input type='submit' value='Register' className="btn btn-primary mt-1" /> <br />
        </form>
        <span className='link-msg'>Already have an account? <Link to='/signin'>Sign In</Link></span>
      </div>
    </div>
  )

};

export default FireBaseRegister