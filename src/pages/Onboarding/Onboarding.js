import React, { useState, useCallback } from 'react';
import { BiRun } from 'react-icons/bi';

import { useAppContext, ACTIONS } from '../../components/AppContext/AppContext';
import Button from "../../components/Button/Button"

import "./Onboarding.css";

export default function Onboarding() {
  const [name, setName] = useState("")
  const { dispatch } = useAppContext()

  function handleChange({ target }) {
    setName(target.value)
  }

  const handleClick = useCallback(() => {
    dispatch({ type: ACTIONS.ONBOARD, payload: name })
  }, [dispatch, name])

  return (
    <>
      <h1>Welcome to Treddr</h1>
      <h2>Dead simple treadmill logger</h2>
      <p>No sign up, No Ads, No fuss, just install and enter your runs!</p>
      <p>Let's start with your name.</p>
      <input value={name} onChange={handleChange} className="Onboarding-name" type="text" placeholder="enter your name" />
      <Button handleClick={handleClick}>
        Start running <BiRun className="Onboarding-icon" />
      </Button>
    </>
  )
}