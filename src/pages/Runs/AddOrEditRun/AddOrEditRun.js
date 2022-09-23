import React, { useState, useCallback } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'

import { useAppContext, ACTIONS } from '../../../components/AppContext/AppContext';
import Button from "../../../components/Button/Button"
import buildRunPayload from "./buildRunPayload"

import "./AddOrEditRun.css";

export default function AddOrEditRun({ returnToRuns, editRun }) {
  const { dispatch } = useAppContext()
  const editing = !!editRun
  const [logDate, setLogDate] = useState((editing ? new Date(editRun.loggedAt) : new Date()).toISOString().split('T')[0])
  const [speed, setSpeed] = useState(editRun?.speed || "")
  const [timeHH, setTimeHH] = useState(editRun?.timeHH || "")
  const [timeMM, setTimeMM] = useState(editRun?.timeMM || "")
  const [timeSS, setTimeSS] = useState(editRun?.timeSS || "")
  const [error, setError] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  function handleAddOrEditRun() {
    setError("")

    if (speed <= 0) return setError("Enter a speed greater than 0")
    if (timeHH <= 0 && timeMM <= 0 && timeSS <= 0) return setError("Enter at least 1 valid time")
    
    const payload = editing ? {...editRun} : {}
    const type = editing ? ACTIONS.EDIT_RUN : ACTIONS.ADD_NEW_RUN
    
    if (speed !== "" && !isNaN(speed)) payload.speed = speed
    if (timeHH !== "" && !isNaN(timeHH)) payload.timeHH = timeHH
    if (timeMM !== "" && !isNaN(timeMM)) payload.timeMM = timeMM
    if (timeSS !== "" && !isNaN(timeSS)) payload.timeSS = timeSS
    payload.logDate = logDate

    dispatch({ type, payload: buildRunPayload(payload) })
    returnToRuns()
  }

  function setParsedInt(fn, value) {
    const fallback = editing ? 0 : ""
    fn((value === "" || isNaN(value)) ? fallback : parseInt(value, 10))
  }

  const handleDelete = useCallback(() => {
    setShowDeleteConfirm(true)
  }, [setShowDeleteConfirm])

  const handleConfirmedDelete = useCallback(() => {
    dispatch({ type: ACTIONS.DELETE_RUN, payload: editRun.createdAt })
    returnToRuns()
  }, [dispatch, editRun, returnToRuns])

  return (
    <>
      <h1 className="AddOrEditRun-title">{editing ? "Edit run" : "Add new run"}</h1>
      {error && <p>{error}</p>}

      <div className="AddOrEditRun-input-container">
        <label htmlFor="logDate" className="AddOrEditRun-label">
          Date:
        </label>
        <input value={logDate} onChange={({target: {value}}) => setLogDate(value)} type="date" className="AddOrEditRun-input" id="logDate" />
      </div>

      <div className="AddOrEditRun-input-container">
        <label htmlFor="speed" className="AddOrEditRun-label">
          KM:
        </label>
        <input value={speed} onChange={({target: {value}}) => setParsedInt(setSpeed, value)} type="number" className="AddOrEditRun-input" id="speed" placeholder="enter treadmill speed" />
      </div>

      <div className="AddOrEditRun-input-container">
        <label htmlFor="time" className="AddOrEditRun-label">
          Time:
        </label>
        <div className="AddOrEditRun-time-container">
          <input value={timeHH} onChange={({target: {value}}) => setParsedInt(setTimeHH, value)} className="AddOrEditRun-time" id="time" type="number" placeholder="HH" />
          <span className="AddOrEditRun-colon">:</span>
          <input value={timeMM} onChange={({target: {value}}) => setParsedInt(setTimeMM, value)} className="AddOrEditRun-time" type="number" placeholder="MM" />
          <span className="AddOrEditRun-colon">:</span>
          <input value={timeSS} onChange={({target: {value}}) => setParsedInt(setTimeSS, value)} className="AddOrEditRun-time" type="number" placeholder="SS" />
        </div>
      </div>

      <Button handleClick={handleAddOrEditRun}>
        {editing ? "Save change" : <><AiOutlinePlus className="AddOrEditRun-icon" />Add new run</>}
      </Button>

      {(editing && !showDeleteConfirm) && <Button handleClick={handleDelete} type="danger">
        Delete run
      </Button>}

      {showDeleteConfirm && <Button handleClick={handleConfirmedDelete} type="danger">
        Are you sure?
      </Button>}

      <Button handleClick={returnToRuns} type="danger">
        Cancel
      </Button>
    </>
  )
}