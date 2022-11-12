import constants from './constants'

const c = (state) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectIsSaving: (state) => {
    return c(state).get('saving')
  },
  selectCreationError: (state) => {
    return c(state).get('creationError') || {}
  }
}

export default selectors