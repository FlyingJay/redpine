import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectNotifications: (state, props) => {
    return c(state, props).get('notifications')
  }
}

export default selectors