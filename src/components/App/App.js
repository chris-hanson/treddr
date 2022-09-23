import React, { useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrInstall } from 'react-icons/gr'

import Onboarding from "../../pages/Onboarding/Onboarding"
import Runs from "../../pages/Runs/Runs"
import { useAppContext } from "../AppContext/AppContext"
import Button from "../Button/Button"

import './App.css';

function App() {
  const { state: { user: { onboard } } } = useAppContext()
  const [installEvent, setInstallEvent] = useState()
  
  function install() {
    installEvent.prompt();
  }

  useEffect(() => {
    function eventHandler(event) {
      setInstallEvent(event);
    }

    window.addEventListener("beforeinstallprompt", eventHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", eventHandler);
    }
  }, [setInstallEvent])

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">Treddr</div>
        { onboard && <div className="App-menu"><GiHamburgerMenu /></div>}
      </header>
      <main className="App-container">
        {onboard ? <Runs /> : <Onboarding />}
      </main>
      {installEvent && <Button handleClick={install} disabled>
        <GrInstall className="App-install-ico" /> Install App
      </Button>}
    </div>
  );
}

export default App;
