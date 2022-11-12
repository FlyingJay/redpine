import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}
	
const selectors = {
  selectGuestListLoading: (state, props) => {
    return c(state, props).get('guestlist_loading')
  },
  selectTickets: (state, props) => {
    return c(state, props).get('tickets')
  }
}
	
export default selectors

