

export default function padNum(n) {
  if (!n) return "00"
  if (n < 9) return `0${n}`
  return String(n)
}