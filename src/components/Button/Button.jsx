import React from "react"

import "./Button.css"

export default function Button({ handleClick, children, type = "primary", inline = false }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`Button-${type} ${inline ? "Button-inline" : ""}`}
    >
      {children}
    </button>
  )
}
