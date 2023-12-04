import React, { useContext } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import agile from '../image/agile.webp'
import { NavLink } from "react-router-dom"
import '../style/navbar.scss'
import { AuthContext } from "../contexts/AuthContext"

export default function Navbar() {
  const { currentUser } = useContext(AuthContext)

  return (
    <div>
      <nav className="navbar navbar-expand-lg d-flex flex-row justify-content-between">
        <NavLink className="navbar-brand" to="/scenarios">
          <img style={{ "width": "25%" }} src={agile} alt="Agile Logo"></img>
        </NavLink>
        <div className="navbar-right collapse navbar-collapse flex-grow-0 mr-5" id="navbarSupportedContent">
          {currentUser && (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/scenarios">
                  Scenarios
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/create">
                  Create Record
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  )
}
