import React from "react"
import ReactDOM from 'react-dom/client'
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { firebaseConfig } from "./firebase/config"
import { initializeApp } from "firebase/app"
//import { initializeAnalytics } from "firebase/analytics";
const app = initializeApp(firebaseConfig)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
