import React from 'react'
import { Link } from 'react-router-dom'
import Signin from './SignIn'
const Landing = () => {
  return (
    <div>
      <Signin />
      <Link to='/register'>Register</Link>
    </div>
  )
}


export default Landing
