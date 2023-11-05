import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import ScenarioList from "./components/scenarioList";
import Edit from "./components/edit";
import Create from "./components/create";
 const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<ScenarioList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 export default App;