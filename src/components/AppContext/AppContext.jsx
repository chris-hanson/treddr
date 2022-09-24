import React, { createContext, useContext, useReducer, useEffect, useMemo } from "react"

const DEFAULT_STATE = {
  user: { name: "Guest", onboard: false },
  runs: [],
}

const ACTIONS = {
  ONBOARD: "ONBOARD",
  ADD_NEW_RUN: "ADD_NEW_RUN",
  EDIT_RUN: "EDIT_RUN",
  DELETE_RUN: "DELETE_RUN",
}

function appReducer(state, { type, payload }) {
  if (type === ACTIONS.ONBOARD) {
    return {
      ...state,
      user: {
        ...state.user,
        name: payload,
        onboard: true,
      },
    }
  }

  if (type === ACTIONS.UPDATE_USER) {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload,
      },
    }
  }

  if (type === ACTIONS.ADD_NEW_RUN) {
    const runs = [payload, ...state.runs].sort(
      (a, b) => b.loggedAt - a.loggedAt || b.createdAt - a.createdAt
    )
    return {
      ...state,
      runs,
    }
  }

  if (type === ACTIONS.EDIT_RUN) {
    const runs = state.runs
      .map(run => (run.createdAt === payload.createdAt ? payload : { ...run }))
      .sort((a, b) => b.loggedAt - a.loggedAt || b.createdAt - a.createdAt)

    return {
      ...state,
      runs,
    }
  }

  if (type === ACTIONS.DELETE_RUN) {
    const runs = state.runs.filter(run => run.createdAt !== payload)

    return {
      ...state,
      runs,
    }
  }

  return state
}

const AppContext = createContext()

function loadState() {
  try {
    const state = localStorage.getItem("STATE")
    return state ? JSON.parse(state) : DEFAULT_STATE
  } catch (e) {
    return DEFAULT_STATE
  }
}

export { ACTIONS }

export function useAppContext() {
  return useContext(AppContext)
}

export default function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, loadState())

  useEffect(() => {
    localStorage.setItem("STATE", JSON.stringify(state))
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
