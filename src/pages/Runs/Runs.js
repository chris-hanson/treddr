import React, { useState, useCallback } from 'react';
import { BiRun } from 'react-icons/bi';

import { useAppContext } from '../../components/AppContext/AppContext';
import Button from "../../components/Button/Button"

import "./Runs.css";

function AddNewRun({ handleNewRun }) {
  return (
    <>
      <h1 className="AddNewRun-title">Add new run</h1>
      <div className="AddNewRun-input-container">
        <label htmlFor="speed" className="AddNewRun-label">
          KM:
        </label>
        <input type="number" className="AddNewRun-input" id="speed" placeholder="enter treadmill speed" />
      </div>

      <div className="AddNewRun-input-container">
        <label htmlFor="time" className="AddNewRun-label">
          Time:
        </label>
        <div className="AddNewRun-time-container">
          <input className="AddNewRun-time" id="time" type="number" placeholder="HH" />
          <span className="AddNewRun-colon">:</span>
          <input className="AddNewRun-time" type="number" placeholder="MM" />
          <span className="AddNewRun-colon">:</span>
          <input className="AddNewRun-time" type="number" placeholder="SS" />
        </div>
      </div>

      <Button handleClick={handleNewRun}>
        Add a run <BiRun className="Runs-icon" />
      </Button>
    </>
  )
}

export default function Runs() {
  const { state: { user, runs } } = useAppContext()
  const [showAddRunScreen, setShowAddRunScreen] = useState(false)

  const handleClick = useCallback(() => {
    setShowAddRunScreen(true)
  }, [setShowAddRunScreen])

  const handleNewRun = useCallback(() => {
    setShowAddRunScreen(false)
  }, [setShowAddRunScreen])

  if (showAddRunScreen) return <AddNewRun handleNewRun={handleNewRun} />

  return (
    <>
      <h1>Hi {user.name},</h1>
      {runs.map(run => (<p>{run.id}</p>))}

      {!runs.length && <p>You haven't logged any runs yet. Add a one now, it's really easy.</p>}

      <Button handleClick={handleClick}>
        Add a run <BiRun className="Runs-icon" />
      </Button>
    </>
  )
}