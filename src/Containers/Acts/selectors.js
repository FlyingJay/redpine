import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectBand: (state, props) => {
    return c(state, props).get('band')
  },
  selectActsLoading: (state, props) => {
    return c(state, props).get('acts_loading')
  },
  selectActiveAct: (state, props) => {
    return c(state, props).get('active_act')
  },
  selectBands: (state, props) => {
    return c(state, props).get('bands')
  },
  selectError: (state, props) => {
    return c(state, props).get('error')
  },
}

export default selectors
