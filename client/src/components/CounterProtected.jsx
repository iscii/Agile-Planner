import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

/** CounterProtected route wrapper
 *  Prevents access to auth pages if already logged in
 */

const CounterProtected = () => {
  const { isLoggedIn } = useContext(UserContext)
  return isLoggedIn() ? <Navigate to='/' replace={true} /> : <Outlet />
}

export default CounterProtected