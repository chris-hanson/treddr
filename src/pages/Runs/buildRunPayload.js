

export default function buildRunPayload({ speed, timeHH=0, timeSS=0, timeMM=0 }) {
  const timeTotalS = (timeHH * 60 * 60) + (timeMM * 60) + timeSS
  const kps = (speed / 60 / 60).toFixed(10)
  const distance = (kps * timeTotalS).toFixed(2)
  const createdAt = Date.now()

  return {
    speed,
    timeHH,
    timeMM,
    timeSS,
    timeTotalS,
    distance,
    createdAt
  }
}