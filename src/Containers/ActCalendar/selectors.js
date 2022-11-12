import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectCampaigns: (state, props) => {
    return c(state, props).get('campaigns')
  },
  selectAct: (state, props) => {
    return c(state, props).get('act')
  },
  selectError: (state, props) => {
    return c(state, props).get('error')
  }
}

export default selectors