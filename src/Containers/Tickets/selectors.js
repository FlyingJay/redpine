import constants from './constants'

const c = (state, props) => {
  // selects context
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectShowTickets: (state, props) => {
    return c(state, props).get('show_tickets')
  },
  selectTicketsLoading: (state, props) => {
    return c(state, props).get('tickets_loading')
  },
  selectPage: (state, props) => {
    return c(state, props).get('page')
  },
  selectResultsCount: (state, props) => {
    return c(state, props).get('results_count')
  }
}

export default selectors