import React from "react";

import "./Button.css"

export default function Button({ handleClick, children}) {
  return (
    <button onClick={handleClick} className="Button">
      { children }
    </button>
  )
}