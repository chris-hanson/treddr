import React, { useState, useCallback } from 'react';
import { BiRun } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai'

import { useAppContext, ACTIONS } from '../../components/AppContext/AppContext';
import Button from "../../components/Button/Button"
import buildRunPayload from "./buildRunPayload"

import "./Runs.css";

function AddNewRun({ returnToRuns }) {
  const { dispatch } = useAppContext()
  const [speed, setSpeed] = useState("")
  const [timeHH, setTimeHH] = useState("")
  const [timeMM, setTimeMM] = useState("")
  const [timeSS, setTimeSS] = useState("")
  const [error, setError] = useState()

  function handleAddNewRun() {
    setError("")

    if (speed <= 0) return setError("Enter a speed greater than 0")
    if (timeHH <= 0 && timeMM <= 0 && timeSS <= 0) return setError("Enter at least 1 valid time")
    
    const payload = { speed }
    if (timeHH && !isNaN(timeHH)) payload.timeHH = timeHH
    if (timeMM && !isNaN(timeMM)) payload.timeMM = timeMM
    if (timeSS && !isNaN(timeSS)) payload.timeSS = timeSS

    dispatch({ type: ACTIONS.ADD_NEW_RUN, payload: buildRunPayload(payload) })
    returnToRuns()
  }

  function setParsedInt(fn, value) {
    fn((value === "" || isNaN(value)) ? "" : parseInt(value, 10))
  }

  return (
    <>
      <h1 className="AddNewRun-title">Add new run</h1>
      {error && <p>{error}</p>}
      <div className="AddNewRun-input-container">
        <label htmlFor="speed" className="AddNewRun-label">
          KM:
        </label>
        <input value={speed} onChange={({target: {value}}) => setParsedInt(setSpeed, value)} type="number" className="AddNewRun-input" id="speed" placeholder="enter treadmill speed" />
      </div>

      <div className="AddNewRun-input-container">
        <label htmlFor="time" className="AddNewRun-label">
          Time:
        </label>
        <div className="AddNewRun-time-container">
          <input value={timeHH} onChange={({target: {value}}) => setParsedInt(setTimeHH, value)} className="AddNewRun-time" id="time" type="number" placeholder="HH" />
          <span className="AddNewRun-colon">:</span>
          <input value={timeMM} onChange={({target: {value}}) => setParsedInt(setTimeMM, value)} className="AddNewRun-time" type="number" placeholder="MM" />
          <span className="AddNewRun-colon">:</span>
          <input value={timeSS} onChange={({target: {value}}) => setParsedInt(setTimeSS, value)} className="AddNewRun-time" type="number" placeholder="SS" />
        </div>
      </div>

      <Button handleClick={handleAddNewRun}>
        <AiOutlinePlus className="AddNewRun-icon" /> Add new run
      </Button>

      <Button handleClick={returnToRuns} type="danger">
        Cancel
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

  const returnToRuns = useCallback(() => {
    setShowAddRunScreen(false)
  }, [setShowAddRunScreen])

  if (showAddRunScreen) return <AddNewRun returnToRuns={returnToRuns} />

  return (
    <>
      <h1>Hi {user.name},</h1>
      {runs.map(run => (<p key={run.createdAt}>{run.createdAt}</p>))}

      {!runs.length && <p>You haven't logged any runs yet. Add a one now, it's really easy.</p>}

      <Button handleClick={handleClick}>
        Add a run <BiRun className="Runs-icon" />
      </Button>
    </>
  )
}