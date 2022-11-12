import constants from './constants'


const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectError: (state, props) => {
    return c(state, props).get('error')
  },
  selectSuccess: (state, props) => {
    return c(state, props).get('success')
  }
}

export default selectors