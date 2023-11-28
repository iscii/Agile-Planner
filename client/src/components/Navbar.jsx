// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css"
import agile from '../image/agile.webp'
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom"
// Here, we display our Navbar
import '../style/navbar.scss'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg d-flex flex-row justify-content-between">
        <NavLink className="navbar-brand" to="/">
          <img style={{ "width": 25 + '%' }} src={agile}></img>
        </NavLink>
        <div className="navbar-right collapse navbar-collapse flex-grow-0 mr-5" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Create Record
              </NavLink>
              <NavLink className="nav-link" to="/scenarios">
                Scenarios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}