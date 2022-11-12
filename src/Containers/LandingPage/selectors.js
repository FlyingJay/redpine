import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}
	
const selectors = {
  selectLandingPageLoading: (state, props) => {
    return c(state, props).get('landingpage_loading')
  }
}
	
export default selectors

