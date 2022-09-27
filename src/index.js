import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./components/App/App"
import AppContext from "./components/AppContext/AppContext"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()