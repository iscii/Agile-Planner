import React from "react"
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom"
// We import all the components we need in our app
import Navbar from "./components/Navbar"
import ScenarioList from "./components/ScenarioList"
import Edit from "./components/Edit"
import View from "./components/View"
import Create from "./components/Create"
import Artifact from "./components/Artifact"
import SignIn from "./components/SignIn"
//import Register from "./components/Register"
import FireBaseRegister from "./components/FireBaseRegister"
import FireBaseLogin from "./components/FireBaseLogin"
//import Protected from "./components/Protected"
//import CounterProtected from "./components/CounterProtected"
import Logout from "./components/Logout"
//import { UserProvider } from "./contexts/UserContext"
import { AuthProvider } from "./contexts/AuthContext"
import "./style/main.scss"


const App = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<FireBaseLogin />} />
          <Route path="/signin" element={<FireBaseLogin />} />
          <Route path="/register" element={<FireBaseRegister />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/scenarios" element={<ScenarioList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
          <Route path="/view/:id/:artifact/:artifactId" element={<Artifact />} />
          <Route path="*" element={<ScenarioList />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App