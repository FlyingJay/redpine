import constants from './constants'

const c = (state) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectActsLoading: (state, props) => {
    return c(state, props).get('acts_loading')
  },
  selectActs: (state, props) => {
    return c(state, props).get('acts')
  },
  selectSearchActs: (state, props) => {
    return c(state, props).get('search_acts')
  },
  selectSearchActsLoading: (state, props) => {
    return c(state, props).get('search_acts_loading')
  }
}

export default selectors