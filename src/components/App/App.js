import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import Onboarding from "../../pages/Onboarding/Onboarding"
import Runs from "../../pages/Runs/Runs"
import { useAppContext } from "../AppContext/AppContext"

import './App.css';

function App() {
  const { state: { user: { onboard }} } = useAppContext()

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">Treddr</div>
        { onboard && <div className="App-menu"><GiHamburgerMenu /></div>}
      </header>
      <main className="App-container">
        {onboard ? <Runs /> : <Onboarding />}
      </main>
    </div>
  );
}

export default App;
