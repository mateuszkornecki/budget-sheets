import * as React from 'react'

const ExpensesContext = React.createContext(undefined);

function countReducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return {count: state.count + 1}
    }
    case 'decrement': {
      return {count: state.count - 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
function ExpensesProvider({children}) {
  const [state, dispatch] = React.useReducer(countReducer, {count: 0})
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {state, dispatch}
  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
export {ExpensesProvider}
