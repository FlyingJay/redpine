import constants from './constants'

const c = (state, props) => {
  // selects context
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectTickets: (state, props) => {
    return c(state, props).get('tickets')
  }
}

export default selectors