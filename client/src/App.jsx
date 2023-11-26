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
import Register from "./components/Register"
import Protected from "./components/Protected"
import CounterProtected from "./components/CounterProtected"
import Logout from "./components/Logout"
import { UserProvider } from "./contexts/UserContext"
import "./style/main.scss"

const App = () => {
  return (
    <UserProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Protected />}>
            <Route path="/" element={<ScenarioList />} />
          </Route>
          <Route path="/signin" element={<CounterProtected />} >
            <Route path="/signin" element={<SignIn />} />
          </Route>
          <Route path="/register" element={<CounterProtected />} >
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/logout" element={<Protected />}>
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/scenarios" element={<Protected />}>
            <Route path="/scenarios" element={<ScenarioList />} />
          </Route>
          <Route path="/edit" element={<Protected />}>
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
          <Route path="/create" element={<Protected />}>
            <Route path="/create" element={<Create />} />
          </Route>
          <Route path='/view/:id' element={<Protected />}>
            <Route path='/view/:id' element={<View />} />
          </Route>
          <Route path='/view/:id/:artifact/:artifactId' element={<Protected />}>
            <Route path='/view/:id/:artifact/:artifactId' element={<Artifact />} />
          </Route>
          <Route path='*' element={<Protected />}>
            <Route path="*" element={<ScenarioList />} />
          </Route>      
        </Routes>
      </div>
    </UserProvider>
  )
}
export default App