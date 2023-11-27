import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

/** Protected route wrapper
 *  If authorized, return an outlet that will render child elements
 *  If not, return element that will navigate to login page
 */

const Protected = () => {
  const { isLoggedIn } = useContext(UserContext)
  return isLoggedIn() ? <Outlet /> : <Navigate to='/signin' replace={true} />
}

export default Protected