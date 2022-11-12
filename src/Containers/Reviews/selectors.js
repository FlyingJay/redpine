import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}
	
const selectors = {
  selectBands: (state, props) => {
    return c(state, props).get('bands')
  },  
  selectVenues: (state, props) => {
    return c(state, props).get('venues')
  },  
  selectReviewBand: (state, props) => {
    return c(state, props).get('band')
  },  
  selectReviewVenue: (state, props) => {
    return c(state, props).get('venue')
  }
}
export default selectors