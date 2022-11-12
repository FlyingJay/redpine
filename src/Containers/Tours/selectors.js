import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}
	
const selectors = {
  selectToursLoading: (state, props) => {
    return c(state, props).get('tours_loading')
  },
  selectAct: (state, props) => {
    return c(state, props).get('act')
  },
  selectTours: (state, props) => {
    return c(state, props).get('tours')
  },
  selectCampaigns: (state, props) => {
    return c(state, props).get('campaigns')
  }
}
	
export default selectors