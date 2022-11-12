import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectShowAdmin: (state, props) => {
    return c(state, props).get('show_admin')
  },
  selectShowSquare: (state, props) => {
    return c(state, props).get('show_square')
  },
  selectSuccess: (state, props) => {
    return c(state, props).get('success')
  },
  selectError: (state, props) => {
    return c(state, props).get('error')
  }
}

export default selectors