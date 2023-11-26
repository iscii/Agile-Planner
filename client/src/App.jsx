import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/Navbar";
import ScenarioList from "./components/ScenarioList";
import Edit from "./components/Edit";
import View from "./components/View";
import Create from "./components/Create";
import Artifact from "./components/Artifact";
import "./style/main.scss"
 const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<ScenarioList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path='/view/:id' element={<View />} />
       <Route path="/create" element={<Create />} />
       <Route path='/view/:id/:artifact/:artifactId' element={<Artifact />} />
     </Routes>
   </div>
 );
};
 export default App;