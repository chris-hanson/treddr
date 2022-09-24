import React from "react"

import "./PeriodSummary.css"

function getStartOfPeriod(period, from = Date.now()) {
  const date = new Date(from)
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -7 : 0)
  return new Date(date.setDate(diff)).setHours(0, 0, 0, 0)
}

function collectRunsByPeriod(period, runs) {
  const now = Date.now()
  const startOfThisPeriod = getStartOfPeriod(period)
  const endOfLastPeriod = startOfThisPeriod - 1
  const startOfLastPeriod = getStartOfPeriod(period, endOfLastPeriod)

  function runsInDateRange(from, to) {
    return runs.filter(({ loggedAt }) => loggedAt >= from && loggedAt <= to)
  }

  return {
    thisPeriod: runsInDateRange(startOfThisPeriod, now),
    lastPeriod: runsInDateRange(startOfLastPeriod, endOfLastPeriod),
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

export default function PeriodSummary({ runs }) {
  const { thisPeriod, lastPeriod } = collectRunsByPeriod("week", runs)
  const thisPeriodStats = totalRunStats(thisPeriod)
  const lastPeriodStats = totalRunStats(lastPeriod)

  return (
    <div className="container">
      <div className="PeriodSummary-container">
        <div className="PeriodSummary-week-labels">
          <div className="PeriodSummary-stats-header">&nbsp;</div>
          <div className="PeriodSummary-stat-label">Runs:</div>
          <div className="PeriodSummary-stat-label">Time:</div>
          <div className="PeriodSummary-stat-label">Ks:</div>
          <div className="PeriodSummary-stat-label">MpK:</div>
        </div>

        <div className="PeriodSummary-week-stats">
          <span className="PeriodSummary-stats-header">This week</span>
          <div className="PeriodSummary-stat">
            <span className="PeriodSummary-stat-info">{thisPeriod.length}</span>
          </div>
          <div className="PeriodSummary-stat">
            <span className="PeriodSummary-stat-info">{thisPeriodStats.time}</span>
          </div>
          <div className="PeriodSummary-stat">
            <span className="PeriodSummary-stat-info">{thisPeriodStats.distance}</span>
          </div>
          <div className="PeriodSummary-stat">
            <span className="PeriodSummary-stat-info">{thisPeriodStats.avgMinsPerK}</span>
          </div>
        </div>

        <div className="PeriodSummary-week-stats">
          <span className="PeriodSummary-stats-header">Last week</span>
          <div className="PeriodSummary-stat">
            <span className="PeriodSummary-stat-info">{lastPeriod.length}</span>
          </div>
          <div className="PeriodSummary-stat">
            <span className="PeriodSummary-stat-info">{lastPeriodStats.time}</span>
          </div>
          <div className="PeriodSummary-stat">
            <span className="PeriodSummary-stat-info">{lastPeriodStats.distance}</span>
          </div>
          <div className="PeriodSummary-stat">
            <span className="PeriodSummary-stat-info">{lastPeriodStats.avgMinsPerK}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
