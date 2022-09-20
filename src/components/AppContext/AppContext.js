import { createContext, useContext, useReducer, useEffect } from "react";

const DEFAULT_STATE = {
  user: { name: "Guest", onboard: false },
  runs: []
}

const ACTIONS = {
  ONBOARD: 'ONBOARD'
}

function appReducer(state, action) {
  if (action.type === ACTIONS.ONBOARD) {
    return {
      ...state,
      user: {
        ...state.user,
        name: action.payload,
        onboard: true
      }
    }
  }

  return state;
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

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      { children }
    </AppContext.Provider>
  )
}