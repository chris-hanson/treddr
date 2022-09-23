export default function buildRunPayload({
  speed,
  timeHH = 0,
  timeSS = 0,
  timeMM = 0,
  createdAt = Date.now(),
  logDate
}) {
  const timeTotalS = (timeHH * 60 * 60) + (timeMM * 60) + timeSS
  const kps = (speed / 60 / 60).toFixed(10)
  const distance = (kps * timeTotalS).toFixed(2)
  const loggedAt = +new Date(logDate)

  return {
    speed,
    timeHH,
    timeMM,
    timeSS,
    timeTotalS,
    distance,
    createdAt,
    loggedAt
  }
}