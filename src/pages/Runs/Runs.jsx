import React, { useState, useCallback } from "react"
import { BiRun } from "react-icons/bi"

import { useAppContext } from "../../components/AppContext/AppContext"
import Button from "../../components/Button/Button"
import AddOrEditRun from "./AddOrEditRun/AddOrEditRun"
import PeriodSummary from "./PeriodSummary/PeriodSummary"
import padNum from "./padNum"

import "./Runs.css"

export default function Runs() {
  const {
    state: { user, runs },
  } = useAppContext()
  const [showAddRunScreen, setShowAddRunScreen] = useState(false)
  const [editRun, setEditRun] = useState()

  const handleClick = useCallback(() => {
    setShowAddRunScreen(true)
  }, [setShowAddRunScreen])

  const returnToRuns = useCallback(() => {
    setShowAddRunScreen(false)
    setEditRun(null)
  }, [setShowAddRunScreen])

  function handleRunClick(run) {
    setEditRun(run)
    setShowAddRunScreen(true)
  }

  if (showAddRunScreen) return <AddOrEditRun returnToRuns={returnToRuns} editRun={editRun} />

  return (
    <>
      <div className="container">
        <h1>Hi {user.name},</h1>

        {!runs.length && (
          <p>You haven&apos;t logged any runs yet. Add a one now, it&apos;s really easy.</p>
        )}

        <Button handleClick={handleClick}>
          Add a run <BiRun className="Runs-icon" />
        </Button>
      </div>

      {!!runs.length && <PeriodSummary runs={runs} />}

      {!!runs.length && (
        <div className="Runs-list-container">
          <table className="Runs-list-table">
            <thead>
              <tr className="Runs-th">
                <th width="130">Date</th>
                <th>KM</th>
                <th>H:M:S</th>
                <th>Ks</th>
              </tr>
            </thead>

            <tbody>
              {runs.map(run => (
                <tr className="Runs-run" key={run.createdAt} onClick={() => handleRunClick(run)}>
                  <td>{new Date(run.loggedAt).toLocaleDateString()}</td>
                  <td>{run.speed}</td>
                  <td>
                    {padNum(run.timeHH)}:{padNum(run.timeMM)}:{padNum(run.timeSS)}
                  </td>
                  <td>{run.distance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
