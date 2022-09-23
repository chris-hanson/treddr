import React, { useEffect, useState, useCallback } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrInstall } from 'react-icons/gr'
import { FiShare } from 'react-icons/fi'
import { IoIosCloseCircleOutline } from 'react-icons/io'

import Onboarding from "../../pages/Onboarding/Onboarding"
import Runs from "../../pages/Runs/Runs"
import { useAppContext } from "../AppContext/AppContext"
import Button from "../Button/Button"

import './App.css';

function App() {
  const { state: { user: { onboard } } } = useAppContext()
  const [installEvent, setInstallEvent] = useState()
  const [showIOSMessage, setShowIOSMessage] = useState()
  
  function install() {
    if (installEvent) return installEvent.prompt();
    setShowIOSMessage(true)
  }

  const handleCloseIOSMessage = useCallback(() => {
    setShowIOSMessage(false)
  }, [setShowIOSMessage])

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
        <span className="App-buttons">
          {!showIOSMessage && <span className="App-install-btn"><Button handleClick={install} inline>
            <GrInstall className="App-install-ico" /> Install
          </Button></span>}
          {onboard && <div className="App-menu"><GiHamburgerMenu /></div>}
        </span>
      </header>

      {showIOSMessage && <p className="App-ios-message">To install on iOS click <span className="App-ios-message-icon"><FiShare /></span> and&nbsp;<strong>Add To Home Screen</strong><span className="App-ios-message-btn"><Button handleClick={handleCloseIOSMessage} type="danger" inline><IoIosCloseCircleOutline /></Button></span></p>}

      <main className="App-container">
        {onboard ? <Runs /> : <Onboarding />}
      </main>
    </div>
  );
}

export default App;
