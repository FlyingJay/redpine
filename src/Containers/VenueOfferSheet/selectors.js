import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectEvents: (state, props) => {
    return c(state, props).get('events')
  },
  selectVenue: (state, props) => {
    return c(state, props).get('venue')
  },
  selectOfferData: (state, props) => {
    return c(state, props).get('offerData')
  }
}

export default selectors