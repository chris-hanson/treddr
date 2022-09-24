import React, { useEffect, useState, useCallback } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { GrInstall } from "react-icons/gr"
import { FiShare } from "react-icons/fi"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { AiOutlineClose } from "react-icons/ai"

import VERSION from "../../version"
import Onboarding from "../../pages/Onboarding/Onboarding"
import Runs from "../../pages/Runs/Runs"
import { useAppContext, ACTIONS } from "../AppContext/AppContext"
import Button from "../Button/Button"

import "./App.css"

function App() {
  const {
    state: {
      user: { onboard, name },
    },
    dispatch,
  } = useAppContext()
  const [installEvent, setInstallEvent] = useState()
  const [showIOSMessage, setShowIOSMessage] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [newName, setNewName] = useState(name)

  function handleOpenMenu() {
    setMenuOpen(true)
  }

  function handleCloseMenu() {
    setMenuOpen(false)
  }

  const handleUpdateDetails = useCallback(() => {
    if (!newName) return
    dispatch({ type: ACTIONS.UPDATE_USER, payload: { name: newName } })
  }, [dispatch, newName])

  const install = useCallback(() => {
    if (installEvent) return installEvent.prompt()
    return setShowIOSMessage(true)
  }, [setShowIOSMessage, installEvent])

  const handleCloseIOSMessage = useCallback(() => {
    setShowIOSMessage(false)
  }, [setShowIOSMessage])

  useEffect(() => {
    function eventHandler(event) {
      setInstallEvent(event)
    }

    window.addEventListener("beforeinstallprompt", eventHandler)

    return () => {
      window.removeEventListener("beforeinstallprompt", eventHandler)
    }
  }, [setInstallEvent])

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">Treddr</div>
        <span className="App-buttons">
          {!showIOSMessage && (
            <span className="App-install-btn">
              <Button handleClick={install} inline>
                <GrInstall className="App-install-ico" /> Install
              </Button>
            </span>
          )}
          {onboard && (
            <>
              {!menuOpen && (
                <button type="button" className="App-menu-btn" onClick={handleOpenMenu}>
                  <GiHamburgerMenu />
                </button>
              )}
              {menuOpen && (
                <button type="button" className="App-menu-btn" onClick={handleCloseMenu}>
                  <AiOutlineClose />
                </button>
              )}
            </>
          )}
        </span>
      </header>

      {showIOSMessage && (
        <p className="App-ios-message">
          To install on iOS click{" "}
          <span className="App-ios-message-icon">
            <FiShare />
          </span>{" "}
          and&nbsp;<strong>Add To Home Screen</strong>
          <span className="App-ios-message-btn">
            <Button handleClick={handleCloseIOSMessage} type="danger" inline>
              <IoIosCloseCircleOutline />
            </Button>
          </span>
        </p>
      )}

      <main className="App-container">
        {menuOpen && (
          <div className="App-menu">
            <div>
              <h2>Edit details</h2>
              <input
                placeholder="name is required"
                className="App-menu-input"
                type="text"
                value={newName}
                onChange={({ target: { value } }) => setNewName(value)}
              />
              <Button handleClick={handleUpdateDetails}>Save</Button>
            </div>

            <div>
              <h2>About</h2>
              <p>
                A simple treadmill logging app. No data is collected, everything is stored locally,
                so be careful not to clear your cache :)
              </p>
              <p>
                Made by <a href="http://www.chrishanson.info/">Chris Hanson</a> for personal use.
              </p>
              <small>{VERSION}</small>
            </div>
          </div>
        )}
        {onboard ? <Runs /> : <Onboarding />}
      </main>
    </div>
  )
}

export default App
