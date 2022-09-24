import React from "react"

import "./WeeklySummary.css"

function getStartOfWeek(from = Date.now()) {
  const date = new Date(from)
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -7 : 0)
  return new Date(date.setDate(diff)).setHours(0, 0, 0, 0)
}

function collectWeeklyRuns(runs) {
  const now = Date.now()
  const startOfThisWeek = getStartOfWeek()
  const endOfLastWeek = startOfThisWeek - 1
  const startOfLastWeek = getStartOfWeek(endOfLastWeek)

  function runsInDateRange(from, to) {
    return runs.filter(({ loggedAt }) => loggedAt >= from && loggedAt <= to)
  }

  return {
    thisWeek: runsInDateRange(startOfThisWeek, now),
    lastWeek: runsInDateRange(startOfLastWeek, endOfLastWeek),
  }
}

function calcAvgMinsPerK(time, distance) {
  if (time <= 0) return 0
  const timePerK = time / distance
  const date = new Date(0, 0)
  date.setSeconds(+timePerK)
  return date.toTimeString().slice(3, 8)
}

function formatHMS(time) {
  const date = new Date(0, 0)
  date.setSeconds(+time)
  return date.toTimeString().slice(0, 8)
}

function totalRunStats(runs) {
  const { time, distance } = runs.reduce(
    (stats, run) => ({
      time: stats.time + run.timeHH * 60 * 60 + run.timeMM * 60 + run.timeSS,
      distance: Number(parseFloat(stats.distance) + parseFloat(run.distance)).toFixed(2),
    }),
    { time: 0, distance: 0 }
  )

  return {
    avgMinsPerK: calcAvgMinsPerK(time, distance),
    time: formatHMS(time),
    distance,
  }
}

export default function WeeklySummary({ runs }) {
  const { thisWeek, lastWeek } = collectWeeklyRuns(runs)
  const thisWeekStats = totalRunStats(thisWeek)
  const lastWeekStats = totalRunStats(lastWeek)

  return (
    <div className="container">
      <div className="WeeklySummary-container">
        <div className="WeeklySummary-week-labels">
          <div className="WeeklySummary-stats-header">&nbsp;</div>
          <div className="WeeklySummary-stat-label">Runs:</div>
          <div className="WeeklySummary-stat-label">Time:</div>
          <div className="WeeklySummary-stat-label">Ks:</div>
          <div className="WeeklySummary-stat-label">MpK:</div>
        </div>

        <div className="WeeklySummary-week-stats">
          <span className="WeeklySummary-stats-header">This week</span>
          <div className="WeeklySummary-stat">
            <span className="WeeklySummary-stat-info">{thisWeek.length}</span>
          </div>
          <div className="WeeklySummary-stat">
            <span className="WeeklySummary-stat-info">{thisWeekStats.time}</span>
          </div>
          <div className="WeeklySummary-stat">
            <span className="WeeklySummary-stat-info">{thisWeekStats.distance}</span>
          </div>
          <div className="WeeklySummary-stat">
            <span className="WeeklySummary-stat-info">{thisWeekStats.avgMinsPerK}</span>
          </div>
        </div>

        <div className="WeeklySummary-week-stats">
          <span className="WeeklySummary-stats-header">Last week</span>
          <div className="WeeklySummary-stat">
            <span className="WeeklySummary-stat-info">{lastWeek.length}</span>
          </div>
          <div className="WeeklySummary-stat">
            <span className="WeeklySummary-stat-info">{lastWeekStats.time}</span>
          </div>
          <div className="WeeklySummary-stat">
            <span className="WeeklySummary-stat-info">{lastWeekStats.distance}</span>
          </div>
          <div className="WeeklySummary-stat">
            <span className="WeeklySummary-stat-info">{lastWeekStats.avgMinsPerK}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
