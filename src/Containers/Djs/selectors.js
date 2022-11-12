import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}
	
const selectors = {
  selectBookingLoading: (state, props) => {
    return c(state, props).get('booking_loading')
  }
}
	
export default selectors

